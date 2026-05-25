const Database = require('better-sqlite3');
const db = new Database('users.db');

// Create users table
db.exec(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    age INTEGER NOT NULL,
    college TEXT NOT NULL,
    phone TEXT NOT NULL,
    aadhaar TEXT NOT NULL,
    username TEXT NOT NULL UNIQUE,
    password TEXT NOT NULL,
    role TEXT DEFAULT 'user'
  )
`);

module.exports = db;