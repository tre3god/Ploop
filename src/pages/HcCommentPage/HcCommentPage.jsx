import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { hcGetOneRecord } from '../../utilities/records-service';

export default function HcCommentPage() {
    const { recordId } = useParams();
    const [oneRecord, setOneRecord] = useState();
    // console.log(recordId)

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

    console.log(oneRecord)

    return (
        <>
        <div>
            HcCommentPage
        </div>
        {/* <div>{oneRecord}</div> */}
        </>
    );
}
