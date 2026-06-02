-- ============================================================
-- LearnOS — Supabase Database Setup
-- Run this in the Supabase SQL Editor
-- ============================================================

-- 1. Create the courses table
CREATE TABLE IF NOT EXISTS courses (
  id          uuid        PRIMARY KEY DEFAULT gen_random_uuid(),
  title       text        NOT NULL,
  progress    integer     NOT NULL CHECK (progress >= 0 AND progress <= 100),
  icon_name   text        NOT NULL DEFAULT 'BookOpen',
  created_at  timestamptz NOT NULL DEFAULT now()
);

-- 2. Enable Row Level Security
ALTER TABLE courses ENABLE ROW LEVEL SECURITY;

-- 3. Allow anonymous read access (used by the anon key in RSC)
CREATE POLICY "Public read access"
  ON courses
  FOR SELECT
  USING (true);

-- 4. Seed with sample data
INSERT INTO courses (title, progress, icon_name) VALUES
  ('Advanced React Patterns',    75, 'Layers'),
  ('TypeScript Deep Dive',       45, 'Code2'),
  ('System Design Mastery',      60, 'Network'),
  ('Next.js & App Router',       30, 'Zap')
ON CONFLICT DO NOTHING;
