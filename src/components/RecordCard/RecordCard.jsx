import React from 'react'
import { format } from "date-fns";
import * as userService from "../../utilities/users-service"


export default function RecordCard({ allRecords, setAllRecords, user }) {
    function formatDate(dateString) {
    const date = new Date(dateString);
  
    // format date as how i want
    const formattedDate = format(date, "dd MMMM, yyyy hh:mm a"); 

    return formattedDate;
  }

//   const handleDelete = async (event) => {
//     const userId = user._id
//     const recordId = event.currentTarget.getAttribute("recordId");
//     console.log(`clicked delete for ${recordId}`)

//     try {
//         const updatedRecords = await userService.deleteRecord(recordId, userId);
//         setAllRecords(updatedRecords)
//     } catch (error) {
//         console.log(error)
//     }
//   }

  return (
    <>
    <div>RecordCard</div>
    <br></br>
    {allRecords?.map((record, index) => (
        <ul key={index}>
          <li>{formatDate(record.createdAt) } 
          <br></br>
          {record._id} 
          <br></br>
          {record.duration}
          <br></br>
          Blood: {record.blood}
          <br></br>
          <button>Edit</button> 
          <button>
        
        {/*
        onClick={handleDelete}
        recordId={record._id} 
        */}
        
            Delete
          </button>
          </li>
          <br></br>
        </ul>
      ))}
      </>
  )
}
