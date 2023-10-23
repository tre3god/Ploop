import React from 'react'

export default function RecordHistoryPage({ user }) {
    console.log(user.user)



  return (
    <>
    <div>RecordHistoryPage</div>
    {user.user.records?.map((record, index) => (
      <ul key={index + 1}>
        <li>{record.createdAt} {record._id} <button>Edit</button> <button>Delete</button></li>

      </ul>
    ))}
    </>
  )
}
