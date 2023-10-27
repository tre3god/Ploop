import React, { useState } from 'react';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { StaticDatePicker } from '@mui/x-date-pickers/StaticDatePicker';
import { PickersDay } from '@mui/x-date-pickers/PickersDay';
import CheckIcon from '@mui/icons-material/Check';
import Badge from '@mui/material/Badge';
import TextField from '@mui/material/TextField';

// reference: https://www.youtube.com/watch?v=BN_wfeG47oQ&t=748s

export default function Calender() {
  const [date, setDate] = useState(new Date());
  const [highlightedDays, setHighlightedDays] = useState([1, 2, 13]);

  const handleDateChange = (date) => {
    console.log('Selected Date:', date.toISOString());
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <StaticDatePicker
        orientation="portrait"
        onChange={handleDateChange}
        disableFuture
        
 
      />
    </LocalizationProvider>
  );
}
