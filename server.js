// server.js
const express = require('express');
const mysql = require('mysql2');
const app = express();
const PORT = 3000;

// Middleware
app.use(express.json());

// MySQL Connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',       // change if needed
  password: '',       // your MySQL password
  database: 'practice_db' // your DB name
});

db.connect(err => {
  if (err) {
    console.error('Database connection failed:', err);
    return;
  }
  console.log('✅ Connected to MySQL Database.');
});


// -------------------------------
// 1️⃣ GET - Retrieve All Products
// -------------------------------
app.get('/api/products', (req, res) => {
  const sql = 'SELECT * FROM products';
  db.query(sql, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});


// -------------------------------
// 2️⃣ GET - Retrieve a Product by ID
// -------------------------------
app.get('/api/products/:id', (req, res) => {
  const { id } = req.params;
  const sql = 'SELECT * FROM products WHERE id = ?';
  db.query(sql, [id], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    if (results.length === 0) return res.status(404).json({ message: 'Product not found' });
    res.json(results[0]);
  });
});


// -------------------------------
// 3️⃣ POST - Add a New Product
// -------------------------------
app.post('/api/products', (req, res) => {
  const { product_name, price } = req.body;
  if (!product_name || !price) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  const sql = 'INSERT INTO products (product_name, price) VALUES (?, ?)';
  db.query(sql, [product_name, price], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(201).json({ message: 'Product added', id: result.insertId });
  });
});


// -------------------------------
// 4️⃣ PUT - Update an Existing Product
// -------------------------------
app.put('/api/products/:id', (req, res) => {
  const { id } = req.params;
  const { product_name, price } = req.body;

  const sql = 'UPDATE products SET product_name = ?, price = ? WHERE id = ?';
  db.query(sql, [product_name, price, id], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    if (result.affectedRows === 0) return res.status(404).json({ message: 'Product not found' });
    res.json({ message: 'Product updated successfully' });
  });
});


// -------------------------------
// 5️⃣ DELETE - Remove a Product
// -------------------------------
app.delete('/api/products/:id', (req, res) => {
  const { id } = req.params;
  const sql = 'DELETE FROM products WHERE id = ?';
  db.query(sql, [id], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    if (result.affectedRows === 0) return res.status(404).json({ message: 'Product not found' });
    res.json({ message: 'Product deleted successfully' });
  });
});


// -------------------------------
// USERS ENDPOINTS
// -------------------------------

// 1️⃣ GET - Retrieve All Users
app.get('/api/users', (req, res) => {
  const sql = 'SELECT * FROM users';
  db.query(sql, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

// 2️⃣ GET - Retrieve a User by ID
app.get('/api/users/:id', (req, res) => {
  const { id } = req.params;
  const sql = 'SELECT * FROM users WHERE id = ?';
  db.query(sql, [id], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    if (results.length === 0) return res.status(404).json({ message: 'User not found' });
    res.json(results[0]);
  });
});

// 3️⃣ POST - Add a New User
app.post('/api/users', (req, res) => {
  const { username, email } = req.body;
  if (!username || !email) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  const sql = 'INSERT INTO users (username, email) VALUES (?, ?)';
  db.query(sql, [username, email], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(201).json({ message: 'User added', id: result.insertId });
  });
});

// 4️⃣ PUT - Update an Existing User
app.put('/api/users/:id', (req, res) => {
  const { id } = req.params;
  const { username, email } = req.body;

  const sql = 'UPDATE users SET username = ?, email = ? WHERE id = ?';
  db.query(sql, [username, email, id], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    if (result.affectedRows === 0) return res.status(404).json({ message: 'User not found' });
    res.json({ message: 'User updated successfully' });
  });
});

// 5️⃣ DELETE - Remove a User
app.delete('/api/users/:id', (req, res) => {
  const { id } = req.params;
  const sql = 'DELETE FROM users WHERE id = ?';
  db.query(sql, [id], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    if (result.affectedRows === 0) return res.status(404).json({ message: 'User not found' });
    res.json({ message: 'User deleted successfully' });
  });
});

