import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { hcGetOneRecord } from '../../utilities/records-service';
import { Paper, TextField, Button } from '@mui/material';
import { format } from 'date-fns';
import { createComment, getAllComments } from '../../utilities/comments-service'
import { useNavigate } from 'react-router-dom';


export default function HcCommentPage({ user, queryUser, setQueryUser }) {
    const { recordId } = useParams();
    // console.log(recordId)
    const [oneRecord, setOneRecord] = useState({});
    const [commentData, setCommentData] = useState({ 
        advisorName: "",
        stoolRecordId: recordId,
        comment: "",
    });
    const [allComments, setAllComments] = useState([]);

    const navigate = useNavigate();
    
    // fetch individual records details
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
    console.log("onerecord", oneRecord);

    // fetch all comments
    useEffect(() => {
        async function getAllComms() {
            try {
                const allComms = await getAllComments(recordId);
                setAllComments(allComms);
            } catch (error) {
                console.log("Error fetching all comments", error);
            }
        }
        getAllComms();
    }, [recordId])
    console.log("allcomments", allComments)

    //
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
            {user.role === 'users' ? (
            <div>
                Your selected record
            </div>
                ) : user.role === 'hcprof' ? (
                <div>
                Patient: {queryUser[0]?.name}'s stool record comment page.
                </div>
                ) : (
            <div>
                User role not recognized.
            </div>
            )}
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

            {user.role === 'hcprof' && (
                <form onSubmit={handleSubmitComment}>
                    <TextField
                        name="comment"
                        label="Comment"
                        fullWidth
                        margin="normal"
                        value={commentData.comment}
                        onChange={handleCommentChange}
                    />
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                    >
                        Submit Comment
                    </Button>
                </form>
            )}
            <br></br>
            <div>
                <h2>Comments History</h2>
                {allComments?.length > 0 ? (
                    allComments.map((comment, index) => (
                        <Paper
                            key={index}
                            elevation={3}
                            style={{ padding: 16, marginBottom: 16, width: 350 }}
                        >
                            <div>
                                <strong>Doctor: </strong>{comment.advisorName}
                            </div>
                            <div>
                                <strong>Comment: </strong>{comment.comment}
                            </div>
                            <div>
                                <strong>Date:</strong> {formatDate(comment.createdAt)}
                            </div>
                        
                    </Paper>
                        ))
                ) : (
                    <p>There are no past comments for this record.</p>
                )}
            </div>
        </>
    );
}
