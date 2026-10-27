import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import path from 'node:path';

const root = path.resolve(import.meta.dirname, '..');
const read = (relative) => readFile(path.join(root, relative), 'utf8');

test('branding is centralized and Instagram defaults to demo', async () => {
  const source = await read('packages/shared/src/branding.ts');
  assert.match(source, /name: 'Creator Platform'/);
  assert.match(source, /instagramMode: 'demo'/);
  assert.match(source, /supportedLocales: \['en', 'ur', 'ar'\]/);
});

test('i18n foundation includes Urdu and Arabic RTL direction', async () => {
  const source = await read('packages/shared/src/i18n.ts');
  assert.match(source, /ur: \{/);
  assert.match(source, /ar: \{/);
  assert.match(source, /locale === 'ur' \|\| locale === 'ar' \? 'rtl' : 'ltr'/);
});

test('API health endpoint never claims Instagram is connected', async () => {
  const source = await read('apps/api/src/index.ts');
  assert.match(source, /pathname === '\/api\/health'/);
  assert.match(source, /connected: false/);
});

test('migration baseline includes core account tables and safe role checks', async () => {
  const sql = await read('database/migrations/0001_foundation.sql');
  assert.match(sql, /CREATE TABLE IF NOT EXISTS users/);
  assert.match(sql, /CREATE TABLE IF NOT EXISTS profiles/);
  assert.match(sql, /CREATE TABLE IF NOT EXISTS sessions/);
  assert.match(sql, /CHECK \(role IN \('creator', 'brand', 'admin'\)\)/);
  assert.match(sql, /ON DELETE CASCADE/);
});

test('creator content migration uses JSON validation and indexes', async () => {
  const sql = await read('database/migrations/0002_creator_content.sql');
  assert.match(sql, /CREATE TABLE IF NOT EXISTS saved_content/);
  assert.match(sql, /json_valid\(content_json\)/);
  assert.match(sql, /idx_calendar_user_scheduled/);
});

test('secret placeholders exist and real env files are ignored', async () => {
  assert.equal(existsSync(path.join(root, '.env.example')), true);
  const gitignore = await read('.gitignore');
  assert.match(gitignore, /^\.env\.\*$/m);
  assert.match(gitignore, /!\.env\.example/);
});

test('Phase 1 navigation includes required product sections', async () => {
  const source = await read('apps/web/src/App.tsx');
  for (const route of ['/studio', '/video', '/auto-dm', '/marketplace', '/analytics', '/settings']) {
    assert.ok(source.includes(route), `Missing navigation route ${route}`);
  }
});
