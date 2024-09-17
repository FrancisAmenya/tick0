import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Question from './Question.jsx';
import Score from './Score.jsx';

import { useAuth } from '../context/AuthContext';
import { db } from '../firebase/firebase';
import { doc, setDoc, collection, getDocs, getDoc } from "firebase/firestore";
import { Link } from 'react-router-dom';

const Game = () => {
    const { user } = useAuth();
    const [questions, setQuestions] = useState([]);
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [score, setScore] = useState(0);

    const [gameOver, setGameOver] = useState(false);
    const [highScore, setHighScore] = useState(0);
    const [leaderboardPosition, setLeaderboardPosition] = useState(null);
    const [loading, setLoading] = useState(false);

    const [timeRemaining, setTimeRemaining] = useState(0);
    const [gameMode, setGameMode] = useState('');
    const [countdown, setCountdown] = useState(3);
    const [isCountdownActive, setIsCountdownActive] = useState(false);

    const [gameStarted, setGameStarted] = useState(false);
    const [topTenUsers, setTopTenUsers] = useState([]);

    useEffect(() => {
        if (isCountdownActive) {
            const timer = setInterval(() => {
                setCountdown(prev => {
                    if (prev > 1) return prev - 1;
                    clearInterval(timer);
                    startGameAfterCountdown();
                    return 0;
                });
            }, 1000);
            return () => clearInterval(timer);
        }
    }, [isCountdownActive]);

    useEffect(() => {
        let timer;
        if (timeRemaining > 0 && gameStarted && gameMode !== 'timeless') {
            timer = setInterval(() => {
                setTimeRemaining(prev => prev - 1);
            }, 1000);
        } else if (timeRemaining === 0 && gameStarted && gameMode !== 'timeless') {
            handleTimeOut();
        }
        return () => clearInterval(timer);
    }, [timeRemaining, gameStarted, gameMode]);

    const startGame = (mode) => {
        setGameMode(mode);
        setIsCountdownActive(true);
        setCountdown(3);
        fetchHighScore();
    };

    const startGameAfterCountdown = async () => {
        setIsCountdownActive(false);
        setLoading(true);
        try {
            const res = await axios.get('/api/questions');
            setQuestions(res.data);
            setCurrentQuestion(0);
            setScore(0);
            setGameOver(false);
            initializeTimer(gameMode);
            setGameStarted(true);
        } catch (error) {
            console.error("Error fetching questions:", error);
        } finally {
            setLoading(false);
        }
    };

    const initializeTimer = (mode) => {
        switch (mode) {
            case 'easy':
                setTimeRemaining(10);
                break;
            case 'medium':
                setTimeRemaining(5);
                break;
            case 'pro-max':
                setTimeRemaining(3);
                break;
            case 'timeless':
                setTimeRemaining(Infinity);
                break;
            default:
                setTimeRemaining(0);
        }
    };

    const handleTimeOut = () => {
        setGameOver(true);
        submitScore();
    };

    const handleAnswer = (isCorrect) => {
        if (isCorrect) setScore(score + 1);
        const next = currentQuestion + 1;

        if (next < questions.length) {
            setCurrentQuestion(next);
            initializeTimer(gameMode);
        } else {
            setGameOver(true);
            submitScore();
        }
    };

    
    const submitScore = async () => {
        if (!user) return; // Ensure user is authenticated
        const userId = user.uid; // Use Firebase Auth user ID
        try {
            await setDoc(doc(db, 'leaderboard', userId), {
                score,
                gameMode,
            });
            fetchHighScoreAndPosition(userId);
            console.log("Score submitted successfully!");
        } catch (error) {
            console.error("Error submitting score:", error);
        }
    };

    const fetchHighScore = async () => {
        if (!user) return; // Ensure user is authenticated
        const userId = user.uid;
        try {
            const docRef = doc(db, 'leaderboard', userId);
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
                setHighScore(docSnap.data().score);
            } else {
                setHighScore(0);
            }
        } catch (error) {
            console.error("Error fetching high score:", error);
        }
    };

    const fetchHighScoreAndPosition = async (userId) => {
        try {
            const scoresCollection = collection(db, 'leaderboard');
            const scoresSnapshot = await getDocs(scoresCollection);
            const scoresList = scoresSnapshot.docs
                .map(doc => ({ id: doc.id, ...doc.data() }))
                .filter(score => score.gameMode === gameMode); // Filter by game mode

            const topScores = scoresList.sort((a, b) => b.score - a.score).slice(0, 10);
            const userScore = topScores.find(entry => entry.id === userId)?.score || 0;
            const position = topScores.findIndex(entry => entry.id === userId) + 1;

            setHighScore(userScore);
            setLeaderboardPosition(position);
            setTopTenUsers(topScores);
        } catch (error) {
            console.error("Error fetching high scores:", error);
        }
    };

    // Debugging: Log current question and questions array
    console.log("Current Question Index:", currentQuestion);
    console.log("Questions Array:", questions);

    const renderTopTenTable = () => (
        <table className="top-ten-table">
            <thead>
                <tr>
                    <th>Rank</th>
                    <th>User ID</th>
                    <th>Score</th>
                </tr>
            </thead>
            <tbody>
                {topTenUsers.map((user, index) => (
                    <tr key={user.id}>
                        <td>{index + 1}</td>
                        <td>{user.id.substring(0, 8)}...</td>
                        <td>{user.score}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );

    
    return (
        <div className="game">


            <nav>
              <ul>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/about">About</Link></li>
              </ul>
            </nav>


            <header style={{ display: 'flex', justifyContent: 'space-between', padding: '10px' }}>
                <h2>{user ? user.displayName : 'Guest'}</h2>
                <div>
                    <span>Score: {score}</span>
                    <span> | Time Left: {timeRemaining === Infinity ? 'No timer' : `${timeRemaining}s`}</span>
                </div>
            </header>

            {!gameMode ? (
                <div>
                    <h2>Select Game Mode:</h2>
                    <button onClick={() => startGame('timeless')}>Timeless</button>
                    <button onClick={() => startGame('easy')}>Easy (10s)</button>
                    <button onClick={() => startGame('medium')}>Medium (5s)</button>
                    <button onClick={() => startGame('pro-max')}>Pro Max (3s)</button>
                </div>
            ) : isCountdownActive ? (
                <h2>Starting {gameMode} mode in {countdown}...</h2>
            ) : loading ? (
                <p>Loading questions...</p>
            ) : gameStarted && !gameOver && questions.length > 0 ? (
                <div>
                    <Question
                        question={questions[currentQuestion]}
                        onAnswer={handleAnswer}
                    />
                    <p>Current Score: {score}</p>
                    <p>High Score: {highScore}</p>
                    <p>Time Remaining: {timeRemaining === Infinity ? 'No timer' : `${timeRemaining}s`}</p>
                </div>
            ) : gameOver ? (
                <div>
                    <Score score={score} total={questions.length} />
                    <h2>Your Score: {score}</h2>
                    <h2>High Score: {highScore}</h2>
                    <h2>Your Position: {leaderboardPosition || 'N/A'}</h2>
                    <h3>Top 10 Leaderboard</h3>
                    {renderTopTenTable()}
                </div>
            ) : (
                <p>No questions available. Please try again later.</p>
            )}
        </div>
    );
};

export default Game;
