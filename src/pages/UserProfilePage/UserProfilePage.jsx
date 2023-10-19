import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function UserProfilePage() {
  const navigate = useNavigate();
  
  const handleAddRecord = () => {
    navigate("/addrecord")
  }

  return (
    <>
    <div>UserProfilePage</div>
    <h1>GRAPH</h1>
    <button onClick={handleAddRecord}>Add Record</button>
    </>
  )
}
