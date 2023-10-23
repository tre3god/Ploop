import React from 'react'

export default function RecordHistoryPage({ user }) {
    console.log(user)



  return (
    <>
    <div>RecordHistoryPage</div>
    {user.records?.map((record, index) => (
      <ul key={index + 1}>
        <li>Record ID: {record._id}</li>

      </ul>
    ))}
    </>
  )
}
