import React, { useRef } from 'react'

import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import { Input, TextField } from '@mui/material';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Close from '@mui/icons-material/Close';
// import { usePlacesWidget } from 'react-google-autocomplete';
import GooglePlacesAutocomplete from 'react-google-places-autocomplete';
import { DateTimePicker } from '@mui/x-date-pickers';
import Autocomplete from '@mui/material/Autocomplete';

var currentDate = new Date();


const ReportDialog = ({ open, onClose }) => {
//   const { ref } = usePlacesWidget({
// 	apiKey:'AIzaSyA2EahkvqFTyxK4Taak5jkgQmgLbsdPzq0',
// 	onPlaceSelected: (place) => {
// 		console.log(place);
// 	},
// 	options: {
// 		types: ["(regions)"],
// 	}
//   });

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
			<Typography
				sx={{
					marginBottom: '5px'
				}}
			>
				Enter a title of the incident that will appear on the map.
			</Typography>
			<DateTimePicker
				onChange={() => {}}
				renderInput={(params) => <TextField fullWidth {...params} />}
			/>
			<Typography
				sx={{
					marginTop: '20px',
					marginBottom: '5px'
				}}
			>
				Enter a short, descriptive title for the incident.
			</Typography>
			<TextField
				label="Title"
				fullWidth
				variant="outlined"
			/>
			<Typography
				sx={{
					marginTop: '20px',
					marginBottom: '5px'
				}}
			>
				Enter a longer description.
			</Typography>
			<TextField 
				label="Description"
				fullWidth
				multiline
				rows={4}
			/>
			<Typography
				sx={{
					marginTop: '20px',
					marginBottom: '5px'
				}}
			>
				Enter the address of the incident.
			</Typography>
			{/* TODO: replace this with something better, the react-google-autocomplete
			is more robust but I can't understand how the MaterialUI example works */}
			<GooglePlacesAutocomplete
				apiKey={'AIzaSyA2EahkvqFTyxK4Taak5jkgQmgLbsdPzq0'}
			/>
		</DialogContent>
	</Dialog>
  )
}

export default ReportDialog