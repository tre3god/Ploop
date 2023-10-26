import React, { useEffect, useState } from 'react';
import { Modal, Paper, TextField, Button } from '@mui/material';

export default function EditRecordModal({ isOpen, onClose, record, onSave }) {
  const [editedRecord, setEditedRecord] = useState({ ...record });

  useEffect(() => {
    // when modal is open, set state to edited record
    setEditedRecord(record);
  }, [record, isOpen]);
  

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedRecord({
      ...editedRecord,
      [name]: value,
    });
  };

  const handleSave = () => {
    onSave(editedRecord);
    onClose();
  };

  return (
    <Modal open={isOpen} onClose={onClose}>
      <div style={{ margin: 'auto', width: 300 }}>
        <Paper style={{ padding: 16 }}>
          <label>Duration:</label>
          <br />
          <label>
            <input
              type="radio"
              name="duration"
              value="1-3 mins"
              checked={editedRecord.duration === '1-3 mins'}
              onChange={handleChange}
            />
            1-3 mins
          </label>
          <label>
            <input
              type="radio"
              name="duration"
              value="3-10 mins"
              checked={editedRecord.duration === '3-10 mins'}
              onChange={handleChange}
            />
            3-10 mins
          </label>
          <label>
            <input
              type="radio"
              name="duration"
              value="10 mins+"
              checked={editedRecord.duration === '10 mins+'}
              onChange={handleChange}
            />
            10 mins+
          </label>
          <br />

          <label>Blood:</label>
          <select
            name="blood"
            value={editedRecord.blood}
            onChange={handleChange}
          >
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </select>
          <br />

          <label>Urgent:</label>
          <select
            name="urgent"
            value={editedRecord.urgent}
            onChange={handleChange}
          >
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </select>
          <br />

          <label>Pain:</label>
          <select
            name="pain"
            value={editedRecord.pain}
            onChange={handleChange}
          >
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </select>
          <br />

          <label>Type:</label>
          <select
            name="type"
            value={editedRecord.type}
            onChange={handleChange}
          >
            <option value="">Select Type</option>
            <option value="1">Type 1</option>
            <option value="2">Type 2</option>
            <option value="3">Type 3</option>
            <option value="4">Type 4</option>
            <option value="5">Type 5</option>
            <option value="6">Type 6</option>
            <option value="7">Type 7</option>
          </select>
          <br />

          <label>Size:</label>
          <select
            name="size"
            value={editedRecord.size}
            onChange={handleChange}
          >
            <option value="">Select size</option>
            <option value="small">Small</option>
            <option value="medium">Medium</option>
            <option value="large">Large</option>
          </select>
          <br />

          <label>Color:</label>
          <select
            name="color"
            value={editedRecord.color}
            onChange={handleChange}
          >
            <option value="">Select color</option>
            <option value="Brown">Brown</option>
            <option value="Yellow">Yellow</option>
            <option value="red">Red</option>
            <option value="green">Green</option>
            <option value="black">Black</option>
          </select>
          <br />

          <label>Notes:</label>
          <textarea
            name="notes"
            value={editedRecord.notes}
            onChange={handleChange}
          />
          <br />
          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={handleSave}
          >
            Save
          </Button>
        </Paper>
      </div>
    </Modal>
  );
}


