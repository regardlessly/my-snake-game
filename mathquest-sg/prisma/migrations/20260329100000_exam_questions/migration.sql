-- exam_banks: tracks imported exam files (dedup by sha256 hash)
CREATE TABLE exam_banks (
  id          TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  school      TEXT NOT NULL,
  exam_name   TEXT NOT NULL,
  subject     TEXT NOT NULL,
  level       TEXT NOT NULL,
  year        INT,
  file_hash   TEXT NOT NULL UNIQUE,  -- SHA256 of source JSON, prevents re-import
  total_marks INT,
  metadata    JSONB DEFAULT '{}',
  imported_at TIMESTAMPTZ DEFAULT now()
);

-- exam_questions: open-ended exam questions with solution context
CREATE TABLE exam_questions (
  id                  TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  exam_bank_id        TEXT NOT NULL REFERENCES exam_banks(id) ON DELETE CASCADE,
  topic_id            TEXT NOT NULL REFERENCES curriculum_topics(id),
  source_id           TEXT NOT NULL,   -- original ID from JSON (e.g. "P1Q3", "Q2a")
  question_number     TEXT NOT NULL,
  section             TEXT,            -- paper number or section label
  marks               INT NOT NULL DEFAULT 1,
  difficulty          INT NOT NULL DEFAULT 1,  -- 1-4
  question_text       TEXT NOT NULL,
  question_latex      TEXT,
  answer              TEXT NOT NULL,
  answer_latex        TEXT,
  solution_steps      JSONB DEFAULT '[]',
  keywords            JSONB DEFAULT '[]',
  has_diagram         BOOLEAN DEFAULT false,
  diagram_description TEXT,
  strand              TEXT,
  created_at          TIMESTAMPTZ DEFAULT now(),

  UNIQUE(exam_bank_id, source_id)
);

CREATE INDEX exam_questions_topic_idx ON exam_questions(topic_id);
CREATE INDEX exam_questions_difficulty_idx ON exam_questions(difficulty);
