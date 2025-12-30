const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Advisory = require('../models/Advisory');

// Save advisory result to DB (requires auth)
router.post('/save', auth, async (req, res) => {
  const { input, result, notes } = req.body;
  try {
    const a = new Advisory({ user: req.user._id, input, result, notes });
    await a.save();
    return res.json({ success: true, advisory: a });
  } catch (err) {
    console.error('Save advisory error', err);
    return res.status(500).json({ error: 'Failed to save advisory' });
  }
});

// Get current user's advisory history
router.get('/history', auth, async (req, res) => {
  try {
    const list = await Advisory.find({ user: req.user._id }).sort({ createdAt: -1 }).lean();
    return res.json({ list });
  } catch (err) {
    console.error('Get advisory history', err);
    return res.status(500).json({ error: 'Failed to fetch history' });
  }
});

module.exports = router;
