const express = require('express');
const router = express.Router();

// root URL
router.get('/login', (req, res) => {
  res.send('Welcome to EcoTrack, please login');
});

module.exports = router;
