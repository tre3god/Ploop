import React, { useEffect, useState } from 'react';
import { fetchAllUsers } from '../../utilities/users-service';
import { Link } from 'react-router-dom';
import { Container, Typography, TextField, List, ListItem } from '@mui/material';

export default function HcProfPage() {
  const [userRecords, setUserRecords] = useState([]);
  const [query, setQuery] = useState("");
  const [searchUsers, setSearchUsers] = useState([]);

  const updateQuery = (event) => {
    setQuery(event.target.value);
  }

  useEffect(() => {
    async function fetchUsers() {
      try {
        const allUserRecords = await fetchAllUsers();
        setUserRecords(allUserRecords);
      } catch (error) {
        console.error('Error:', error);
      }
    }
    fetchUsers();
  }, []);

  useEffect(() => {
    const fetchSearch = async () => {
      if (query.length > 2) {
        const allUserRecords = await fetchAllUsers();
        const first5Users = allUserRecords.slice(0, 5);
        setSearchUsers(first5Users);
      } else {
        setSearchUsers([]);
      }
    }
    fetchSearch();
  }, [query]);

  return (
    <Container >
      <Typography variant="h4" gutterBottom>
        User's Name List
      </Typography>
      <List>
        {userRecords.map((user, index) => (
          <ListItem key={user._id}>
            <Link to={`/search/${user._id}`}>
              {index+1}. {user.name}
            </Link>
          </ListItem>
        ))}
      </List>

      <Typography variant="h4" gutterBottom>
        Search Bar
      </Typography>
      <TextField
        fullWidth
        label="Search..."
        placeholder="Search..."
        variant="outlined"
        value={query}
        onChange={(event) => updateQuery(event)}
      />
      <List>
        {searchUsers.map((user) => (
          <ListItem key={user._id}>
            <Link to={`/search/${user._id}`}>
              {user.name}
            </Link>
          </ListItem>
        ))}
      </List>
    </Container>
  );
}
