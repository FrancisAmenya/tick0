import React from 'react';
import { Link } from 'react-router-dom';
//import './LandingPage.css'; // We'll create this CSS file next
import '../styles.css';
import coverImage from './cover.jpg'; // Import the image

const LandingPage = () => {
  return (
    <div className="landing-page" style={{backgroundImage: `url(${coverImage})`}}>
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
          <h1>William Ruto Trivia</h1>
          <p>Test your knowledge about Kenya's President</p>
          <Link to="/game" className="cta-button">Start Game</Link>
        </div>
      </main>
    </div>
  );
};

export default LandingPage;
