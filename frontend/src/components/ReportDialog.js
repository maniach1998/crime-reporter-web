import React, { useState } from 'react';
import axios from 'axios';
import {
	Button,
	TextField,
	Dialog,
	DialogTitle,
	DialogContent,
	Typography,
	IconButton,
	Snackbar,
} from '@mui/material';
import CircularProgress from '@mui/joy/CircularProgress';
import Select from '@mui/joy/Select';
import Option from '@mui/joy/Option';
import KeyboardArrowDown from '@mui/icons-material/KeyboardArrowDown';
import Close from '@mui/icons-material/Close';
import { DateTimePicker } from '@mui/x-date-pickers';
import MyAutocomplete from './MyAutocomplete';

var date = new Date();
const crimeTypes = [
	{ type: 'Robbery' },
	{ type: 'Murder' },
	{ type: 'Rape' },
	{ type: 'Aggravated Assault' },
	{ type: 'Burglary' },
	{ type: 'Larceny-theft' },
	{ type: 'Motor Vehicle Theft' },
	{ type: 'Arson' },
	{ type: 'Other' },
];

const ReportDialog = ({ open, onClose }) => {
	const [reportTime, setReportTime] = useState(date.toUTCString());
	const [reportAddr, setReportAddr] = useState('');
	const [reportLoc, setReportLoc] = useState(null);
	const [reportTitle, setReportTitle] = useState('');
	const [reportDesc, setReportDesc] = useState('');
	const [snackbarOpen, setSnackbarOpen] = useState(false);
	const [alertMessage, setAlertMessage] = useState('');
	const [isSubmitting, setIsSubmitting] = useState(false);

	const handleSnackbarClose = (event, reason) => {
		if (reason === 'clickaway') {
			return;
		}

		setSnackbarOpen(false);
	};

	const handleReport = (e) => {
		e.preventDefault();
		setIsSubmitting(true);

		if (reportAddr === '') {
			setIsSubmitting(false);
			setAlertMessage('❗ Please enter an address!');
			setSnackbarOpen(true);
			return;
		}

		if (reportTitle === '') {
			setIsSubmitting(false);
			setAlertMessage('❗ Please select a type for the crime!');
			setSnackbarOpen(true);
			return;
		}

		const newReport = {
			address: reportAddr,
			title: reportTitle,
			description: reportDesc,
			reportedAt: reportTime,
			lng: reportLoc.lng,
			lat: reportLoc.lat,
		};

		console.log(newReport);
		axios
			.post('http://localhost:4000/api/reports/new-report', newReport)
			.then((res) => {
				// setCrimes(res.data.data);
				console.log('response', res);
				setIsSubmitting(false);
				onClose();
				setAlertMessage('✅ Report submitted!');
				setSnackbarOpen(true);
			})
			.catch((err) => {
				console.log('error', err);
				setIsSubmitting(false);
				setAlertMessage('😔 Something went wrong...');
				setSnackbarOpen(true);
			});
	};

	return (
		<>
			<Dialog
				open={open}
				onClose={onClose}
				PaperProps={{
					style: {
						backgroundColor: '#111',
						'& + .pac-container': {
							zIndex: 9999,
						},
					},
				}}
				/*style={{
			// the dropdown is next to the dialog root, not inside
			"& + .pac-container": {
				zIndex: 9999
			}
		}}*/
			>
				<DialogTitle
					sx={{
						display: 'flex',
						justifyContent: 'space-between',
						alignItems: 'center',
						color: 'whitesmoke',
					}}>
					<h2>Report a Crime</h2>
					<IconButton
						aria-label='close'
						onClick={onClose}
						color='info'>
						<Close />
					</IconButton>
				</DialogTitle>
				<DialogContent>
					<form onSubmit={handleReport}>
						<Typography
							sx={{
								marginBottom: '5px',
								color: 'whitesmoke',
							}}>
							Enter the date and time the incident took place:
						</Typography>
						<DateTimePicker
							InputProps={{
								color: 'info',
							}}
							label='Date and Time'
							value={reportTime}
							onChange={(value) => {
								setReportTime(value);
							}}
							renderInput={(params) => (
								<TextField
									fullWidth
									variant='outlined'
									InputLabelProps={{
										style: { color: '#6b6e6c' },
									}}
									sx={{
										'& .MuiInputBase-root': {
											color: 'whitesmoke',
										},
										svg: { color: 'whitesmoke' },
									}}
									{...params}
								/>
							)}
						/>
						<Typography
							sx={{
								marginTop: '20px',
								marginBottom: '5px',
								color: 'whitesmoke',
							}}>
							Enter the address of the incident:
						</Typography>
						{/* 
				apiKey={'AIzaSyA2EahkvqFTyxK4Taak5jkgQmgLbsdPzq0'}
				for some reason this doesn't require the api key?
			*/}
						<MyAutocomplete
							stateFunc={setReportAddr}
							locationFunc={setReportLoc}
							required
						/>

						<Typography
							sx={{
								marginTop: '20px',
								marginBottom: '5px',
								color: 'whitesmoke',
							}}>
							Select the type of the crime:
						</Typography>
						<Select
							color='info'
							variant='soft'
							placeholder='type of crime'
							onChange={(e) =>
								setReportTitle(e.target.textContent)
							}
							indicator={<KeyboardArrowDown />}>
							{crimeTypes.map((crimeType) => (
								<Option
									key={crimeType.type}
									color='info'
									variant='soft'
									value={crimeType.type}>
									{crimeType.type}
								</Option>
							))}
						</Select>

						{/* <Typography
							sx={{
								marginTop: '20px',
								marginBottom: '5px',
								color: 'whitesmoke',
							}}>
							Enter a short, descriptive title for the incident:
						</Typography>
						<TextField
							placeholder='Title'
							sx={{
								'& .MuiInputBase-root': {
									color: 'whitesmoke',
								},
							}}
							InputLabelProps={{
								style: { color: '#6b6e6c' },
							}}
							label='Title'
							color='info'
							fullWidth
							variant='outlined'
							onChange={(event) => {
								setReportTitle(event.target.value);
							}}
							required
						/> */}

						<Typography
							sx={{
								marginTop: '20px',
								marginBottom: '5px',
								color: 'whitesmoke',
							}}>
							Enter a longer description:
						</Typography>
						<TextField
							sx={{
								'& .MuiInputBase-root': {
									color: 'whitesmoke',
								},
							}}
							InputLabelProps={{
								style: { color: '#6b6e6c' },
							}}
							placeholder='Description'
							variant='outlined'
							color='info'
							label='Description'
							fullWidth
							multiline
							rows={4}
							onChange={(event) => {
								setReportDesc(event.target.value);
							}}
							required
						/>
						<Button
							type='submit'
							sx={{
								marginTop: '10px',
								width: '30%',
								color: '#5F35AE',
								left: '65%',
								fontWeight: 'bold',
								backgroundColor: 'lightgrey',
							}}>
							{isSubmitting ? (
								<CircularProgress
									size='sm'
									variant='plain'
									color='info'
								/>
							) : (
								'Submit'
							)}
						</Button>
					</form>
				</DialogContent>
			</Dialog>
			<Snackbar
				open={snackbarOpen}
				autoHideDuration={6000}
				onClose={handleSnackbarClose}
				message={alertMessage}
			/>
		</>
	);
};

export default ReportDialog;
