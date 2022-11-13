import React, { useState } from 'react'

import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
// TODO: put all the imports inside this
import { Button, TextField } from '@mui/material';
// import { ThemeProvider, createTheme } from '@mui/system';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Close from '@mui/icons-material/Close';
// import { usePlacesWidget } from 'react-google-autocomplete';
// import GooglePlacesAutocomplete from 'react-google-places-autocomplete';
import { DateTimePicker } from '@mui/x-date-pickers';
// import Autocomplete from '@mui/material/Autocomplete';
import { Autocomplete } from '@react-google-maps/api';
import MyAutocomplete from './MyAutocomplete';

// function onPlaceChanged () {
// 	if (this.autocomplete !== null) {
// 		console.log(this.autocomplete.getPlace())
// 	} else {
// 		console.log('Autocomplete is not loaded yet!')
// 	}
// }

var date = new Date();

const ReportDialog = ({ open, onClose }) => {
  const [reportTime, setReportTime] = useState(date.toUTCString());
  const [reportAddr, setReportAddr] = useState("");
  const [reportTitle, setReportTitle] = useState("");
  const [reportDesc, setReportDesc] = useState("");

  return (
	<Dialog 
		open={open}
		onClose={onClose}
		style={{
			// the dropdown is next to the dialog root, not inside
			"& + .pac-container": {
				zIndex: 9999
			}
		}}
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
				Enter the date and time the incident took place.
			</Typography>
			<DateTimePicker
				value={reportTime}
				onChange={(value) => {setReportTime(value)}}
				renderInput={(params) => <TextField fullWidth {...params} />}
			/>
			<Typography
				sx={{
					marginTop: '20px',
					marginBottom: '5px'
				}}
			>
				Enter the address of the incident.
			</Typography>
			{/* 
				apiKey={'AIzaSyA2EahkvqFTyxK4Taak5jkgQmgLbsdPzq0'}
				for some reason this doesn't require the api key?
			*/}
			<MyAutocomplete 
				stateFunc={setReportAddr}
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
				onChange={(event) => {setReportTitle(event.target.value)}}
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
				onChange={(event) => {setReportDesc(event.target.value)}}
			/>
			<Button
				sx={{
					marginTop: '10px',
					width: '100%'
				}}
				onClick={() => {
						console.log(`Time: ${reportTime}; Address: ${reportAddr}; Title: ${reportTitle}; Desc: ${reportDesc}`);
						onClose()
					}
				}
			>
				Submit
			</Button>
		</DialogContent>
	</Dialog>
  )
}

export default ReportDialog