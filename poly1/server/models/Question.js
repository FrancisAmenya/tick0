const mongoose = require('mongoose');

const QuestionSchema = new mongoose.Schema({
    text: String,
    options: [String],
    correctAnswer: String,
});

module.exports = mongoose.model('Question', QuestionSchema);
