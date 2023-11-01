import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { hcGetOneRecord } from '../../utilities/records-service';
import { Paper, TextField, Button } from '@mui/material';
import { format } from 'date-fns';
import { createComment } from '../../utilities/comments-service'
import { useNavigate } from 'react-router-dom';


export default function HcCommentPage({ user, queryUser }) {
    const { recordId } = useParams();
    const [oneRecord, setOneRecord] = useState({});
    const [commentData, setCommentData] = useState({ 
        advisorName: "",
        stoolRecordId: oneRecord?._id,
        comment: "",
    });

    const navigate = useNavigate();
    
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

    useEffect(() => {
        setCommentData({ ...commentData, advisorName: user.name, stoolRecordId: oneRecord._id });
    }, [oneRecord]);

    const handleCommentChange = (e) => {
        const { name, value } = e.target;
        setCommentData({ ...commentData, [name]: value });
        console.log(commentData)
    };

    const handleSubmitComment = async (e) => {
        e.preventDefault();
        console.log("click submit comment", commentData)

        try {
            const submitComment = await createComment(commentData);
            console.log("comment created", submitComment)
            navigate(`/search/${oneRecord.userId}`)
        } catch (error) {
            console.log("Error creating comment", error);
        }
    };

    function formatDate(dateString) {
        const date = new Date(dateString);
        const formattedDate = format(date, "dd MMMM, yyyy hh:mm a");
        return formattedDate;
    }

    return (
        <>
            <div>
                Leave your comment for {queryUser[0]?.name}'s stool record.
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
                    <div>
                        <strong>Notes:</strong> {oneRecord.notes}
                    </div>
                </Paper>
            )}

            <form onSubmit={handleSubmitComment}>
                
                <TextField
                    name="comment"
                    label="Comment"
                    fullWidth
                    margin="normal"
                    value={commentData.comment}
                    onChange={handleCommentChange}
                />
                <Button type="submit" variant="contained" color="primary">
                    Submit Comment
                </Button>
            </form>
        </>
    );
}
