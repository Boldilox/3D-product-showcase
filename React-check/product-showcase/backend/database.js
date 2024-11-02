// backend/database.js
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./products.db');

db.serialize(() => {
  // Create the products table if it doesn't exist
  db.run(`CREATE TABLE IF NOT EXISTS products (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    description TEXT
  )`);

  // Insert sample data if the table is empty
  db.get("SELECT COUNT(*) as count FROM products", (err, row) => {
    if (row.count === 0) {
      db.run("INSERT INTO products (name, description) VALUES (?, ?)", ["Strawberry", "A refreshing surge of strawberry flavor."]);
      db.run("INSERT INTO products (name, description) VALUES (?, ?)", ["Avocado", "Rich and creamy avocado energy drink."]);
      db.run("INSERT INTO products (name, description) VALUES (?, ?)", ["Orange", "A tangy orange drink for a citrusy kick."]);
    }
  });
});

module.exports = db;
