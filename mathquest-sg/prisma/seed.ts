import { PrismaClient } from "../src/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import dotenv from "dotenv";

dotenv.config({ path: ".env.local" });

const connectionString = process.env.DATABASE_URL!;
const adapter = new PrismaPg({ connectionString });
const prisma = new PrismaClient({ adapter });

// ─── Topic Definitions ───────────────────────────────────

type Strand = "NUMBER_ALGEBRA" | "GEOMETRY" | "STATISTICS";

interface TopicDef {
  id: string;
  name: string;
  description: string;
  strand: Strand;
  term: number;
  chapter: number;
  displayOrder: number;
  totalSkills: number;
  skills: string[]; // skill IDs within this topic
}

const TOPICS: TopicDef[] = [
  {
    id: "primes-hcf-lcm",
    name: "Primes, HCF & LCM",
    description: "Prime factorisation, square/cube roots, HCF and LCM",
    strand: "NUMBER_ALGEBRA",
    term: 1,
    chapter: 1,
    displayOrder: 1,
    totalSkills: 5,
    skills: [
      "identify-primes",
      "prime-factorisation",
      "square-cube-roots",
      "hcf",
      "lcm",
    ],
  },
  {
    id: "integers",
    name: "Integers",
    description: "Negative numbers, ordering, four operations with integers",
    strand: "NUMBER_ALGEBRA",
    term: 1,
    chapter: 2,
    displayOrder: 2,
    totalSkills: 4,
    skills: [
      "negative-numbers",
      "ordering-integers",
      "add-subtract-integers",
      "multiply-divide-integers",
    ],
  },
  {
    id: "significant-figures",
    name: "Significant Figures",
    description:
      "Rounding to significant figures, estimation, decimal places",
    strand: "NUMBER_ALGEBRA",
    term: 1,
    chapter: 3,
    displayOrder: 3,
    totalSkills: 4,
    skills: [
      "identify-sig-figs",
      "round-sig-figs",
      "round-decimal-places",
      "estimation",
    ],
  },
  {
    id: "algebra",
    name: "Algebra",
    description:
      "Algebraic notation, simplification, expansion, factorisation",
    strand: "NUMBER_ALGEBRA",
    term: 1,
    chapter: 4,
    displayOrder: 4,
    totalSkills: 5,
    skills: [
      "algebraic-notation",
      "simplification",
      "expansion",
      "factorisation",
      "substitution",
    ],
  },
  {
    id: "linear-equations",
    name: "Linear Equations",
    description: "Solving equations, word problems, changing subject",
    strand: "NUMBER_ALGEBRA",
    term: 2,
    chapter: 5,
    displayOrder: 5,
    totalSkills: 4,
    skills: [
      "solve-one-variable",
      "equations-with-brackets",
      "word-problems",
      "change-subject",
    ],
  },
  {
    id: "linear-functions",
    name: "Linear Functions",
    description: "Cartesian coordinates, gradient, y = mx + c, graphing",
    strand: "NUMBER_ALGEBRA",
    term: 2,
    chapter: 6,
    displayOrder: 6,
    totalSkills: 4,
    skills: [
      "cartesian-coordinates",
      "gradient",
      "y-intercept-form",
      "graph-linear",
    ],
  },
  {
    id: "number-patterns",
    name: "Number Patterns",
    description: "Sequences, nth term, general term, special patterns",
    strand: "NUMBER_ALGEBRA",
    term: 2,
    chapter: 7,
    displayOrder: 7,
    totalSkills: 3,
    skills: ["identify-patterns", "nth-term", "special-sequences"],
  },
  {
    id: "percentage",
    name: "Percentage",
    description:
      "Percentage of a quantity, increase/decrease, reverse percentage",
    strand: "NUMBER_ALGEBRA",
    term: 2,
    chapter: 8,
    displayOrder: 8,
    totalSkills: 4,
    skills: [
      "percentage-of-quantity",
      "percentage-change",
      "reverse-percentage",
      "percentage-word-problems",
    ],
  },
  {
    id: "ratio-rate-speed",
    name: "Ratio, Rate & Speed",
    description: "Ratio, proportion, rate, speed-distance-time",
    strand: "NUMBER_ALGEBRA",
    term: 3,
    chapter: 9,
    displayOrder: 9,
    totalSkills: 4,
    skills: [
      "simplify-ratio",
      "proportion",
      "rate",
      "speed-distance-time",
    ],
  },
  {
    id: "geometry-angles",
    name: "Geometry & Angles",
    description:
      "Points, lines, planes, angle properties, parallel line angles",
    strand: "GEOMETRY",
    term: 3,
    chapter: 10,
    displayOrder: 10,
    totalSkills: 4,
    skills: [
      "angle-types",
      "angles-on-line",
      "vertically-opposite",
      "parallel-line-angles",
    ],
  },
  {
    id: "polygons",
    name: "Polygons",
    description:
      "Angle sum of polygons, regular polygons, interior/exterior angles",
    strand: "GEOMETRY",
    term: 3,
    chapter: 11,
    displayOrder: 11,
    totalSkills: 3,
    skills: ["triangle-angle-sum", "polygon-angle-sum", "regular-polygons"],
  },
  {
    id: "perimeter-area",
    name: "Perimeter & Area",
    description:
      "Perimeter and area of triangles, quadrilaterals, circles, composite figures",
    strand: "GEOMETRY",
    term: 3,
    chapter: 12,
    displayOrder: 12,
    totalSkills: 4,
    skills: [
      "perimeter",
      "area-triangles-quads",
      "area-circles",
      "composite-figures",
    ],
  },
  {
    id: "volume-surface-area",
    name: "Volume & Surface Area",
    description: "Volume and surface area of prisms, cylinders, composite solids",
    strand: "GEOMETRY",
    term: 4,
    chapter: 13,
    displayOrder: 13,
    totalSkills: 4,
    skills: [
      "volume-prisms",
      "volume-cylinders",
      "surface-area",
      "composite-solids",
    ],
  },
  {
    id: "statistics",
    name: "Statistics",
    description: "Mean, median, mode, dot diagrams, stem-and-leaf, histograms",
    strand: "STATISTICS",
    term: 4,
    chapter: 14,
    displayOrder: 14,
    totalSkills: 4,
    skills: [
      "mean-median-mode",
      "dot-diagrams",
      "stem-and-leaf",
      "histograms",
    ],
  },
];

