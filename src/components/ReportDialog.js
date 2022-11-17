import React, { useState } from 'react'
import { 
	Button, 
	TextField,
	Dialog,
	DialogTitle,
	DialogContent,
	Typography,
	IconButton
} from '@mui/material';
import Close from '@mui/icons-material/Close';
import { DateTimePicker } from '@mui/x-date-pickers';
import MyAutocomplete from './MyAutocomplete';
import { color } from '@mui/system';

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
		PaperProps={{
			style: {
				backgroundColor: '#111',
				"& + .pac-container": {
					zIndex: 9999
				}
			}
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
				color:'whitesmoke'
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
					marginBottom: '5px',
					color:'whitesmoke'
				}}
			>
				Enter the date and time the incident took place:
			</Typography>
			<DateTimePicker
				InputProps={{
					color:"info"
				}}
				value={reportTime}
				onChange={(value) => {setReportTime(value)}}
				renderInput={(params) => <TextField fullWidth 					
					sx={{
						"& .MuiInputBase-root":{
							color:'whitesmoke'
						}
				}}
				{...params} />}
			/>
			<Typography
				sx={{
					marginTop: '20px',
					marginBottom: '5px',
					color:'whitesmoke'
				}}
			>
				Enter the address of the incident:
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
					marginBottom: '5px',
					color:'whitesmoke'
				}}
			>
				Enter a short, descriptive title for the incident:
			</Typography>
			<TextField
				placeholder = "Title"
				sx={{
					"& .MuiInputBase-root":{
						color:'whitesmoke'
					}
				}}
				InputLabelProps = {{
					style: {color: '#6b6e6c'}
				}}
				label="Title"
				color="info"
				fullWidth
				variant="outlined"
				onChange={(event) => {setReportTitle(event.target.value)}}
			/>
			<Typography
				sx={{
					marginTop: '20px',
					marginBottom: '5px',
					color:'whitesmoke'
				}}
			>
				Enter a longer description:
			</Typography>
			<TextField 
				sx={{
					"& .MuiInputBase-root":{
						color:'whitesmoke'
					}
				}}
				InputLabelProps = {{
					style: {color: '#6b6e6c'}
				}}
				placeholder="Description"
				variant="outlined"
				color="info"
				label="Description"
				fullWidth
				multiline
				rows={4}
				onChange={(event) => {setReportDesc(event.target.value)}}
			/>
			<Button
				sx={{
					marginTop: '10px',
					width: '30%',
					color:'#5F35AE',
					left: '37.5%',
					fontWeight: 'bold',
					backgroundColor:'lightgrey'
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