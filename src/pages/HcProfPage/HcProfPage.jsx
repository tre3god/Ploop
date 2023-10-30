import React, { useEffect, useState } from 'react'
import { fetchAllUsers } from '../../utilities/users-service'

export default function HcProfPage({ user, updateUser}) {
  const [userRecords, setUserRecords] = useState([]);

  useEffect(() => {
    async function fetchUsers () {
      try { 
        const allUserRecords = await fetchAllUsers()
        setUserRecords(allUserRecords)
      } catch (error) {
        console.error('Error:', error);
      }
    }
    fetchUsers();
  }, [])

  return (
    <>
    <h1>User's List</h1>
      <ul>
        {userRecords.map((user) => (
          <li key={user._id}>{user.name}</li>
        ))}
      </ul>
    </>
  )
}
