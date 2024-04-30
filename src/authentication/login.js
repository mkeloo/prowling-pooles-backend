// const express = require('express');
// const bcrypt = require('bcryptjs');
// const jwt = require('jsonwebtoken');
// const pool = require('../config/database');
// const router = express.Router();

// router.post('/login', async (req, res) => {
//   const { email, password } = req.body;

//   if (!email || !password) {
//     return res
//       .status(400)
//       .json({ message: 'Please provide both email and password' });
//   }

//   try {
//     // Retrieve user from the database
//     const [users] = await pool.execute(`SELECT * FROM users WHERE email = ?`, [
//       email,
//     ]);

//     if (users.length === 0) {
//       return res.status(401).json({ message: 'Invalid credentials' });
//     }

//     // Compare hashed password
//     const validPassword = await bcrypt.compare(password, users[0].password);
//     if (!validPassword) {
//       return res.status(401).json({ message: 'Invalid credentials' });
//     }

//     // Create token
//     const token = jwt.sign(
//       { id: users[0].id, username: users[0].username },
//       process.env.JWT_SECRET,
//       { expiresIn: '1h' }
//     );

//     res.status(200).json({
//       message: 'Logged in successfully!',
//       token: token,
//       user: {
//         id: users[0].id,
//         username: users[0].username,
//         email: users[0].email,
//       },
//     });
//   } catch (error) {
//     console.error('Login error:', error);
//     res.status(500).json({ message: 'Server error during user login.' });
//   }
// });

// module.exports = router;
