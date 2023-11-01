import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { fetchOneUser } from '../../utilities/users-service';
import { getRecords, hcGetRecords } from '../../utilities/records-service';
import HcRecordCard from '../../components/HcRecordCard/HcRecordCard';


export default function SearchUserPage({ queryUser, setQueryUser }) {
  const [oneUserRecords, setOneUserRecords] = useState();
  const { userId } = useParams();

  // console.log(userId)
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchUser() {
      try {
        const userRecord = await fetchOneUser(userId)
        setQueryUser(userRecord)
        setIsLoading(false);
      } catch (error) {
        console.log("Error fetching user records", error);
      }
    }
    fetchUser();
  }, [userId]);

  useEffect(() => {
    async function fetchRecords() {
      try {
        const userRecords = await hcGetRecords(userId)
        setOneUserRecords(userRecords)
      } catch (error) {
        console.log("Error fetching user records", error);

      }
    }
    fetchRecords();
  }, [userId]);

  console.log("queryUser", queryUser)
  console.log("User's records", oneUserRecords)

  
  return (
    <div>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <>
        <div>User: {queryUser[0].name}'s details and records</div>
        <div>Email: {queryUser[0].email}</div>
        <br></br>
        <HcRecordCard oneUserRecords={oneUserRecords}/>
        </>
      )}
    </div>
  );
}






