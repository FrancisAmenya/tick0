import React from 'react';
import { auth, googleProvider } from '../firebase/firebase'; // Import auth and provider
import { signInWithPopup } from 'firebase/auth'; // Import signInWithPopup
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const GoogleLogin = () => {
  const navigate = useNavigate();

  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      // You can also get user info like this
      const user = result.user;
      console.log('User Info:', user);
      navigate('/'); // Redirect to homepage after login
    } catch (error) {
      console.error("Error during Google sign in:", error);
      alert(error.message);
    }
  };

  return (
    <button onClick={handleGoogleSignIn}>
      Sign In with Google
    </button>
  );
};

export default GoogleLogin;