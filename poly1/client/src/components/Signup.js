import React, { useState } from 'react';
import { auth } from '../firebase/firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import GoogleLogin from './GoogleLogin'; // Import GoogleLogin
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import '../global.css';  // Add this line

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate(); // Instantiate navigate

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      alert('Signup successful!'); // Consider using a better feedback mechanism
      navigate('/login'); // Redirect to login after signup
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="container">
      <header>
        <h1>Sign Up</h1>
      </header>
    <main>
    <div className="content">
      <form onSubmit={handleSignup}>
        <input
         type="email"
         placeholder="Email"
         value={email}
         onChange={(e) => setEmail(e.target.value)}
         required
        />
        <input
         type="password"
         placeholder="Password"
         value={password}
         onChange={(e) => setPassword(e.target.value)}
         required
           />
          <button type="submit" className="button">Sign Up</button>
          </form>
          <GoogleLogin /> {/* Include Google login button */}
        </div>
      </main>
    </div>
  );
};

export default Signup;