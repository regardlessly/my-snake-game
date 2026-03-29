-- CreateTable: whatsapp_students
CREATE TABLE whatsapp_students (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  phone_number TEXT UNIQUE NOT NULL,
  display_name TEXT NOT NULL DEFAULT 'Unknown',
  status TEXT NOT NULL DEFAULT 'pending',
  user_id TEXT REFERENCES users(id),
  parent_code TEXT UNIQUE,
  settings JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- CreateTable: bot_conversations
CREATE TABLE bot_conversations (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  wa_student_id TEXT NOT NULL REFERENCES whatsapp_students(id),
  topic_id TEXT,
  messages JSONB NOT NULL DEFAULT '[]',
  token_count INT DEFAULT 0,
  model_used TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- CreateTable: guardrail_logs
CREATE TABLE guardrail_logs (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  wa_student_id TEXT REFERENCES whatsapp_students(id),
  user_id TEXT REFERENCES users(id),
  message_text TEXT NOT NULL,
  blocked_reason TEXT NOT NULL,
  source TEXT NOT NULL DEFAULT 'whatsapp',
  created_at TIMESTAMPTZ DEFAULT now()
);

-- CreateTable: daily_usage_stats
CREATE TABLE daily_usage_stats (
  date DATE PRIMARY KEY,
  active_students INT DEFAULT 0,
  total_questions INT DEFAULT 0,
  total_correct INT DEFAULT 0,
  wa_messages INT DEFAULT 0,
  bedrock_tokens INT DEFAULT 0,
  guardrail_blocks INT DEFAULT 0
);

-- CreateIndex
CREATE INDEX idx_bot_conversations_student ON bot_conversations(wa_student_id);
CREATE INDEX idx_bot_conversations_created ON bot_conversations(created_at);
CREATE INDEX idx_guardrail_logs_created ON guardrail_logs(created_at);
CREATE INDEX idx_whatsapp_students_status ON whatsapp_students(status);
