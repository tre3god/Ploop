import React, { useState } from 'react';
import { format } from "date-fns";
import {
  Paper,
  Button,
} from '@mui/material';
import EditRecordModal from '../EditRecordModal/EditRecordModal';
import * as recordsService from '../../utilities/records-service/';
import * as userService from '../../utilities/users-service';


export default function RecordCard({ allRecords, setAllRecords, user, setUser }) {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editedRecord, setEditedRecord] = useState({});

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



  return (
    <>
      <EditRecordModal
        isOpen={isEditModalOpen}
        onClose={closeEditModal}
        record={editedRecord}
        onSave={handleSaveEdit}
      />

      <div>RecordCard</div>
      <br></br>
      {allRecords?.map((record, index) => (
        <Paper
          key={index}
          elevation={3}
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
            style={{ marginRight: '16px' }}
          >
            Edit
          </Button>
          <Button
            onClick={handleDelete}
            recordId={record._id}
            variant="contained"
            color="secondary"
          >
            Delete
          </Button>
        </Paper>
      ))}
    </>
  );
}