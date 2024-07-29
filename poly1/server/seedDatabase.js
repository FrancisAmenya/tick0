const mongoose = require('mongoose');
const Question = require('./models/Question');

mongoose.connect('mongodb://localhost/william_ruto_trivia', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const sampleQuestions = [
    {
        text: "In which year was William Ruto born?",
        options: ["1966", "1968", "1970", "1972"],
        correctAnswer: "1966"
    },
    {
        text: "What position does William Ruto hold in Kenya as of 2023?",
        options: ["President", "Prime Minister", "Vice President", "Minister of Foreign Affairs"],
        correctAnswer: "President"
    },
    {
        text: "Which political party is William Ruto associated with?",
        options: ["Orange Democratic Movement", "Jubilee Party", "United Democratic Alliance", "KANU"],
        correctAnswer: "United Democratic Alliance"
    }
];

const seedDB = async () => {
    await Question.deleteMany({});
    await Question.insertMany(sampleQuestions);
    console.log("Database seeded!");
    mongoose.connection.close();
};

seedDB();
