import { Link } from 'react-router-dom';
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import Game from './components/Game';
import About from './components/About';
import Login from './components/Login';  // Import your Login component
import Signup from './components/Signup';  // Import Signup component
import Notification from './components/Notification'; // Import Notification
import { useAuth } from './context/AuthContext';  // Import useAuth to access authentication state
//import './index.css';
//import './global.css';
import './styles.css';
//import './components/LandingPage.css';

const App = () => {
    console.log("App component rendered");
    const { user } = useAuth();  // Get user from context
    const [notification, setNotification] = React.useState(null);

    return (
        <Router>
            <header>
                <h1>PolyTick0 Trivia</h1> {/* Add a title for branding */}
	    </header>
            <main className="container">
                {notification && (
                    <Notification message={notification.message} type={notification.type} />
                )}
                <div className={`page-container ${location.pathname === '/' ? 'landing-background' : ''}`}>
                    <Routes>
                        <Route path="/" element={user ? <LandingPage /> : <Navigate to="/signup" />} />
                        <Route path="/game" element={user ? <Game /> : <Navigate to="/signup" />} />
                        <Route path="/about" element={user ? <About /> : <Navigate to="/signup" />} />
                        <Route path="/login" element={!user ? <Login /> : <Navigate to="/" />} /> {/* Redirect if logged in */}
                        <Route path="/signup" element={!user ? <Signup /> : <Navigate to="/" />} /> {/* Redirect if logged in */}
                    </Routes>
                </div>
            </main>
        </Router>
    );
};

export default App;
