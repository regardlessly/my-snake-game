import { prisma } from "@/lib/prisma";
import { Prisma } from "@/generated/prisma/client";

// ─── Types ───────────────────────────────────────────────

export interface TopicChain {
  id: string;
  name: string;
  depth: number;
  relationship: string;
}

export interface PrereqStatus {
  id: string;
  name: string;
  status: "mastered" | "in_progress" | "not_started";
}

export interface TopicReadiness {
  ready: boolean;
  missingPrereqs: PrereqStatus[];
  completedPrereqs: PrereqStatus[];
}

export interface RecommendedTopic {
  id: string;
  name: string;
  strand: string;
  term: number;
  chapter: number;
  reason: string;
}

// ─── Recursive CTE: Full prerequisite chain ─────────────

/**
 * Traverse all prerequisites (direct + transitive) for a topic
 * using a recursive CTE. Stops at depth 10 to prevent infinite loops.
 */
export async function getPrerequisiteChain(
  topicId: string
): Promise<TopicChain[]> {
  const results = await prisma.$queryRaw<TopicChain[]>(
    Prisma.sql`
      WITH RECURSIVE prereq_chain AS (
        SELECT
          tp."prerequisiteId" AS id,
          ct.name,
          1 AS depth,
          tp.relationship
        FROM "topic_prerequisites" tp
        JOIN "curriculum_topics" ct ON ct.id = tp."prerequisiteId"
        WHERE tp."topicId" = ${topicId}

        UNION ALL

        SELECT
          tp."prerequisiteId" AS id,
          ct.name,
          pc.depth + 1 AS depth,
          tp.relationship
        FROM "topic_prerequisites" tp
        JOIN "curriculum_topics" ct ON ct.id = tp."prerequisiteId"
        JOIN prereq_chain pc ON pc.id = tp."topicId"
        WHERE pc.depth < 10
      )
      SELECT DISTINCT id, name, depth, relationship
      FROM prereq_chain
      ORDER BY depth
    `
  );

  return results;
}

// ─── Topic Readiness Check ──────────────────────────────

/**
 * Check if a user has mastered all required prerequisites for a topic.
 * Returns which prereqs are completed and which are missing.
 */
export async function getTopicReadiness(
  userId: string,
  topicId: string
): Promise<TopicReadiness> {
  // Get all required prerequisites (transitive)
  const prereqs = await getPrerequisiteChain(topicId);
  const requiredPrereqs = prereqs.filter((p) => p.relationship === "required");

  if (requiredPrereqs.length === 0) {
    return { ready: true, missingPrereqs: [], completedPrereqs: [] };
  }

  // Get unique prerequisite IDs (a prereq may appear at multiple depths)
  const uniquePrereqIds = [...new Set(requiredPrereqs.map((p) => p.id))];

  // Fetch user's skill progress for all prerequisite topics
  const progress = await prisma.userSkillProgress.findMany({
    where: {
      userId,
      topicId: { in: uniquePrereqIds },
    },
    select: {
      topicId: true,
      status: true,
    },
  });

  // Build a map of topicId -> statuses
  const progressByTopic = new Map<string, string[]>();
  for (const p of progress) {
    const existing = progressByTopic.get(p.topicId) || [];
    existing.push(p.status);
    progressByTopic.set(p.topicId, existing);
  }

  // Build a name map from the prereqs
  const nameMap = new Map<string, string>();
  for (const p of requiredPrereqs) {
    nameMap.set(p.id, p.name);
  }

  const completedPrereqs: PrereqStatus[] = [];
  const missingPrereqs: PrereqStatus[] = [];

  for (const prereqId of uniquePrereqIds) {
    const statuses = progressByTopic.get(prereqId) || [];
    const allMastered =
      statuses.length > 0 && statuses.every((s) => s === "MASTERED");
    const hasAnyProgress = statuses.length > 0;

    const entry: PrereqStatus = {
      id: prereqId,
      name: nameMap.get(prereqId) || prereqId,
      status: allMastered
        ? "mastered"
        : hasAnyProgress
          ? "in_progress"
          : "not_started",
    };

    if (allMastered) {
      completedPrereqs.push(entry);
    } else {
      missingPrereqs.push(entry);
    }
  }

  return {
    ready: missingPrereqs.length === 0,
    missingPrereqs,
    completedPrereqs,
  };
}

// ─── Recommended Next Topics ────────────────────────────

/**
 * Find topics where all required prerequisites are mastered but
 * the topic itself is not yet mastered. These are the "unlocked
 * and ready" topics for the student.
 */
export async function getRecommendedNextTopics(
  userId: string
): Promise<RecommendedTopic[]> {
  // Get all topics the user has already mastered (all skills mastered)
  const userProgress = await prisma.userSkillProgress.findMany({
    where: { userId },
    select: { topicId: true, status: true },
  });

  // Group progress by topic and determine mastery
  const topicStatusMap = new Map<
    string,
    { total: number; mastered: number; attempted: boolean }
  >();
  for (const p of userProgress) {
    const existing = topicStatusMap.get(p.topicId) || {
      total: 0,
      mastered: 0,
      attempted: false,
    };
    existing.total += 1;
    if (p.status === "MASTERED") existing.mastered += 1;
    if (p.status !== "LOCKED" && p.status !== "UNLOCKED")
      existing.attempted = true;
    topicStatusMap.set(p.topicId, existing);
  }

  // Fetch topic metadata to know total skills per topic
  const allTopics = await prisma.curriculumTopic.findMany({
    orderBy: { displayOrder: "asc" },
    include: {
      prerequisites: true,
    },
  });

  // Determine which topics are fully mastered
  const masteredTopicIds = new Set<string>();
  for (const topic of allTopics) {
    const progress = topicStatusMap.get(topic.id);
    if (
      progress &&
      progress.mastered >= topic.totalSkills &&
      topic.totalSkills > 0
    ) {
      masteredTopicIds.add(topic.id);
    }
  }

  // Find topics where all required prereqs are mastered but the topic itself is not
  const recommended: RecommendedTopic[] = [];

  for (const topic of allTopics) {
    // Skip already mastered topics
    if (masteredTopicIds.has(topic.id)) continue;

    // Check if all required prerequisites are mastered
    const requiredPrereqs = topic.prerequisites.filter(
      (p) => p.relationship === "required"
    );

    const allPrereqsMet =
      requiredPrereqs.length === 0 ||
      requiredPrereqs.every((p) => masteredTopicIds.has(p.prerequisiteId));

    if (!allPrereqsMet) continue;

    const progress = topicStatusMap.get(topic.id);
    const isAttempted = progress?.attempted || false;

    recommended.push({
      id: topic.id,
      name: topic.name,
      strand: topic.strand,
      term: topic.term,
      chapter: topic.chapter,
      reason: isAttempted
        ? "In progress - prerequisites complete"
        : requiredPrereqs.length === 0
          ? "No prerequisites required"
          : "All prerequisites mastered",
    });
  }

  return recommended;
}
