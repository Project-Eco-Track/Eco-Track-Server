// src/api/user/login.js

const express = require('express');
const router = express.Router();
const tidbConnection = require('../db/tiDB');

router.post('/', async (req, res) => {
    try {
      // extracting user informations from the request payload
      const { userId, name, email } = req.body;
  
      // Storing details in TiDB
      await tidbConnection.storeUserDetails(userId, name, email);
  
      // Response
      res.status(200).json({ message: 'User details stored successfully' });
    } catch (error) {
      console.error('Error storing user details:', error);
      res.status(500).json({ error: 'Failed to store user details' });
    }
  });

module.exports = router;
