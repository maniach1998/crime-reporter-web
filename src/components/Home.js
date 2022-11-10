import { useLoadScript } from '@react-google-maps/api';
import React, { useRef, useState } from 'react';
import Map from './Map';
import Sidebar from './Sidebar';
import ReportDialog from './ReportDialog';

import Button from '@mui/joy/Button';

const libraries = ['places'];

const Home = () => {
	const [dialogOpen, setDialogOpen] = useState(false);

	const { isLoaded } = useLoadScript({
		googleMapsApiKey: 'AIzaSyBoU-jUAuFITy9q0ZoHUlR10jd_UA1TqDc',
		libraries: libraries,
	});

	function handleReportClickOpen(){
		setDialogOpen(true);
	}
	function handleDialogClose(){
		setDialogOpen(false);
	}

	const [location, setLocation] = useState(null);
	const mapRef = useRef();

	if (!isLoaded) return <h1>Loading...</h1>;

	return (
		<div className='container'>
			<Sidebar location={location} setLocation={setLocation} />
			<Map
				mapRef={mapRef}
				location={location}
				setLocation={setLocation}
			/>
			{/* https://mui.com/joy-ui/react-button/ */}
			<Button 
				variant="solid"
				color="danger"
				size="lg"
				sx={{
					position: 'absolute',
					right: '50px',
					top: '50px'
				}}
				onClick={handleReportClickOpen}
			>
				Report an Incident
			</Button>
			<ReportDialog 
				open={dialogOpen}
				onClose={handleDialogClose}
			/>
		</div>
	);
};

export default Home;
