import React from 'react';
import { Link } from 'react-router-dom';
import '../styles.css';

const LandingPage = () => {
  return (
    <div className="game">
      <header>
        <nav>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/game">Game</Link></li>
            <li><Link to="/about">About</Link></li>
          </ul>
        </nav>
      </header>
      <main>
        <div className="content">
          <h1>PolyTick0 Trivia</h1>
          <p>Do you really know your President?</p>
          <Link to="/game" className="cta-button">Start Game</Link>
        </div>
      </main>
    </div>
  );
};

export default LandingPage;
