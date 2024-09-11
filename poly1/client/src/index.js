import React from 'react';
import ReactDOM from 'react-dom';
//import './index.css';
//import './global.css';  // Add this line
import './styles.css';
//import './components/LandingPage.css';
import './components/LandingPage.jsx';
import coverImage from './components/cover.jpg'; // Adjust the path as needed
import App from './App.jsx';
import { AuthProvider } from './context/AuthContext';  // Import AuthProvider

console.log("index.js is running");

ReactDOM.render(
    <React.StrictMode>
        <div className="background-container">
            {/* Cover Image */}
             <AuthProvider>  {/* Wrap App with AuthProvider */}
                <App />
            </AuthProvider>
         </div>
    </React.StrictMode>,
    document.getElementById('root')
);
