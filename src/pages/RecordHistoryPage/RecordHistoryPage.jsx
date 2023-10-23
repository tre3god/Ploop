import React, { useState, useEffect } from 'react'
import { getRecords } from '../../utilities/records-service';


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
  
  {allRecords?.map((record, index) => (
    <ul key={index}>
      <li>{record.createdAt} {record._id} <button>Edit</button> <button>Delete</button></li>
    </ul>
  ))}
  </>
  )
}
