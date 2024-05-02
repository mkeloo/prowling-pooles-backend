const express = require('express');
const router = express.Router();
const pool = require('../config/database');
const { authenticateToken } = require('../middleware/authenticate');

// POST route to insert comparison totals
router.post('/', authenticateToken, async (req, res) => {
  const { userId, comparisonData } = req.body; // comparisonData contains all fields for comparison_totals

  try {
    const result = await pool.query(
      `INSERT INTO comparison_totals (
        user_id, 
        points_comparison1, points_comparison2, points_delta, 
        rebounds_comparison1, rebounds_comparison2, rebounds_delta, 
        assists_comparison1, assists_comparison2, assists_delta, 
        blocks_comparison1, blocks_comparison2, blocks_delta, 
        steals_comparison1, steals_comparison2, steals_delta, 
        fg_percentage_comparison1, fg_percentage_comparison2, fg_percentage_delta, 
        ft_percentage_comparison1, ft_percentage_comparison2, ft_percentage_delta, 
        turnovers_comparison1, turnovers_comparison2, turnovers_delta, 
        total_comparison1, total_comparison2, total_delta, 
        recorded_at
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21, $22, $23, $24, $25, $26, $27, $28, CURRENT_TIMESTAMP)
      RETURNING *`,
      [userId, ...Object.values(comparisonData)]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('Error saving comparison totals:', error);
    res.status(500).json({
      message: 'Failed to save comparison totals',
      error: error.detail || error.message,
    });
  }
});

// GET route to fetch comparison totals for a user
router.get('/', authenticateToken, async (req, res) => {
  const userId = req.user.id;

  try {
    const result = await pool.query(
      'SELECT * FROM comparison_totals WHERE user_id = $1',
      [userId]
    );
    res.status(200).json(result.rows);
  } catch (error) {
    console.error('Error fetching comparison totals:', error);
    res.status(500).json({ message: 'Failed to fetch comparison totals' });
  }
});

module.exports = router;
