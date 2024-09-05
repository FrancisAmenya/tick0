import React from 'react';
import { Link } from 'react-router-dom';

const About = () => {
  return (
  <div className="container">
    <header>
      <h1>About William Ruto Trivia</h1><nav>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/game">Game</Link></li>
          </ul>
        </nav>
    </header>
    <main>
    <div className="content">
      <h1>About William Ruto Trivia</h1>
      <p>William Ruto, the President of Kenya.</p>
      <Link to="/">Back to Home</Link>
    </div>
      </main>
    </div>
  );
};

export default About;