// ─── Prerequisite Edges ──────────────────────────────────

const PREREQUISITES: Array<{
  topicId: string;
  prerequisiteId: string;
  relationship: string;
}> = [
  // Algebra requires primes + integers foundation
  {
    topicId: "algebra",
    prerequisiteId: "primes-hcf-lcm",
    relationship: "recommended",
  },
  {
    topicId: "algebra",
    prerequisiteId: "integers",
    relationship: "required",
  },
  // Linear equations require algebra
  {
    topicId: "linear-equations",
    prerequisiteId: "algebra",
    relationship: "required",
  },
  // Linear functions require linear equations + integers
  {
    topicId: "linear-functions",
    prerequisiteId: "linear-equations",
    relationship: "required",
  },
  {
    topicId: "linear-functions",
    prerequisiteId: "integers",
    relationship: "required",
  },
  // Number patterns require algebra
  {
    topicId: "number-patterns",
    prerequisiteId: "algebra",
    relationship: "required",
  },
  // Percentage requires significant figures
  {
    topicId: "percentage",
    prerequisiteId: "significant-figures",
    relationship: "recommended",
  },
  // Ratio requires percentage
  {
    topicId: "ratio-rate-speed",
    prerequisiteId: "percentage",
    relationship: "recommended",
  },
  // Polygons require geometry
  {
    topicId: "polygons",
    prerequisiteId: "geometry-angles",
    relationship: "required",
  },
  // Perimeter/area requires polygons
  {
    topicId: "perimeter-area",
    prerequisiteId: "polygons",
    relationship: "required",
  },
  // Volume requires perimeter/area
  {
    topicId: "volume-surface-area",
    prerequisiteId: "perimeter-area",
    relationship: "required",
  },
];

// ─── Achievements ────────────────────────────────────────

const ACHIEVEMENTS = [
  {
    code: "FIRST_STEPS",
    name: "First Steps",
    description: "Answer your first question correctly",
    xpReward: 10,
  },
  {
    code: "STREAK_7",
    name: "Week Warrior",
    description: "Maintain a 7-day practice streak",
    xpReward: 50,
  },
  {
    code: "STREAK_30",
    name: "Monthly Master",
    description: "Maintain a 30-day practice streak",
    xpReward: 200,
  },
  {
    code: "TOPIC_MASTER",
    name: "Topic Master",
    description: "Master all skills in a topic",
    xpReward: 100,
  },
  {
    code: "PERFECT_10",
    name: "Perfect 10",
    description: "Get 10 questions correct in a row",
    xpReward: 75,
  },
  {
    code: "SPEED_DEMON",
    name: "Speed Demon",
    description: "Answer 5 questions correctly in under 2 minutes",
    xpReward: 50,
  },
  {
    code: "EXPLORER",
    name: "Explorer",
    description: "Attempt questions from 5 different topics",
    xpReward: 30,
  },
  {
    code: "HALF_WAY",
    name: "Halfway There",
    description: "Master 7 out of 14 topics",
    xpReward: 150,
  },
  {
    code: "COMPLETIONIST",
    name: "Completionist",
    description: "Master all 14 topics",
    xpReward: 500,
  },
  {
    code: "HINT_SEEKER",
    name: "Hint Seeker",
    description: "Use the AI tutor hints 10 times",
    xpReward: 20,
  },
  {
    code: "COMEBACK_KID",
    name: "Comeback Kid",
    description: "Improve accuracy from below 50% to above 80% on a skill",
    xpReward: 75,
  },
  {
    code: "DRAGON_SLAYER",
    name: "Dragon Slayer",
    description: "Defeat your first boss problem",
    xpReward: 100,
  },
  {
    code: "LEVEL_5",
    name: "Rising Star",
    description: "Reach Level 5",
    xpReward: 50,
  },
  {
    code: "LEVEL_10",
    name: "Math Wizard",
    description: "Reach Level 10",
    xpReward: 200,
  },
];

