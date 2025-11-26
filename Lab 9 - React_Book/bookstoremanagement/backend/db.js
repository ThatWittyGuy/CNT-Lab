// Path: backend/db.js
const mysql = require('mysql2');
const dotenv = require('dotenv');
dotenv.config();

// Use DB_PORT from env if provided, otherwise fall back to 3306 (common default).
const dbPort = process.env.DB_PORT ? parseInt(process.env.DB_PORT, 10) : 3306;

const db = mysql.createConnection({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  port: dbPort,
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'bookstore'
});

// Attempt to connect but don't crash the whole process if DB is unavailable.
db.connect((err) => {
  if (err) {
    console.error('MySQL connection error (server will still start):', err.message || err);
    // Note: queries will fail later and should be handled by route handlers.
    return;
  }
  console.log('MySQL Connected...');
});

module.exports = db;
