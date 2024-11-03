const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./products.db');

db.serialize(() => {
  // Drop the existing products table if needed (optional)
  db.run(`DROP TABLE IF EXISTS products`);

  // Create the products table with two image fields
  db.run(`CREATE TABLE IF NOT EXISTS products (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    description TEXT,
    sliderImageUrl TEXT,
    thumbnailImageUrl TEXT
  )`);

  // Insert sample data if the table is empty
  db.get("SELECT COUNT(*) as count FROM products", (err, row) => {
    if (row.count === 0) {
      db.run("INSERT INTO products (name, description, sliderImageUrl, thumbnailImageUrl) VALUES (?, ?, ?, ?)", [
        "Strawberry", 
        "A refreshing surge of strawberry flavor.",
        "images/slider-strawberry.jpg",
        "images/thumbnail-strawberry.jpg"
      ]);
      db.run("INSERT INTO products (name, description, sliderImageUrl, thumbnailImageUrl) VALUES (?, ?, ?, ?)", [
        "Avocado", 
        "Rich and creamy avocado energy drink.",
        "images/slider-avocado.jpg",
        "images/thumbnail-avocado.jpg"
      ]);
      db.run("INSERT INTO products (name, description, sliderImageUrl, thumbnailImageUrl) VALUES (?, ?, ?, ?)", [
        "Orange", 
        "A tangy orange drink for a citrusy kick.",
        "images/slider-orange.jpg",
        "images/thumbnail-orange.jpg"
      ]);
    }
  });
});

module.exports = db;
