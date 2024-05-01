const express = require('express');
const router = express.Router();
const pool = require('../config/database');
const { authenticateToken } = require('../middleware/authenticate');

// Endpoint to save a favorite player
router.post('/', authenticateToken, async (req, res) => {
  const userId = req.user.id;
  const { playerId } = req.body;

  try {
    const result = await pool.query(
      'INSERT INTO favorites (user_id, player_id) VALUES ($1, $2) RETURNING *',
      [userId, playerId]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('Error saving favorite:', error);
    res.status(500).json({ message: 'Failed to save favorite' });
  }
});

// Endpoint to retrieve all saved players for the logged-in user
router.get('/', authenticateToken, async (req, res) => {
  const userId = req.user.id;

  try {
    const result = await pool.query(
      'SELECT * FROM favorites WHERE user_id = $1',
      [userId]
    );
    res.status(200).json(result.rows);
  } catch (error) {
    console.error('Error fetching favorites:', error);
    res.status(500).json({ message: 'Failed to fetch favorites' });
  }
});

module.exports = router;
