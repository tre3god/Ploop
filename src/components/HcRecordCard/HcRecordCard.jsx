import { format } from 'date-fns';
import React from 'react'

export default function HcRecordCard() {

    function formatDate(dateString) {
        const date = new Date(dateString);
      
        // format date as how i want
        const formattedDate = format(date, "dd MMMM, yyyy hh:mm a"); 
    
        return formattedDate;
      }

  return (
    <div>HcRecordCard</div>
    // {oneUserRecords && oneUserRecords.length > 0 ? (
    //     oneUserRecords.map((record, index) => (
    //     <Paper
    //     key={index}
    //     elevation={3}
    //     style={{ padding: 16, marginBottom: 16, width: 350 }}
    //   >
    //     <div>
    //       <strong>Date:</strong> {formatDate(record.createdAt)}
    //     </div>
    //     <div>
    //       <strong>Record Log:</strong> {record._id}
    //     </div>
    //     <div>
    //       <strong>Duration:</strong> {record.duration}
    //     </div>
    //     <div>
    //       <strong>Blood:</strong> {record.blood}
    //     </div>
    //     <div>
    //       <strong>Urgent:</strong> {record.urgent}
    //     </div>
    //     <div>
    //       <strong>Pain:</strong> {record.pain}
    //     </div>
    //     <div>
    //       <strong>Type:</strong> {record.type}
    //     </div>
    //     <div>
    //       <strong>Size:</strong> {record.size}
    //     </div>
    //     <div>
    //       <strong>Color:</strong> {record.color}
    //     </div>
    //   </Paper>
    //     ))
    //     ) : (
    //   <div>No records available for this user.</div>
    //   )}
  )
}
