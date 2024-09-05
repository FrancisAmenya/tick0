const express = require('express');
const router = express.Router();
const Question = require('../models/Question'); // MongoDB model for questions
const { db } = require('../firebase/firebaseAdmin'); // Import Firestore for leaderboard

// Route for getting questions from MongoDB
router.get('/', async (req, res) => {
    console.log("GET request received for /api/questions");
    try {
        const questions = await Question.find(); // Fetch questions from MongoDB
        console.log("Questions found:", questions);
        res.json(questions); // Send questions as JSON response
    } catch (err) {
        console.error("Error fetching questions:", err);
        res.status(500).json({ message: err.message }); // Send error message as JSON
    }
});

// Route for getting leaderboard from Firestore
router.get('/leaderboard', async (req, res) => {
    console.log("GET request received for /api/leaderboard");
    try {
        const snapshot = await db.collection('scores').orderBy('score', 'desc').limit(10).get(); // Fetch top 10 scores
        const leaderboard = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        
        console.log("Leaderboard found:", leaderboard);
        res.json(leaderboard); // Send leaderboard as JSON response
    } catch (err) {
        console.error("Error fetching leaderboard:", err);
        res.status(500).json({ message: err.message }); // Send error message as JSON
    }
});

// Export the router
module.exports = router;