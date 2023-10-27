import React, { useState } from 'react';
import { Button } from '@mui/material';
import LoginPage from './LoginPage';
import SignUpPage from './SignupPage';

export default function AuthPage({ setUser }) {
  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);

  const handleShowLogin = () => {
    setShowLogin(true);
    setShowSignup(false);
  };

  const handleShowSignup = () => {
    setShowLogin(false);
    setShowSignup(true);
  };

  return (
    <>
      <h1 className="text-3xl font-bold underline">User AuthPage</h1>
      <div>
        <Button onClick={handleShowLogin}>Log In</Button>
        <Button onClick={handleShowSignup}>Sign Up</Button>
      </div>
      {showLogin && <LoginPage setUser={setUser} />}
      {showSignup && <SignUpPage setUser={setUser} />}
    </>
  );
}
