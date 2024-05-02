const express = require('express');
const router = express.Router();
const pool = require('../config/database');
const { authenticateToken } = require('../middleware/authenticate');

// POST endpoint to save an article
router.post('/', authenticateToken, async (req, res) => {
  console.log(req.body);
  const userId = req.user.id;
  const { article_id, title, source, url, image_url } = req.body;

  try {
    const result = await pool.query(
      'INSERT INTO saved_articles (user_id, article_id, title, source, url, image_url) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
      [userId, article_id, title, source, url, image_url]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('Error saving article:', error);
    res
      .status(500)
      .json({ message: 'Failed to save article', error: error.detail });
  }
});

// GET endpoint to retrieve all saved articles for the logged-in user
router.get('/', authenticateToken, async (req, res) => {
  const userId = req.user.id;

  try {
    const result = await pool.query(
      'SELECT * FROM saved_articles WHERE user_id = $1 ORDER BY saved_at DESC',
      [userId]
    );
    res.status(200).json(result.rows);
  } catch (error) {
    console.error('Error fetching saved articles:', error);
    res.status(500).json({ message: 'Failed to fetch saved articles' });
  }
});

module.exports = router;
