import React, { useState } from 'react';
import Calender from "../../components/Calender/Calender";
import { Button, Box } from '@mui/material';
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
		<Box
			display="flex"
			flexDirection="column"
			alignItems="center"
			justifyContent="center"
			height="90vh"
		>
			<Button
				onClick={openAddModal}
				variant="contained"
			>
				Add Stool Record
			</Button>
			<br></br>

			<AddRecordModal
				user={user}
				setUser={setUser}
				isOpen={isEditModalOpen}
				onClose={closeEditModal}
			/>
			<Calender user={user} />
		</Box>
	);
}
