import React from 'react';
import { Link } from 'react-router-dom';
import './Layout.css';

const Layout = ({ children }) => (
  <div className="layout">
    <header>
      <nav>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/game">Game</Link></li>
          <li><Link to="/about">About</Link></li>
        </ul>
      </nav>
    </header>
    <main>{children}</main>
    <footer>
      <p>&copy; 2023 William Ruto Trivia. All rights reserved.</p>
    </footer>
  </div>
);

export default Layout;
