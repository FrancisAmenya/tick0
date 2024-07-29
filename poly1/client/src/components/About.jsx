import React from 'react';
import { Link } from 'react-router-dom';

const About = () => {
  return (
    <div className="about">
      <h1>About William Ruto Trivia</h1>
      <p>This trivia game tests your knowledge about William Ruto, the President of Kenya.</p>
      <Link to="/">Back to Home</Link>
    </div>
  );
};

export default About;
