import React from "react";
import Chart from "chart.js/auto";
import { Line } from "react-chartjs-2";
import { format } from "date-fns";
import Paper from '@mui/material/Paper';




export default function LineChart({ allRecords }) {
  // prep data for line chart
  const prepareChartData = (allRecords) => {
    // group records by day and count
    const recordsByDay = allRecords.reduce((acc, record) => {
      const createdAt = new Date(record.createdAt);
      const day = new Date(createdAt.getFullYear(), createdAt.getMonth(), createdAt.getDate());

     // format date using datefns 
     const formattedDate = format(day, "dd MMMM, yyyy");

     // if same date, increase count
     if (acc[formattedDate]) {
       acc[formattedDate]++;

     // if new date, start count from 1
     } else {
       acc[formattedDate] = 1;
     }
     return acc;
   }, {});

    // extract labels (dates) 
    const labels = Object.keys(recordsByDay);
    // console.log(labels)

    // extract data (poop counts)
    const data = labels.map((label) => recordsByDay[label]);
    console.log(data)

    return {
      labels,
      datasets: [
        {
          label: 'Daily Poop Count',
          backgroundColor: 'rgb(255, 99, 132)',
          borderColor: 'rgb(255, 99, 132)',
          data,
        },
      ],
    };
  };
  const chartData = prepareChartData(allRecords);



  return (
    <Paper
      style={{
        width: "400px", 
        height: "300px", 
      }}
    >
      <Line data={chartData} />
    </Paper>
  );
}
