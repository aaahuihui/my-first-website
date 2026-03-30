const fs = require('node:fs');
const path = require('node:path');
const { DatabaseSync } = require('node:sqlite');

const dataDir = path.join(__dirname, 'data');
const dbPath = path.join(dataDir, 'resources.db');

function ensureDatabase() {
  fs.mkdirSync(dataDir, { recursive: true });
  const db = new DatabaseSync(dbPath);

  db.exec(`
    CREATE TABLE IF NOT EXISTS resources (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      description TEXT NOT NULL,
      category TEXT NOT NULL,
      visibility TEXT NOT NULL CHECK (visibility IN ('public', 'private')),
      aliyun_url TEXT DEFAULT '',
      aliyun_code TEXT DEFAULT '',
      baidu_url TEXT DEFAULT '',
      baidu_code TEXT DEFAULT '',
      updated_at TEXT NOT NULL
    );
  `);

  return db;
}

function listResources(visibility = 'all') {
  const db = ensureDatabase();
  let rows;

  if (visibility === 'all') {
    rows = db.prepare(`
      SELECT id, title, description, category, visibility, aliyun_url, aliyun_code, baidu_url, baidu_code, updated_at
      FROM resources
      ORDER BY updated_at DESC, id DESC
    `).all();
  } else {
    rows = db.prepare(`
      SELECT id, title, description, category, visibility, aliyun_url, aliyun_code, baidu_url, baidu_code, updated_at
      FROM resources
      WHERE visibility = ?
      ORDER BY updated_at DESC, id DESC
    `).all(visibility);
  }

  db.close();
  return rows;
}

function addResource(resource) {
  const db = ensureDatabase();
  const statement = db.prepare(`
    INSERT INTO resources (title, description, category, visibility, aliyun_url, aliyun_code, baidu_url, baidu_code, updated_at)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);

  const result = statement.run(
    resource.title,
    resource.description,
    resource.category,
    resource.visibility,
    resource.aliyun_url || '',
    resource.aliyun_code || '',
    resource.baidu_url || '',
    resource.baidu_code || '',
    resource.updated_at
  );

  const inserted = db.prepare(`
    SELECT id, title, description, category, visibility, aliyun_url, aliyun_code, baidu_url, baidu_code, updated_at
    FROM resources
    WHERE id = ?
  `).get(result.lastInsertRowid);

  db.close();
  return inserted;
}

function deleteResource(id) {
  const db = ensureDatabase();
  const result = db.prepare('DELETE FROM resources WHERE id = ?').run(id);
  db.close();
  return result.changes > 0;
}

module.exports = {
  dbPath,
  ensureDatabase,
  listResources,
  addResource,
  deleteResource
};