// ─── Main Seed Function ──────────────────────────────────

async function main() {
  console.log("Seeding MathQuest SG database...\n");

  // Load content files dynamically
  const contentDir = "../content/math/topics";
  const contentMap: Record<
    number,
    {
      notes: string | null;
      questions: Array<{
        q: string;
        opts: string[];
        ans: number;
        explain: string;
      }> | null;
    }
  > = {};

  const topicFiles: Array<[number, string]> = [
    [1, "01-primes"],
    [2, "02-integers"],
    [3, "03-sigfig"],
    [4, "04-algebra"],
    [5, "05-linear-equations"],
    [6, "06-linear-functions"],
    [7, "07-number-patterns"],
    [8, "08-percentage"],
    [9, "09-ratio-rate-speed"],
    [10, "10-geometry-angles"],
    [11, "11-polygons"],
    [12, "12-perimeter-area"],
    [13, "13-volume-surface"],
    [14, "14-statistics"],
  ];

  for (const [chapter, filename] of topicFiles) {
    try {
      const mod = await import(`${contentDir}/${filename}`);
      contentMap[chapter] = {
        notes: mod.notes,
        questions: mod.questions,
      };
    } catch {
      console.log(`  Note: ${filename} content not found, skipping`);
    }
  }

  // Seed topics
  console.log("Seeding curriculum topics...");
  for (const topic of TOPICS) {
    const content = contentMap[topic.chapter];
    await prisma.curriculumTopic.upsert({
      where: { id: topic.id },
      update: {
        name: topic.name,
        description: topic.description,
        strand: topic.strand,
        term: topic.term,
        chapter: topic.chapter,
        displayOrder: topic.displayOrder,
        totalSkills: topic.totalSkills,
        notesHtml: content?.notes ?? null,
      },
      create: {
        id: topic.id,
        gLevel: 3,
        strand: topic.strand,
        name: topic.name,
        description: topic.description,
        term: topic.term,
        chapter: topic.chapter,
        displayOrder: topic.displayOrder,
        totalSkills: topic.totalSkills,
        notesHtml: content?.notes ?? null,
      },
    });
  }
  console.log(`  ✓ ${TOPICS.length} topics seeded`);

  // Seed prerequisites
  console.log("Seeding prerequisites...");
  for (const prereq of PREREQUISITES) {
    await prisma.topicPrerequisite.upsert({
      where: {
        topicId_prerequisiteId: {
          topicId: prereq.topicId,
          prerequisiteId: prereq.prerequisiteId,
        },
      },
      update: { relationship: prereq.relationship },
      create: prereq,
    });
  }
  console.log(`  ✓ ${PREREQUISITES.length} prerequisite edges seeded`);

  // Seed questions from content files
  console.log("Seeding questions...");
  let totalQuestions = 0;

  for (const topic of TOPICS) {
    const content = contentMap[topic.chapter];
    if (!content?.questions) continue;

    // Distribute questions across skills evenly
    const questionsPerSkill = Math.ceil(
      content.questions.length / topic.skills.length
    );

    for (let i = 0; i < content.questions.length; i++) {
      const q = content.questions[i];
      const skillIndex = Math.min(
        Math.floor(i / questionsPerSkill),
        topic.skills.length - 1
      );
      const skillId = topic.skills[skillIndex];

      // Assign difficulty based on position within skill group
      const posInGroup = i % questionsPerSkill;
      const difficulty = Math.min(
        Math.ceil(((posInGroup + 1) / questionsPerSkill) * 5),
        5
      );

      await prisma.question.create({
        data: {
          topicId: topic.id,
          skillId,
          difficulty,
          questionJson: {
            q: q.q,
            opts: q.opts,
            ans: q.ans,
            explain: q.explain,
            type: "mcq",
          },
          sympyVerified: false,
          aiGenerated: false,
        },
      });
      totalQuestions++;
    }
  }
  console.log(`  ✓ ${totalQuestions} questions seeded`);

  // Seed achievements
  console.log("Seeding achievements...");
  for (const achievement of ACHIEVEMENTS) {
    await prisma.achievement.upsert({
      where: { code: achievement.code },
      update: {
        name: achievement.name,
        description: achievement.description,
        xpReward: achievement.xpReward,
      },
      create: achievement,
    });
  }
  console.log(`  ✓ ${ACHIEVEMENTS.length} achievements seeded`);

  console.log("\nSeed complete!");
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
