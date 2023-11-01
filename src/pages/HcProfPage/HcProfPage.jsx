import React, { useEffect, useState } from 'react';
import { fetchAllUsers } from '../../utilities/users-service';

import { Link } from 'react-router-dom';


export default function HcProfPage() {
  const [userRecords, setUserRecords] = useState([]);

  // for search bar
  const [query, setQuery] = useState("");
  const [searchUsers, setSearchUsers] = useState([])


  const updateQuery = (event) => {
    setQuery(event.target.value)
    console.log(query)
  }

  // list of all users with role: 'users'
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

  // search bar to find specific
  useEffect(() => {
    const fetchSearch = async () => {
    // so it doesnt search on empty or 1-2 letters
    if (query.length > 2) {
        const allUserRecords = await fetchAllUsers() 
        console.log(allUserRecords)

        const first5Users = allUserRecords.slice(0, 5);
        setSearchUsers(first5Users)
      } else {
        setSearchUsers([])
      }
    }
    fetchSearch()
  }, [query])

  return (
    <>
    <h1>User's List</h1>
      <ul>
        {userRecords.map((user) => (
          <li key={user._id}>
          <Link to={`/search/${user._id}`}>
          {user.name}
          </Link>
          </li>
        ))}
      </ul>
      <br></br>
      <h1>Search Bar</h1>
      <input 
        type="text"
        placeholder="Search..."
        onChange={(event) => updateQuery(event)}
      />
      {searchUsers.map((user) => (
        <div key={user._id}>
          <Link to={`/search/${user._id}`}>
          {user.name}
          </Link>
        </div>
      ))}
    </>
  )
}
