import React from 'react'
import { format } from "date-fns";
import * as userService from "../../utilities/users-service"
import * as recordsService from "../../utilities/records-service"


export default function RecordCard({ allRecords, setAllRecords, user, setUser }) {
    function formatDate(dateString) {
    const date = new Date(dateString);
  
    // format date as how i want
    const formattedDate = format(date, "dd MMMM, yyyy hh:mm a"); 

    return formattedDate;
  }

  const handleDelete = async (event) => {
    const userId = user._id
    const recordId = event.currentTarget.getAttribute("recordId");
    console.log(`clicked delete for ${recordId} and this user ${userId}`)

    try {
        // delete recordId from user model (done)
        const updatedUser = await userService.deleteRecord(recordId, userId);
        // console.log(updatedUser)
        setUser(updatedUser.user)

        // delete record from record model (successfully deleted from record model)
        const updatedRecords = await recordsService.deleteRecord(recordId);
        // console.log("updated" + JSON.stringify(updatedRecords))
    } catch (error) {
        console.log(error)
    }
  }

  const handleEdit = async (event) => {
    const recordId = event.currentTarget.getAttribute("recordId");
    console.log(`clicked edit for this recordId ${recordId}`)
  }

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
            <button
              onClick={handleEdit}
              recordId={record._id} >
                Edit
            </button> 
            <button
              onClick={handleDelete}
              recordId={record._id} >
                Delete
            </button>
          </li>
          <br></br>
        </ul>
      ))}
      </>
  )
}
