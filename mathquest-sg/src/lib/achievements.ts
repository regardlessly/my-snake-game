import { prisma } from "@/lib/prisma";

export interface AwardedAchievement {
  code: string;
  name: string;
  description: string;
  xpReward: number;
  earnedAt: Date;
}

/**
 * Check all achievement conditions for a user and award any that are newly earned.
 *
 * For each newly awarded achievement:
 * 1. Creates a UserAchievement record
 * 2. Creates an XpEvent with eventType='ACHIEVEMENT'
 * 3. Updates user.totalXp and recalculates currentLevel
 *
 * Returns the list of newly awarded achievements (for frontend notification).
 */
export async function checkAndAwardAchievements(
  userId: string
): Promise<AwardedAchievement[]> {
  // Fetch user data and all achievements in parallel
  const [user, allAchievements, existingUserAchievements, skillProgress] =
    await Promise.all([
      prisma.user.findUniqueOrThrow({ where: { id: userId } }),
      prisma.achievement.findMany(),
      prisma.userAchievement.findMany({
        where: { userId },
        select: { achievementId: true },
      }),
      prisma.userSkillProgress.findMany({ where: { userId } }),
    ]);

  const earnedIds = new Set(existingUserAchievements.map((ua) => ua.achievementId));
  const achievementByCode = new Map(allAchievements.map((a) => [a.code, a]));

  // Helper: check if an achievement code is already earned
  const alreadyEarned = (code: string): boolean => {
    const achievement = achievementByCode.get(code);
    return achievement ? earnedIds.has(achievement.id) : true;
  };

  // Precompute useful aggregates from skill progress
  const hasCorrectAttempt = skillProgress.some(
    (sp) => sp.totalAttempts >= 1 && sp.correctAttempts >= 1
  );

  const distinctTopicsWithAttempts = new Set(
    skillProgress.filter((sp) => sp.totalAttempts > 0).map((sp) => sp.topicId)
  );

  // Group skills by topic for mastery checks
  const skillsByTopic = new Map<string, typeof skillProgress>();
  for (const sp of skillProgress) {
    const existing = skillsByTopic.get(sp.topicId) ?? [];
    existing.push(sp);
    skillsByTopic.set(sp.topicId, existing);
  }

  // Get topic definitions to know total skills per topic
  const topics = await prisma.curriculumTopic.findMany({
    select: { id: true, totalSkills: true },
  });
  const topicSkillCounts = new Map(topics.map((t) => [t.id, t.totalSkills]));

  // Check which topics are fully mastered
  const fullyMasteredTopics = new Set<string>();
  for (const [topicId, skills] of skillsByTopic) {
    const totalSkills = topicSkillCounts.get(topicId) ?? 0;
    const masteredSkills = skills.filter((s) => s.status === "MASTERED").length;
    if (totalSkills > 0 && masteredSkills >= totalSkills) {
      fullyMasteredTopics.add(topicId);
    }
  }

  // Check for COMEBACK_KID: any skill that went from < 50% to >= 80%
  // We check current state — if accuracyRate >= 0.8 and the skill had enough
  // attempts that it could have been below 0.5 previously. We approximate this
  // by checking if totalAttempts > correctAttempts (i.e. they got some wrong)
  // and current accuracy >= 0.8.
  const hasComeback = skillProgress.some(
    (sp) =>
      sp.totalAttempts >= 5 &&
      sp.accuracyRate >= 0.8 &&
      // They must have had a period of < 50% — proxy: lifetime accuracy < current window
      sp.correctAttempts / sp.totalAttempts < 0.7
  );

  // Collect codes to award
  const codesToAward: string[] = [];

  // FIRST_STEPS: any skill with totalAttempts >= 1 AND correctAttempts >= 1
  if (!alreadyEarned("FIRST_STEPS") && hasCorrectAttempt) {
    codesToAward.push("FIRST_STEPS");
  }

  // STREAK_7: user.streakDays >= 7
  if (!alreadyEarned("STREAK_7") && user.streakDays >= 7) {
    codesToAward.push("STREAK_7");
  }

  // STREAK_30: user.streakDays >= 30
  if (!alreadyEarned("STREAK_30") && user.streakDays >= 30) {
    codesToAward.push("STREAK_30");
  }

  // TOPIC_MASTER: any topic where ALL skills have status = 'MASTERED'
  if (!alreadyEarned("TOPIC_MASTER") && fullyMasteredTopics.size > 0) {
    codesToAward.push("TOPIC_MASTER");
  }

  // TODO: PERFECT_10 — needs per-session consecutive correct tracking in metadata
  // Condition: 10 questions correct in a row

  // TODO: SPEED_DEMON — needs per-question timing tracking in metadata
  // Condition: 5 questions correct in under 2 minutes

  // EXPLORER: attempts in >= 5 distinct topics
  if (!alreadyEarned("EXPLORER") && distinctTopicsWithAttempts.size >= 5) {
    codesToAward.push("EXPLORER");
  }

  // HALF_WAY: >= 7 topics fully mastered
  if (!alreadyEarned("HALF_WAY") && fullyMasteredTopics.size >= 7) {
    codesToAward.push("HALF_WAY");
  }

  // COMPLETIONIST: all 14 topics fully mastered
  if (!alreadyEarned("COMPLETIONIST") && fullyMasteredTopics.size >= 14) {
    codesToAward.push("COMPLETIONIST");
  }

  // TODO: HINT_SEEKER — needs hint usage count tracking in metadata
  // Condition: Use AI tutor hints 10 times

  // COMEBACK_KID: any skill went from < 50% to >= 80% accuracy
  if (!alreadyEarned("COMEBACK_KID") && hasComeback) {
    codesToAward.push("COMEBACK_KID");
  }

  // DRAGON_SLAYER: skip — boss battles are Phase 4

  // LEVEL_5: user.currentLevel >= 5
  if (!alreadyEarned("LEVEL_5") && user.currentLevel >= 5) {
    codesToAward.push("LEVEL_5");
  }

  // LEVEL_10: user.currentLevel >= 10
  if (!alreadyEarned("LEVEL_10") && user.currentLevel >= 10) {
    codesToAward.push("LEVEL_10");
  }

  // Award each achievement
  const awarded: AwardedAchievement[] = [];
  let totalXpGained = 0;

  for (const code of codesToAward) {
    const achievement = achievementByCode.get(code);
    if (!achievement) continue;

    const earnedAt = new Date();

    // Create UserAchievement
    await prisma.userAchievement.create({
      data: {
        userId,
        achievementId: achievement.id,
        earnedAt,
      },
    });

    // Create XpEvent
    await prisma.xpEvent.create({
      data: {
        userId,
        eventType: "ACHIEVEMENT",
        xpAmount: achievement.xpReward,
        metadata: { achievementCode: code },
      },
    });

    totalXpGained += achievement.xpReward;

    awarded.push({
      code: achievement.code,
      name: achievement.name,
      description: achievement.description,
      xpReward: achievement.xpReward,
      earnedAt,
    });
  }

  // Update user's totalXp and recalculate level
  if (totalXpGained > 0) {
    const newTotalXp = user.totalXp + totalXpGained;
    const newLevel = Math.floor(newTotalXp / 100) + 1;

    await prisma.user.update({
      where: { id: userId },
      data: {
        totalXp: newTotalXp,
        currentLevel: newLevel,
      },
    });

    // After level update, check level-based achievements that may now qualify
    // (e.g., XP from other achievements pushed us over a level threshold)
    if (newLevel >= 5 && !alreadyEarned("LEVEL_5") && !codesToAward.includes("LEVEL_5")) {
      const lvl5 = achievementByCode.get("LEVEL_5");
      if (lvl5) {
        const earnedAt = new Date();
        await prisma.userAchievement.create({
          data: { userId, achievementId: lvl5.id, earnedAt },
        });
        await prisma.xpEvent.create({
          data: {
            userId,
            eventType: "ACHIEVEMENT",
            xpAmount: lvl5.xpReward,
            metadata: { achievementCode: "LEVEL_5" },
          },
        });
        await prisma.user.update({
          where: { id: userId },
          data: {
            totalXp: { increment: lvl5.xpReward },
            currentLevel: Math.floor((newTotalXp + lvl5.xpReward) / 100) + 1,
          },
        });
        awarded.push({
          code: lvl5.code,
          name: lvl5.name,
          description: lvl5.description,
          xpReward: lvl5.xpReward,
          earnedAt,
        });
      }
    }

    if (newLevel >= 10 && !alreadyEarned("LEVEL_10") && !codesToAward.includes("LEVEL_10")) {
      const lvl10 = achievementByCode.get("LEVEL_10");
      if (lvl10) {
        const earnedAt = new Date();
        await prisma.userAchievement.create({
          data: { userId, achievementId: lvl10.id, earnedAt },
        });
        await prisma.xpEvent.create({
          data: {
            userId,
            eventType: "ACHIEVEMENT",
            xpAmount: lvl10.xpReward,
            metadata: { achievementCode: "LEVEL_10" },
          },
        });
        const currentUser = await prisma.user.findUniqueOrThrow({
          where: { id: userId },
        });
        await prisma.user.update({
          where: { id: userId },
          data: {
            totalXp: { increment: lvl10.xpReward },
            currentLevel:
              Math.floor((currentUser.totalXp + lvl10.xpReward) / 100) + 1,
          },
        });
        awarded.push({
          code: lvl10.code,
          name: lvl10.name,
          description: lvl10.description,
          xpReward: lvl10.xpReward,
          earnedAt,
        });
      }
    }
  }

  return awarded;
}
