const express = require('express');
const router = express.Router();
const Question = require('../models/Question');

router.get('/', async (req, res) => {
    console.log("GET request received for /api/questions");
    try {
        const questions = await Question.find();
        console.log("Questions found:", questions);
        res.json(questions);
    } catch (err) {
        console.error("Error fetching questions:", err);
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
