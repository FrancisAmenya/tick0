
import React from 'react';

const Question = ({ question, onAnswer }) => {
    return (
        <div className="question">
            <h2>{question.text}</h2>
            <div className="options">
                {question.options.map((option, index) => (
                    <button
                        key={index}
                        onClick={() => onAnswer(option === question.correctAnswer)}
                    >
                        {option}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default Question;
