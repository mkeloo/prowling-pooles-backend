const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const pool = require('../config/database');

// Middleware to log request headers (for debugging CORS issues)
router.use((req, res, next) => {
  console.log(req.method, 'to', req.path, 'from', req.headers.origin);
  res.status(200).header('Access-Control-Allow-Origin', '*');
  console.log('Headers:', req.headers);
  next();
});

// Test DB connectivity
router.get('/test-db', async (req, res) => {
  try {
    const result = await pool.query('SELECT 1 + 1 AS solution');
    res.send(`Database test successful, result: ${result.rows[0].solution}`);
  } catch (error) {
    console.error('Database test failed:', error);
    res.status(500).send('Database test failed');
  }
});

// Register User
router.post('/register', async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const result = await pool.query('SELECT id FROM users WHERE email = $1', [
      email,
    ]);
    if (result.rows.length > 0) {
      return res.status(409).json({ message: 'Email already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    await pool.query(
      'INSERT INTO users (username, email, password) VALUES ($1, $2, $3)',
      [username, email, hashedPassword]
    );
    res.status(201).json({ message: 'User registered successfully!' });
  } catch (error) {
    console.error('Registration error:', error);
    res
      .status(500)
      .json({ message: 'Error registering user', error: error.message });
  }
});

// Login User
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const result = await pool.query('SELECT * FROM users WHERE email = $1', [
      email,
    ]);
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'User not found' });
    }

    const user = result.rows[0];
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign(
      { id: user.id, username: user.username },
      process.env.JWT_SECRET,
      {
        expiresIn: '1h',
      }
    );
    res.status(200).json({
      message: 'Logged in successfully!',
      token,
      user: { id: user.id, username: user.username },
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Error logging in', error: error.message });
  }
});

module.exports = router;
