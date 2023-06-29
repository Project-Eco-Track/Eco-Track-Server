// src/api/user/login.js

const express = require('express');
const router = express.Router();
const tidbConnection = require('../../db/tiDB');

router.post('/', async (req, res) => {
  try {
    // Get relevant information from the request payload 
    const { userid, name, email } = req.body;

    // Store user info in TiDB
    await tidbConnection.storeUserDetails(userid, name, email);

    // Respond with success status and user ID
    res.status(200).json({ message: 'User details stored successfully', userId: userid });
  } catch (error) {
    console.error('Error storing user details:', error);
    res.status(500).json({ error: 'Failed to store user details' });
  }
});

module.exports = router;
