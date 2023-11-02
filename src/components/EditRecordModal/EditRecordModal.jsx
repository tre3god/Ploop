import React, { useEffect, useState } from 'react';
import {
  Modal,
  Paper,
  Button,
  Grid,
  Select,
  MenuItem,
  FormControl,
  TextareaAutosize,
  Typography,
  Radio,
  RadioGroup,
  FormControlLabel,
} from '@mui/material';

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
        <Paper elevation={3} style={{ padding: 16 }}>
        <Typography variant="h6" align="center" gutterBottom>
                Edit your record
            </Typography>
          <form>
            <Grid container spacing={1} align="center">
              <Grid>
                <Typography>Duration:</Typography>
                <FormControl component="fieldset">
                  <RadioGroup name="duration" value={editedRecord.duration} onChange={handleChange}>
                    <FormControlLabel 
                    value="1-3 mins" 
                    checked={editedRecord.duration === '1-3 mins'} 
                    control={<Radio />} label="1-3 mins" 
                    />
                    <FormControlLabel 
                    value="3-10 mins" 
                    checked={editedRecord.duration === '3-10 mins'} 
                    control={<Radio />} label="3-10 mins" 
                    />
                    <FormControlLabel 
                    value="10 mins+" 
                    checked={editedRecord.duration === '10 mins+'} 
                    control={<Radio />} label="10 mins+" 
                    />
                  </RadioGroup>
                </FormControl>
              </Grid>
              <Grid>
                <Typography>Blood:</Typography>
                <Select name="blood" defaultValue={record.blood} onChange={handleChange}>
                  <MenuItem value="yes">Yes</MenuItem>
                  <MenuItem value="no">No</MenuItem>
                </Select>
              </Grid>
              <Grid>
                <Typography>Urgent:</Typography>
                <Select name="urgent" defaultValue={record.urgent} onChange={handleChange}>
                  <MenuItem value="yes">Yes</MenuItem>
                  <MenuItem value="no">No</MenuItem>
                </Select>
              </Grid>
              <Grid>
                <Typography>Pain:</Typography>
                <Select name="pain" defaultValue={record.pain} onChange={handleChange}>
                  <MenuItem value="yes">Yes</MenuItem>
                  <MenuItem value="no">No</MenuItem>
                </Select>
              </Grid>
              <Grid xs="4">
                <Typography>Type:</Typography>
                <Select name="type" defaultValue={record.type} onChange={handleChange} required>
                  <MenuItem value="1">Type 1</MenuItem>
                  <MenuItem value="2">Type 2</MenuItem>
                  <MenuItem value="3">Type 3</MenuItem>
                  <MenuItem value="4">Type 4</MenuItem>
                  <MenuItem value="5">Type 5</MenuItem>
                  <MenuItem value="6">Type 6</MenuItem>
                  <MenuItem value="7">Type 7</MenuItem>
                </Select>
              </Grid>
              <Grid xs="4">
                <Typography>Size:</Typography>
                <Select name="size" defaultValue={record.size} onChange={handleChange} required>
                  <MenuItem value="small">Small</MenuItem>
                  <MenuItem value="medium">Medium</MenuItem>
                  <MenuItem value="large">Large</MenuItem>
                </Select>
              </Grid>
              <Grid xs="4">
                <Typography>Color:</Typography>
                <Select name="color" defaultValue={record.color} onChange={handleChange} required>
                  <MenuItem value="Brown">Brown</MenuItem>
                  <MenuItem value="Yellow">Yellow</MenuItem>
                  <MenuItem value="red">Red</MenuItem>
                  <MenuItem value="green">Green</MenuItem>
                  <MenuItem value="black">Black</MenuItem>
                </Select>
                </Grid>
                <Typography align="left">Notes:</Typography>
                  <TextareaAutosize
                    name="notes"
                    defaultValue={record.notes}
                    onChange={handleChange}
                    placeholder="Enter your notes here"
                    style={{ width: '100%' }}
                  />
            </Grid>
          </form>
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


