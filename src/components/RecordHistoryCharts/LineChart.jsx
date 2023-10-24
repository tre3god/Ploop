import React from "react";
import Chart from "chart.js/auto";
import { Line } from "react-chartjs-2";



export default function LineChart({ allRecords }) {
  // Function to prepare data for LineChart
  const prepareChartData = (records) => {
    // Group records by day and count them
    const recordsByDay = records.reduce((acc, record) => {
      const createdAt = new Date(record.createdAt);
      const day = new Date(createdAt.getFullYear(), createdAt.getMonth(), createdAt.getDate()).toISOString();
      if (acc[day]) {
        acc[day]++;
      } else {
        acc[day] = 1;
      }
      return acc;
    }, {});

    // Extract labels (dates) and data (record counts)
    const labels = Object.keys(recordsByDay);
    const data = labels.map((label) => recordsByDay[label]);

    return {
      labels,
      datasets: [
        {
          label: 'Daily Record Count',
          backgroundColor: 'rgb(255, 99, 132)',
          borderColor: 'rgb(255, 99, 132)',
          data,
        },
      ],
    };
  };
  const chartData = prepareChartData(allRecords);


  return (
    <div>
      <Line data={chartData} />
    </div>
  );
}

