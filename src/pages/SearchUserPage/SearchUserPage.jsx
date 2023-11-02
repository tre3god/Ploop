import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchOneUser } from '../../utilities/users-service';
import { hcGetRecords } from '../../utilities/records-service';
import HcRecordCard from '../../components/HcRecordCard/HcRecordCard';
import { Container, Typography, CircularProgress } from '@mui/material';

export default function SearchUserPage({ queryUser, setQueryUser }) {
  const [oneUserRecords, setOneUserRecords] = useState([]);
  const { userId } = useParams();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchUser() {
      try {
        const userRecord = await fetchOneUser(userId);
        setQueryUser(userRecord);
        setIsLoading(false);
      } catch (error) {
        console.log("Error fetching user records", error);
      }
    }
    fetchUser();
  }, [userId]);

  useEffect(() => {
    async function fetchRecords() {
      try {
        const userRecords = await hcGetRecords(userId);
        setOneUserRecords(userRecords);
      } catch (error) {
        console.log("Error fetching user records", error);
      }
    }
    fetchRecords();
  }, [userId]);

  return (
    <Container maxWidth="lg">
      {isLoading ? (
        <CircularProgress />
      ) : (
        <>
          <Typography variant="h4" gutterBottom>
            User: {queryUser[0].name}'s details and records
          </Typography>
          <Typography variant="body1" gutterBottom>
            Email: {queryUser[0].email}
          </Typography>
          <br />

          <HcRecordCard oneUserRecords={oneUserRecords} />
        </>
      )}
    </Container>
  );
}



