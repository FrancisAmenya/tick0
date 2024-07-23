import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Question from './Question';
import Score from './Score';

const Game = () => {
    const [questions, setQuestions] = useState([]);
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [score, setScore] = useState(0);
    const [gameOver, setGameOver] = useState(false);

    useEffect(() => {
        console.log("useEffect in Game component");
        const fetchQuestions = async () => {
            try {
                const res = await axios.get('/api/questions');
                console.log("Questions fetched:", res.data);
                setQuestions(res.data);
            } catch (error) {
                console.error("Error fetching questions:", error);
            }
        };
        fetchQuestions();
    }, []);

    console.log("Current state of questions:", questions);

    const handleAnswer = (isCorrect) => {
        if (isCorrect) setScore(score + 1);
        const next = currentQuestion + 1;
        if (next < questions.length) {
            setCurrentQuestion(next);
        } else {
            setGameOver(true);
        }
    };

    return (
        <div className="game">
            <h1>PolyTick-O Trivia</h1>
            {questions.length > 0 && !gameOver ? (
                <Question
                    question={questions[currentQuestion]}
                    onAnswer={handleAnswer}
                />
            ) : gameOver ? (
                <Score score={score} total={questions.length} />
            ) : (
                <p>No questions available. Please add some questions to the database.</p>
            )}
        </div>
    );
};

export default Game;
