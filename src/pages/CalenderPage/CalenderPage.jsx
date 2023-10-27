import React, { useState } from 'react'
import Calender from "../../components/Calender/Calender";
import { Button } from '@mui/material';
import AddRecordModal from '../../components/AddRecordModal/AddRecordModal';


export default function CalenderPage({ user, setUser }) {
	const [isEditModalOpen, setIsEditModalOpen] = useState(false);

	const openAddModal = () => {
		setIsEditModalOpen(true);
	};
 
	const closeEditModal = () => {
		setIsEditModalOpen(false);
	};

	return (
		<>
			<Button onClick={openAddModal}>Add Record</Button>
			<AddRecordModal 
			user={user} 
			setUser={setUser}
			isOpen={isEditModalOpen}
			onClose={closeEditModal}

			/>
			<Calender user={user}/>
		</>
	);
}
