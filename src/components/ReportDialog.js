import React from 'react'

import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import { TextField } from '@mui/material';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Close from '@mui/icons-material/Close';

const ReportDialog = ({ open, onClose }) => {
  return (
	<Dialog 
		open={open}
		onClose={onClose}
	>
		{/* TODO: align this to the right side */}
		<IconButton 
			aria-label="close"
			onClick={onClose}
		>
			<Close />
		</IconButton>
		<DialogTitle>Report a Crime</DialogTitle>
		<DialogContent>
			<Typography>
				Enter a title of the incident that will appear on the map.
			</Typography>
			{/* TODO:
			- date/time picker
			- location
			- title of a crime 
			- description of crime
			- button to close it
			*/}
			<TextField
				label="Enter a short, descriptive title"
				fullWidth
				variant="outlined"
			/>
		</DialogContent>
	</Dialog>
  )
}

export default ReportDialog