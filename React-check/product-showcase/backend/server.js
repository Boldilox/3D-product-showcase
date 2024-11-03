const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const db = require('./database'); // Ensure database.js is set up with SQLite connection

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Fetch all products
app.get('/api/products', (req, res) => {
  db.all("SELECT * FROM products", (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json(rows);
  });
});

// Create a new product
app.post('/api/products', (req, res) => {
  const { name, description } = req.body;
  const sql = "INSERT INTO products (name, description) VALUES (?, ?)";
  db.run(sql, [name, description], function (err) {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    // Respond with the newly created product's ID and data
    res.json({ id: this.lastID, name, description });
  });
});

// Update an existing product by ID
app.put('/api/products/:id', (req, res) => {
  const { id } = req.params;
  const { name, description } = req.body;
  const sql = "UPDATE products SET name = ?, description = ? WHERE id = ?";
  db.run(sql, [name, description, id], function (err) {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({ success: true });
  });
});

// Delete a product by ID
app.delete('/api/products/:id', (req, res) => {
  const { id } = req.params;
  const sql = "DELETE FROM products WHERE id = ?";
  db.run(sql, id, function (err) {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({ success: true });
  });
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
