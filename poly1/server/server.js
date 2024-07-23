const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const questionsRouter = require('./routes/questions');

const app = express();
const PORT = process.env.PORT || 5000;

mongoose.connect('mongodb://localhost/william_ruto_trivia', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log("Connected to MongoDB"))
.catch(err => console.error("Could not connect to MongoDB", err));

app.use(cors());
app.use(express.json());
app.use('/api/questions', questionsRouter);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
