import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { fetchOneUser } from '../../utilities/users-service';

export default function SearchUserPage() {
  const [queryUser, setQueryUser] = useState()
  const { userId } = useParams();
  // console.log(userId)
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchRecords() {
      try {
        const userRecord = await fetchOneUser(userId)
        setQueryUser(userRecord)
        setIsLoading(false);
      } catch (error) {
        console.log("Error fetching user records", error);
      }
    }
    fetchRecords();
  }, [userId]);

  console.log("queryUser", queryUser)

  return (
    <div>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <div>User: {queryUser[0].name}'s details and records</div>
      )}
    </div>
  );
}






