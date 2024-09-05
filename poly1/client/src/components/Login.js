import React, { useState } from 'react';
import { auth } from '../firebase/firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import GoogleLogin from './GoogleLogin'; // Import GoogleLogin

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); // Instantiate navigate

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      const user = auth.currentUser;
      const token = await user.getIdToken();
      
      // Example of making a protected request
      const response = await axios.get('/protected-route', {
        headers: { Authorization: token },
      });
      console.log(response.data);

      navigate('/'); // Redirect to homepage after login
    } catch (error) {
      alert(error.message);
    }
  };

  return (   
    <div className="container">
      <header>
        <h1>Login</h1>
      </header>
      <main>
        <div className="content">
      <form onSubmit={handleLogin}>
        <input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} required />
        <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} required />
        <button type="submit" className="button">Log In</button>
      </form>
      <GoogleLogin /> {/* Include Google login button */}
    </div>
      </main>
    </div>
  );
};

export default Login;