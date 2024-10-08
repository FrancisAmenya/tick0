import { Link } from 'react-router-dom';
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';

import Game from './components/Game';
import About from './components/About';
import Login from './components/Login';  // Import your Login component
import Signup from './components/Signup';  // Import Signup component

import Notification from './components/Notification'; // Import Notification
import { useAuth } from './context/AuthContext';  // Import useAuth to access authentication state
import LandingPage from './components/LandingPage';


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
            <main className="App">
                {notification && (
                    <Notification message={notification.message} type={notification.type} />
                )}
                    <Routes>
                        <Route path="/" element={user ? <LandingPage /> : <Navigate to="/login" />} />
                        <Route path="/game" element={user ? <Game /> : <Navigate to="/login" />} />
                        <Route path="/about" element={user ? <About /> : <Navigate to="/login" />} />
                        <Route path="/login" element={!user ? <Login /> : <Navigate to="/" />} /> {/* Redirect if logged in */}
                        <Route path="/signup" element={!user ? <Signup /> : <Navigate to="/" />} /> {/* Redirect if logged in */}
                    </Routes>
            </main>
        </Router>
    );
};

export default App;
