import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import './global.css';  // Add this line
import App from './App.jsx';
import { AuthProvider } from './context/AuthContext';  // Import AuthProvider

console.log("index.js is running");

ReactDOM.render(
    <React.StrictMode>
        <AuthProvider>  {/* Wrap App with AuthProvider */}
            <App />
        </AuthProvider>
    </React.StrictMode>,
    document.getElementById('root')
);