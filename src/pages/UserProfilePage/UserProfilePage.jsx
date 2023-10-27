import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function UserProfilePage({ user, updateUser}) {
  const navigate = useNavigate();
  console.log(user)
  

  return (
    <>
    <div>UserProfilePage</div>
    <h1>Name: {user.name}</h1>
    <br></br>
    </>
  )
}
