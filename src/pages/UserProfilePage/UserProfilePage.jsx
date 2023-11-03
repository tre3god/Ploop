import { Typography } from '@mui/material';
import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function UserProfilePage({ user }) {
  const navigate = useNavigate();
  console.log(user)
  

  return (
    <>
    <Typography variant='h4' gutterBottom textAlign={'center'}>User Profile Page</Typography>
    <Typography textAlign={'center'}>Name: {user.name}</Typography>
    <br></br>
    </>
  )
}
