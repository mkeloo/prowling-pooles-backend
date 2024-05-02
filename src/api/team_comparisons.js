const express = require('express');
const router = express.Router();
const pool = require('../config/database');
const { authenticateToken } = require('../middleware/authenticate');

router.post('/', authenticateToken, async (req, res) => {
  const {
    userId,
    team1_id,
    team1_name,
    team1_image_url,
    team1_points_per_game,
    team1_rebounds_per_game,
    team1_assists_per_game,
    team1_blocks_per_game,
    team1_steals_per_game,
    team1_plus_minus,
    team1_field_goal_percentage,
    team1_free_throw_percentage,
    team1_turnovers_per_game,
    team1_points_leader,
    team1_ppg,
    team1_assist_leader,
    team1_apg,
    team1_rebound_leader,
    team1_rpg,
    team2_id,
    team2_name,
    team2_image_url,
    team2_points_per_game,
    team2_rebounds_per_game,
    team2_assists_per_game,
    team2_blocks_per_game,
    team2_steals_per_game,
    team2_plus_minus,
    team2_field_goal_percentage,
    team2_free_throw_percentage,
    team2_turnovers_per_game,
    team2_points_leader,
    team2_ppg,
    team2_assist_leader,
    team2_apg,
    team2_rebound_leader,
    team2_rpg,
  } = req.body;

  try {
    const result = await pool.query(
      `INSERT INTO team_comparisons (user_id, team1_id, team1_name, team1_image_url, team1_points_per_game, team1_rebounds_per_game, team1_assists_per_game, team1_blocks_per_game, team1_steals_per_game, team1_plus_minus, team1_field_goal_percentage, team1_free_throw_percentage, team1_turnovers_per_game, team1_points_leader, team1_ppg, team1_assist_leader, team1_apg, team1_rebound_leader, team1_rpg, team2_id, team2_name, team2_image_url, team2_points_per_game, team2_rebounds_per_game, team2_assists_per_game, team2_blocks_per_game, team2_steals_per_game, team2_plus_minus, team2_field_goal_percentage, team2_free_throw_percentage, team2_turnovers_per_game, team2_points_leader, team2_ppg, team2_assist_leader, team2_apg, team2_rebound_leader, team2_rpg) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21, $22, $23, $24, $25, $26, $27, $28, $29, $30, $31, $32, $33, $34, $35, $36, $37, $38) RETURNING *`,
      [
        userId,
        team1_id,
        team1_name,
        team1_image_url,
        team1_points_per_game,
        team1_rebounds_per_game,
        team1_assists_per_game,
        team1_blocks_per_game,
        team1_steals_per_game,
        team1_plus_minus,
        team1_field_goal_percentage,
        team1_free_throw_percentage,
        team1_turnovers_per_game,
        team1_points_leader,
        team1_ppg,
        team1_assist_leader,
        team1_apg,
        team1_rebound_leader,
        team1_rpg,
        team2_id,
        team2_name,
        team2_image_url,
        team2_points_per_game,
        team2_rebounds_per_game,
        team2_assists_per_game,
        team2_blocks_per_game,
        team2_steals_per_game,
        team2_plus_minus,
        team2_field_goal_percentage,
        team2_free_throw_percentage,
        team2_turnovers_per_game,
        team2_points_leader,
        team2_ppg,
        team2_assist_leader,
        team2_apg,
        team2_rebound_leader,
        team2_rpg,
      ]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('Error saving team comparison:', error);
    res.status(500).json({
      message: 'Failed to save team comparison',
      error: error.detail || error.message,
    });
  }
});

router.get('/', authenticateToken, async (req, res) => {
  const userId = req.user.id;

  try {
    const result = await pool.query(
      'SELECT * FROM team_comparisons WHERE user_id = $1',
      [userId]
    );
    res.status(200).json(result.rows);
  } catch (error) {
    console.error('Error fetching team comparisons:', error);
    res.status(500).json({ message: 'Failed to fetch team comparisons' });
  }
});

module.exports = router;
