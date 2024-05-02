const express = require('express');
const router = express.Router();
const pool = require('../config/database');
const { authenticateToken } = require('../middleware/authenticate');

router.post('/', authenticateToken, async (req, res) => {
  const {
    userId,
    player_id,
    season,
    points,
    rebounds,
    assists,
    blocks,
    steals,
    plus_minus,
    field_goal_percentage,
    free_throw_percentage,
    turnovers,
  } = req.body;

  try {
    const result = await pool.query(
      `INSERT INTO player_statistics (user_id, player_id, season, points, rebounds, assists, blocks, steals, plus_minus, field_goal_percentage, free_throw_percentage, turnovers) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12) RETURNING *`,
      [
        userId,
        player_id,
        season,
        game_number,
        points,
        rebounds,
        assists,
        blocks,
        steals,
        plus_minus,
        field_goal_percentage,
        free_throw_percentage,
        turnovers,
      ]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('Error saving player statistics:', error);
    res.status(500).json({
      message: 'Failed to save player statistics',
      error: error.detail || error.message,
    });
  }
});

router.get('/', authenticateToken, async (req, res) => {
  const userId = req.user.id;

  try {
    const result = await pool.query(
      'SELECT * FROM player_statistics WHERE user_id = $1',
      [userId]
    );
    res.status(200).json(result.rows);
  } catch (error) {
    console.error('Error fetching player statistics:', error);
    res.status(500).json({ message: 'Failed to fetch player statistics' });
  }
});

module.exports = router;
