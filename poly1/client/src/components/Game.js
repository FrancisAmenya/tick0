import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Layout from './Layout';
import Button from './Button';
import './Game.css';

const Game = () => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);

  useEffect(() => {
    const fetchQuestions = async () => {
      const res = await axios.get('/api/questions');
      setQuestions(res.data);
    };
    fetchQuestions();
  }, []);

  const handleAnswerClick = (isCorrect) => {
    if (isCorrect) setScore(score + 1);

    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < questions.length) {
      setCurrentQuestion(nextQuestion);
    } else {
      setShowScore(true);
    }
  };

  return (
    <Layout>
      <div className="game-container">
        {showScore ? (
          <div className="score-section">
            You scored {score} out of {questions.length}
          </div>
        ) : (
          <>
            <div className="question-section">
              <div className="question-count">
                <span>Question {currentQuestion + 1}</span>/{questions.length}
              </div>
              <div className="question-text">{questions[currentQuestion]?.text}</div>
            </div>
            <div className="answer-section">
              {questions[currentQuestion]?.options.map((option, index) => (
                <Button key={index} onClick={() => handleAnswerClick(option === questions[currentQuestion].correctAnswer)}>
                  {option}
                </Button>
              ))}
            </div>
          </>
        )}
      </div>
    </Layout>
  );
};

export default Game;
