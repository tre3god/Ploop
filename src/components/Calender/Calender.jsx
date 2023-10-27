import React from 'react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import Paper from '@mui/material/Paper';


export default function Calender({ user }) {
    console.log(user)
    

    // things to do
    // fetch records match on date string and display on calender
    // need to find out how to click date and display that date's records

    return (
      <>
      <Paper style={{
        width: "600px", 
        height: "510px", 
      }}>
      <div style={{position: "relative", zIndex: 0}}>
      <FullCalendar
        plugins={[ dayGridPlugin ]}
        initialView="dayGridMonth"
      />
      </div>
      </Paper>
      </>
    )
  }
