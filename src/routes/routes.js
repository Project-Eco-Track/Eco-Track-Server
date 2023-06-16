const express = require('express');
const router = express.Router();

// root URL
router.get('/', (req, res) => {
  res.send('Hello, EcoTrack!');
});

module.exports = router;
