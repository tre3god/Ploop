import React from 'react';
import { Button } from '@mui/material';

export default function SortButton({ sortAscending, setSortAscending, allRecords, setAllRecords }) {
  const handleSortToggle = () => {
    handleSortByDate();
  }

  const handleSortByDate = () => {
    const sortedRecords = [...allRecords];

    if (sortAscending) {
      sortedRecords.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
    } else {
      sortedRecords.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    }

    setAllRecords(sortedRecords);
    setSortAscending(!sortAscending);
  };

  return (
    <>
    <div>Sort By</div>
    <Button 
    onClick={handleSortToggle}
    variant="outlined"
    
    >
      {sortAscending ? 'Earliest Date First' : 'Latest Date First'}
    </Button>
    </>
  );
}
