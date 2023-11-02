import React, { useState, useEffect } from 'react';
import { getRecords } from '../../utilities/records-service';
import RecordCard from '../../components/RecordCard/RecordCard';
import LineChart from '../../components/RecordHistoryCharts/LineChart';
import { Container, Typography, Box } from '@mui/material';

export default function AnalysisPage({ user, setUser }) {
  const [allRecords, setAllRecords] = useState([]);

  useEffect(() => {
    async function fetchRecords() {
      try {
        const userRecords = await getRecords();
        setAllRecords(userRecords);
      } catch (error) {
        console.log("Error fetching user records", error);
      }
    }
    fetchRecords();
  }, [user]);

  return (
    
    <Container maxWidth="lg">
      <Box mt={4}>
        <Typography variant="h4" gutterBottom>
          Analysis Page
        </Typography>
      </Box>

      <Box mb={4}>
        <LineChart allRecords={allRecords} setAllRecords={setAllRecords} />
      </Box>

      <RecordCard allRecords={allRecords} setAllRecords={setAllRecords} user={user} setUser={setUser} />
    </Container>
  );
}
