import React, { useState, useEffect } from 'react'
import { getRecords } from '../../utilities/records-service';
import RecordCard from '../../components/RecordCard/RecordCard';
import LineChart from '../../components/RecordHistoryCharts/LineChart';



export default function RecordHistoryPage({ user }) {
  const [allRecords, setAllRecords] = useState([]);
  // console.log(user)

  useEffect(() => {
    async function fetchRecords() {
      try {
        const userRecords = await getRecords(user._id)
        setAllRecords(userRecords)
      } catch (error) {
        console.log("Error fetching user records", error);

      }
    }
    fetchRecords();
  }, [user]);

  console.log(allRecords)

  return (
  <>
  <div> Record History</div>
  <br></br>
  <LineChart allRecords={allRecords} />
  <RecordCard allRecords={allRecords} />
  
  </>
  )
}
