-- ============================================================
-- CATEGORIES
-- ============================================================
CREATE TABLE IF NOT EXISTS categories (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name        TEXT UNIQUE NOT NULL,
  slug        TEXT UNIQUE NOT NULL,
  description TEXT,
  icon        TEXT,
  color       TEXT,
  sort_order  INTEGER DEFAULT 0
);

-- ============================================================
-- BOOKS
-- ============================================================
CREATE TABLE IF NOT EXISTS books (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title           TEXT NOT NULL,
  author          TEXT,
  category_id     UUID REFERENCES categories(id),
  description     TEXT,
  cover_url       TEXT,
  file_url        TEXT,
  is_restricted   BOOLEAN DEFAULT FALSE,
  tags            TEXT[],
  added_date      DATE DEFAULT CURRENT_DATE,
  curator_note    TEXT,
  views           INTEGER DEFAULT 0,
  downloads       INTEGER DEFAULT 0,
  is_published    BOOLEAN DEFAULT TRUE
);

-- Full-text search index
CREATE INDEX IF NOT EXISTS books_fts_idx ON books
  USING GIN (to_tsvector('english', title || ' ' || COALESCE(author,'') || ' ' || COALESCE(description,'')));

-- ============================================================
-- USER PROFILES (extends Supabase Auth)
-- ============================================================
CREATE TABLE IF NOT EXISTS user_profiles (
  id              UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  display_name    TEXT,
  avatar_url      TEXT,
  role            TEXT DEFAULT 'reader',
  reason_joined   TEXT,
  created_at      TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- VAULT ACCESS REQUESTS
-- ============================================================
CREATE TABLE IF NOT EXISTS vault_access_requests (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id         UUID REFERENCES user_profiles(id) ON DELETE CASCADE,
  book_id         UUID REFERENCES books(id) ON DELETE CASCADE,
  reason          TEXT NOT NULL,
  background      TEXT,
  status          TEXT DEFAULT 'pending',
  admin_note      TEXT,
  requested_at    TIMESTAMPTZ DEFAULT NOW(),
  reviewed_at     TIMESTAMPTZ,
  UNIQUE(user_id, book_id)
);

-- ============================================================
-- BOOK REQUESTS (users asking for books not in library)
-- ============================================================
CREATE TABLE IF NOT EXISTS book_requests (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id         UUID REFERENCES user_profiles(id) ON DELETE SET NULL,
  book_title      TEXT NOT NULL,
  book_author     TEXT,
  why_needed      TEXT,
  status          TEXT DEFAULT 'open',
  admin_note      TEXT,
  requested_at    TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- BOOK DONATIONS
-- ============================================================
CREATE TABLE IF NOT EXISTS book_donations (
  id                  UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id             UUID REFERENCES user_profiles(id) ON DELETE SET NULL,
  book_title          TEXT NOT NULL,
  book_author         TEXT,
  file_url            TEXT,
  notes               TEXT,
  suggested_category  TEXT,
  status              TEXT DEFAULT 'under_review',
  submitted_at        TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- ROW LEVEL SECURITY
-- ============================================================
ALTER TABLE books ENABLE ROW LEVEL SECURITY;

-- Public: freely accessible published books
DO $$ 
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_policies WHERE policyname = 'Public books visible to all'
    ) THEN
        CREATE POLICY "Public books visible to all"
          ON books FOR SELECT
          USING (is_published = TRUE AND is_restricted = FALSE);
    END IF;
END $$;

-- Vault: restricted books only for approved users
DO $$ 
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_policies WHERE policyname = 'Restricted books for approved users'
    ) THEN
        CREATE POLICY "Restricted books for approved users"
          ON books FOR SELECT
          USING (
            is_restricted = TRUE AND
            EXISTS (
              SELECT 1 FROM vault_access_requests
              WHERE vault_access_requests.book_id = books.id
                AND vault_access_requests.user_id = auth.uid()
                AND vault_access_requests.status = 'approved'
            )
          );
    END IF;
END $$;

-- Admin: full access
DO $$ 
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_policies WHERE policyname = 'Admin full access'
    ) THEN
        CREATE POLICY "Admin full access"
          ON books FOR ALL
          USING (
            EXISTS (
              SELECT 1 FROM user_profiles
              WHERE id = auth.uid() AND role = 'admin'
            )
          );
    END IF;
END $$;
