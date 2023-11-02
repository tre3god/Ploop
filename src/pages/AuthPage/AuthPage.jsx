import React, { useState } from 'react';
import { Button, Typography, Container, Paper } from '@mui/material';
import authPageStyles from './AuthPageStyles'; 
import LoginPage from './LoginPage';
import SignUpPage from "./SignUpPage";


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
    <Container maxWidth="xs" style={authPageStyles.container}>
      <Paper elevation={3} sx={{ padding: '1rem', textAlign: 'center' }}>
        <Typography variant="h4" style={authPageStyles.header}>
          Ploop!
        </Typography>
        <img
          src="https://img.freepik.com/premium-vector/cartoon-cute-angry-poop-sitting-down-pose-with-fly-flying-around-character-vector-illustration_438266-683.jpg?w=740"
          style={authPageStyles.image}
        />
        <div style={authPageStyles.buttonGroup}>
          <Button variant="contained" color="primary" onClick={handleShowLogin}>
            Log In
          </Button>
          <Button variant="contained" color="secondary" onClick={handleShowSignup}>
            Sign Up
          </Button>
        </div>
        {showLogin && <LoginPage setUser={setUser} />}
        {showSignup && <SignUpPage setUser={setUser} />}
      </Paper>
    </Container>
  );
}