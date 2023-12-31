import React, { useState } from 'react';
import { format } from "date-fns";
import {
  Paper,
  Button,
  Typography,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditRecordModal from '../EditRecordModal/EditRecordModal';
import * as recordsService from '../../utilities/records-service/';
import * as userService from '../../utilities/users-service';
import { useNavigate } from 'react-router-dom';
import SortButton from '../SortButton/SortButton';




export default function RecordCard({ allRecords, setAllRecords, user, setUser }) {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editedRecord, setEditedRecord] = useState({});
  const [sortAscending, setSortAscending] = useState(false);

  const navigate = useNavigate();

  const handleEdit = async (event) => {
    const recordId = event.currentTarget.getAttribute("recordId");
    console.log(`clicked edit for this recordId ${recordId}`)

    // find and match record
    const recordToEdit = allRecords.find((record) => record._id === recordId);
    openEditModal(recordToEdit);
  };

  const openEditModal = (recordToEdit) => {
    setIsEditModalOpen(true);
    setEditedRecord(recordToEdit);
  };
  
  const closeEditModal = () => {
    setIsEditModalOpen(false);
    setEditedRecord({});
  };
  
  const handleSaveEdit = async (editedData) => {
    // console.log(editedData)
    const recordId = editedData._id
    const updatedRecord = await recordsService.editRecord(editedData, recordId)
    // console.log(updatedRecord)

    // update state
    setAllRecords((prevRecords) => {
    // find index if id match against prev record id
    const index = prevRecords.findIndex((record) => record._id === recordId);

    if (index !== -1) {
      const newRecords = [...prevRecords];
      // replace edited record at newrecord's index
      newRecords[index] = updatedRecord;
      return newRecords;
    }

    // return prev if new record not found
    return prevRecords;
  });

  closeEditModal();
};

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

  const handleClickComment = (event) => {
    const recordId = event.currentTarget.getAttribute("recordId");
    console.log(`clicked comments for reccordId: ${recordId}`)
    navigate(`/search/${recordId}/comment`)
  }
  
  return (
    <>
      <EditRecordModal
        isOpen={isEditModalOpen}
        onClose={closeEditModal}
        record={editedRecord}
        onSave={handleSaveEdit}
      />
      <Typography variant="h4" gutterBottom>
        Record History
      </Typography>

      <SortButton 
        sortAscending={sortAscending} 
        setSortAscending={setSortAscending} 
        allRecords={allRecords} 
        setAllRecords={setAllRecords}
      />

      {allRecords?.map((record, index) => (
        <Paper
          key={index}
          elevation={4}
          style={{ padding: 16, marginBottom: 16, width: 350 }}
        >
          <div>
            <strong>Date:</strong> {formatDate(record.createdAt)}
          </div>
          <div>
            <strong>Record Log:</strong> {record._id}
          </div>
          <div>
            <strong>Duration:</strong> {record.duration}
          </div>
          <div>
            <strong>Blood:</strong> {record.blood}
          </div>
          <div>
            <strong>Urgent:</strong> {record.urgent}
          </div>
          <div>
            <strong>Pain:</strong> {record.pain}
          </div>
          <div>
            <strong>Type:</strong> {record.type}
          </div>
          <div>
            <strong>Size:</strong> {record.size}
          </div>
          <div>
            <strong>Color:</strong> {record.color}
          </div>
          <Button
            onClick={handleEdit}
            recordId={record._id}
            variant="contained"
            color="primary"
            style={{ marginRight: '5px' }}
          >
            Edit
          </Button>
          <Button
            startIcon={<DeleteIcon />}
            onClick={handleDelete}
            recordId={record._id}
            variant="contained"
            color="error"
            style={{ marginRight: '5px' }}

          >
            Delete
          </Button>
          <Button
            variant="contained"
            color="secondary"
            style={{ marginRight: '5px' }}
            recordId={record._id}
            onClick={handleClickComment}
          >
            Comments
            </Button>
        </Paper>
      ))}
    </>
  );
}