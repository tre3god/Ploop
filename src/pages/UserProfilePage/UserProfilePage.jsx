import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function UserProfilePage({ user, updateUser}) {
  const navigate = useNavigate();
  console.log(user)
  
  const handleAddRecord = () => {
    navigate("/user/addrecord")
  }
  
  const handlePastRecord = () => {
    navigate("/user/recordhistory")
  }

  return (
    <>
    <div>UserProfilePage</div>
    <h1>Name: {user.name}</h1>
    <h1>GRAPH</h1>
    <button onClick={handleAddRecord}>Add Record</button>
    <br></br>
    <button onClick={handlePastRecord}>Past Records</button>
    </>
  )
}
