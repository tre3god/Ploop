import React, { useState, useEffect } from 'react'
import { getRecords } from '../../utilities/records-service';
import { format } from "date-fns";



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

  function formatDate(dateString) {
    const date = new Date(dateString);
  
    // format date as how i want
    const formattedDate = format(date, "dd MMMM, yyyy hh:mm a"); 

    return formattedDate;
  }


  return (
  <>
  <div> Record History</div>
  
  {allRecords?.map((record, index) => (
    <ul key={index}>
      <li>{formatDate(record.createdAt) } <br></br>{record._id} <br></br><button>Edit</button> <button>Delete</button></li>
      <br></br>
    </ul>
  ))}
  </>
  )
}
