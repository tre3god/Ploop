import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { hcGetOneRecord } from '../../utilities/records-service';
import { Paper } from '@mui/material';
import { format } from 'date-fns';

export default function HcCommentPage({ user, queryUser }) {
    const { recordId } = useParams();
    const [oneRecord, setOneRecord] = useState({});
    
    useEffect(() => {
        async function getOneRecord() {
            try {
                const record = await hcGetOneRecord(recordId);
                setOneRecord(record);
            } catch (error) {
                console.log("Error fetching user record", error);
            }
        }
        
        getOneRecord(); 
    }, [recordId]);

    console.log(oneRecord);

    function formatDate(dateString) {
        const date = new Date(dateString);
    
        // format date as how i want
        const formattedDate = format(date, "dd MMMM, yyyy hh:mm a");
    
        return formattedDate;
    }

    return (
        <>
        <div>
            Leave your comment for {queryUser[0].name}'s stool record.
        </div>
        {oneRecord._id && (
            <Paper
                elevation={3}
                style={{ padding: 16, marginBottom: 16, width: 350 }}
            >
                <div>
                  <strong>Date:</strong> {formatDate(oneRecord.createdAt)}
                </div>
                <div>
                  <strong>Record Log:</strong> {oneRecord._id}
                </div>
                <div>
                  <strong>Duration:</strong> {oneRecord.duration}
                </div>
                <div>
                  <strong>Blood:</strong> {oneRecord.blood}
                </div>
                <div>
                  <strong>Urgent:</strong> {oneRecord.urgent}
                </div>
                <div>
                  <strong>Pain:</strong> {oneRecord.pain}
                </div>
                <div>
                  <strong>Type:</strong> {oneRecord.type}
                </div>
                <div>
                  <strong>Size:</strong> {oneRecord.size}
                </div>
                <div>
                  <strong>Color:</strong> {oneRecord.color}
                </div>
            </Paper>
        )}

        </>
    );
}
