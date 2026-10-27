-- Phase 1 schema baseline for content records; product workflows are implemented later.
PRAGMA foreign_keys = ON;

CREATE TABLE IF NOT EXISTS creator_profiles (
  user_id TEXT PRIMARY KEY NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  niche TEXT NOT NULL DEFAULT '',
  portfolio_url TEXT,
  languages_json TEXT NOT NULL DEFAULT '[]' CHECK (json_valid(languages_json)),
  public_metrics_json TEXT NOT NULL DEFAULT '{}' CHECK (json_valid(public_metrics_json)),
  created_at TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')),
  updated_at TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now'))
);

CREATE TABLE IF NOT EXISTS saved_content (
  id TEXT PRIMARY KEY NOT NULL,
  user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  content_type TEXT NOT NULL CHECK (content_type IN ('caption', 'hashtag_set', 'bio', 'idea', 'template', 'thumbnail_metadata')),
  title TEXT NOT NULL DEFAULT '',
  content_json TEXT NOT NULL CHECK (json_valid(content_json)),
  created_at TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')),
  updated_at TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now'))
);
CREATE INDEX IF NOT EXISTS idx_saved_content_user_updated ON saved_content(user_id, updated_at DESC);

CREATE TABLE IF NOT EXISTS content_calendar_entries (
  id TEXT PRIMARY KEY NOT NULL,
  user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT NOT NULL DEFAULT '',
  scheduled_at TEXT,
  timezone TEXT NOT NULL DEFAULT 'UTC',
  status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'planned', 'published', 'cancelled')),
  content_json TEXT NOT NULL DEFAULT '{}' CHECK (json_valid(content_json)),
  created_at TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')),
  updated_at TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now'))
);
CREATE INDEX IF NOT EXISTS idx_calendar_user_scheduled ON content_calendar_entries(user_id, scheduled_at);

INSERT OR IGNORE INTO schema_migrations(version) VALUES ('0002_creator_content');
