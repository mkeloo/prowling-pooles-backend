const express = require('express');
const router = express.Router();
const pool = require('../config/database');
const { authenticateToken } = require('../middleware/authenticate');

// POST endpoint to create a new note
router.post('/', authenticateToken, async (req, res) => {
  const userId = req.user.id;
  const { title, content } = req.body;

  try {
    const result = await pool.query(
      'INSERT INTO notes (user_id, title, content) VALUES ($1, $2, $3) RETURNING *',
      [userId, title, content]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('Error creating note:', error);
    res
      .status(500)
      .json({ message: 'Failed to create note', error: error.detail });
  }
});

// GET endpoint to retrieve all notes for the logged-in user
router.get('/', authenticateToken, async (req, res) => {
  const userId = req.user.id;

  try {
    const result = await pool.query(
      'SELECT * FROM notes WHERE user_id = $1 ORDER BY created_at DESC',
      [userId]
    );
    res.status(200).json(result.rows);
  } catch (error) {
    console.error('Error fetching notes:', error);
    res.status(500).json({ message: 'Failed to fetch notes' });
  }
});

// PUT endpoint to update an existing note
router.put('/:id', authenticateToken, async (req, res) => {
  const noteId = req.params.id;
  const { title, content } = req.body;

  try {
    const result = await pool.query(
      'UPDATE notes SET title = $1, content = $2, updated_at = NOW() WHERE id = $3 AND user_id = $4 RETURNING *',
      [title, content, noteId, req.user.id]
    );
    if (result.rows.length > 0) {
      res.status(200).json(result.rows[0]);
    } else {
      res.status(404).json({ message: 'Note not found' });
    }
  } catch (error) {
    console.error('Error updating note:', error);
    res
      .status(500)
      .json({ message: 'Failed to update note', error: error.detail });
  }
});

// DELETE endpoint to delete a note
router.delete('/:id', authenticateToken, async (req, res) => {
  const noteId = req.params.id;

  try {
    const result = await pool.query(
      'DELETE FROM notes WHERE id = $1 AND user_id = $2 RETURNING *',
      [noteId, req.user.id]
    );
    if (result.rows.length > 0) {
      res.status(200).json({ message: 'Note deleted successfully' });
    } else {
      res.status(404).json({ message: 'Note not found' });
    }
  } catch (error) {
    console.error('Error deleting note:', error);
    res
      .status(500)
      .json({ message: 'Failed to delete note', error: error.detail });
  }
});

module.exports = router;
