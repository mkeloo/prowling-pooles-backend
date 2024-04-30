// const express = require('express');
// const bcrypt = require('bcryptjs');
// const pool = require('../config/database');
// const router = express.Router();

// router.post('/register', async (req, res) => {
//   const { username, password, email } = req.body;
//   console.log('Received registration request:', req.body);

//   if (!username || !password || !email) {
//     console.log('Missing fields in registration attempt');
//     return res.status(400).json({ message: 'Please enter all fields' });
//   }

//   try {
//     const [users] = await pool.execute(`SELECT id FROM users WHERE email = ?`, [
//       email,
//     ]);
//     if (users.length > 0) {
//       console.log('User already exists with email:', email);
//       return res.status(400).json({ message: 'User already exists' });
//     }

//     const hashedPassword = await bcrypt.hash(password, 10);
//     const [result] = await pool.execute(
//       `INSERT INTO users (username, password, email) VALUES (?, ?, ?)`,
//       [username, hashedPassword, email]
//     );

//     console.log('User registered:', result);
//     res.status(201).json({ message: 'User registered successfully!' });
//   } catch (error) {
//     console.error('Registration error:', error);
//     res.status(500).json({ message: 'Error registering the user.' });
//   }
// });

// module.exports = router;
