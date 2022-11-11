import React from 'react'

import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import { TextField } from '@mui/material';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Close from '@mui/icons-material/Close';

import { DateTimePicker } from '@mui/x-date-pickers';

var currentDate = new Date();


const ReportDialog = ({ open, onClose }) => {
  return (
	<Dialog 
		open={open}
		onClose={onClose}
	>
		<DialogTitle
			sx={{
				display: 'flex',
				justifyContent: 'space-between',
				alignItems: 'center'
			}}
		>
			<h2>Report a Crime</h2>
			<IconButton 
				aria-label="close"
				onClick={onClose}
			>
				<Close />
			</IconButton>
		</DialogTitle>
		<DialogContent>
			<Typography>
				Enter a title of the incident that will appear on the map.
			</Typography>
			<DateTimePicker
				onChange={() => {}}
				renderInput={(params) => <TextField fullWidth {...params} />}
			/>
			{/* TODO: convert this to this https://www.npmjs.com/package/react-google-autocomplete */}
			<TextField 
				label="Address of the incident"
				fullWidth
				variant="outlined"
			/>
			<TextField
				label="Enter a short, descriptive title"
				fullWidth
				variant="outlined"
			/>
			<TextField 
				label="Enter a description"
				fullWidth
				multiline
				rows={4}
				maxRows={Infinity}
			/>
		</DialogContent>
	</Dialog>
  )
}

export default ReportDialog