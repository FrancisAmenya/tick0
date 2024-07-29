import React from 'react';

const Score = ({ score, total }) => {
    return (
        <div className="score">
            <h2>Game Over</h2>
            <p>Your score: {score} out of {total}</p>
        </div>
    );
};

export default Score;
