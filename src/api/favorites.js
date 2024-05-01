const express = require('express');
const router = express.Router();
const pool = require('../config/database');
const { authenticateToken } = require('../middleware/authenticate');

// Endpoint to save a favorite player with detailed stats
router.post('/', authenticateToken, async (req, res) => {
  const { userId } = req.user;
  const {
    playerId,
    player_name,
    team_name,
    player_image_url,
    team_image_url,
    points_per_game,
    rebounds_per_game,
    assists_per_game,
    blocks_per_game,
    steals_per_game,
    fg_percentage,
    ft_percentage,
    turnovers_per_game,
    plus_minus,
  } = req.body;

  try {
    const result = await pool.query(
      `INSERT INTO favorites (user_id, player_id, player_name, team_name, player_image_url, team_image_url,
      points_per_game, rebounds_per_game, assists_per_game, blocks_per_game,
      steals_per_game, fg_percentage, ft_percentage, turnovers_per_game, plus_minus) 
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15) RETURNING *`,
      [
        userId,
        playerId,
        player_name,
        team_name,
        player_image_url,
        team_image_url,
        points_per_game,
        rebounds_per_game,
        assists_per_game,
        blocks_per_game,
        steals_per_game,
        fg_percentage,
        ft_percentage,
        turnovers_per_game,
        plus_minus,
      ]
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
