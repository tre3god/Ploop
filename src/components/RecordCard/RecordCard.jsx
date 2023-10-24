import React from 'react'
import { format } from "date-fns";


export default function RecordCard({ allRecords }) {
    function formatDate(dateString) {
    const date = new Date(dateString);
  
    // format date as how i want
    const formattedDate = format(date, "dd MMMM, yyyy hh:mm a"); 

    return formattedDate;
  }

  return (
    <>
    <div>RecordCard</div>
    <br></br>
    {allRecords?.map((record, index) => (
        <ul key={index}>
          <li>{formatDate(record.createdAt) } <br></br>{record._id} <br></br><button>Edit</button> <button>Delete</button></li>
          <br></br>
        </ul>
      ))}
      </>
  )
}
