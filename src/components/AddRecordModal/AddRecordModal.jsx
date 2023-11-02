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
import { useNavigate } from 'react-router-dom';
import { createRecord } from '../../utilities/records-service';
import { addRecord } from '../../utilities/users-service';



export default function AddRecordModal({ user, setUser, isOpen, onClose }) {
    const [stoolData, setStoolData] = useState({
        userId: user._id,
        duration: "",
        blood: "no",
        urgent: "no",
        pain: "no",
        type: "4",
        size: "medium",
        color: "Brown",
        notes: "",
    });

    const [error, setError] = useState("");
    const navigate = useNavigate();

    

    const handleChange = (e) => {
        const { name, value } = e.target;
        setStoolData({ ...stoolData, [name]: value });
    };

    const handleSubmit = async (e) => {
		e.preventDefault();
		if (!error) {
            //create stool record
			const data = await createRecord(stoolData);
			// console.log(data);
            
            //add stool record to user's record array
            const saveNewUserRecord = await addRecord({
                userId: user._id,
                recordId: data._id,
                createTime: data.createdAt
              });
            

            setUser(saveNewUserRecord.user)
            navigate("/user/analysis")
		}
	};

    return (
        <>
            <Modal open={isOpen} onClose={onClose}>
            <div style={{ margin: 'auto', width: 450 }}>

            <Paper elevation={3} style={{ padding: 16, width: '400px' }}>
            <Typography variant="h6" align="center" gutterBottom>
                Add a New Stool Record
            </Typography>
            <form onSubmit={handleSubmit}>
            <Grid container spacing={1} align="center">
                            <Grid item xs={5}>
                                <Typography>Duration:</Typography>
                                <FormControl component="fieldset">
                                    <RadioGroup name="duration" value={stoolData.duration} onChange={handleChange}>
                                        <FormControlLabel value="1-3 mins" control={<Radio />} label="1-3 mins" />
                                        <FormControlLabel value="3-10 mins" control={<Radio />} label="3-10 mins" />
                                        <FormControlLabel value="10 mins+" control={<Radio />} label="10 mins+" />
                                    </RadioGroup>
                                </FormControl>
                            </Grid>
                            <Grid>
                                <Typography>Blood:</Typography>
                                <Select name="blood" value={stoolData.blood} onChange={handleChange}>
                                    <MenuItem value="yes">Yes</MenuItem>
                                    <MenuItem value="no">No</MenuItem>
                                </Select>
                            </Grid>
                            <Grid>
                                <Typography>Urgent:</Typography>
                                <Select name="urgent" value={stoolData.urgent} onChange={handleChange}>
                                    <MenuItem value="yes">Yes</MenuItem>
                                    <MenuItem value="no">No</MenuItem>
                                </Select>
                            </Grid>
                            <Grid>
                                <Typography>Pain:</Typography>
                                <Select name="pain" value={stoolData.pain} onChange={handleChange}>
                                    <MenuItem value="yes">Yes</MenuItem>
                                    <MenuItem value="no">No</MenuItem>
                                </Select>
                            </Grid>
                            <Grid xs="4">
                                <Typography>Type:</Typography>
                                <Select name="type" value={stoolData.type} onChange={handleChange} required>
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
                                <Select name="size" value={stoolData.size} onChange={handleChange} required>
                                    <MenuItem value="small">Small</MenuItem>
                                    <MenuItem value="medium">Medium</MenuItem>
                                    <MenuItem value="large">Large</MenuItem>
                                </Select>
                            </Grid>
                            <Grid xs="4">
                                <Typography>Color:</Typography>
                                <Select name="color" value={stoolData.color} onChange={handleChange} required>
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
                                    value={stoolData.notes}
                                    onChange={handleChange}
                                    placeholder="Enter your notes here"
                                    style={{ width: '100%' }}
                                />
            </Grid>
                <br />
                <Button type="submit" variant="contained" color="primary" fullWidth>
                    Submit Record</Button>
                </form>
                    <div style={{ textAlign: 'center', marginTop: '16px' }}>
                        <img
                            src="https://www.restoralax.ca/sites/g/files/vrxlpx21671/files/styles/desktop_1000xauto/public/2021-07/bristol-stool-chart-fs-md.png?itok=PBN_iiW0"
                            style={{ width: '100%' }}
                        />
                    </div>            
                    </Paper>
            </div>

            </Modal>

        </>
    );
}

