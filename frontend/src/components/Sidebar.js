import React, { useState } from 'react';
import Typography from '@mui/joy/Typography';
import Button from '@mui/joy/Button';
import Divider from '@mui/joy/Divider';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import NearMeIcon from '@mui/icons-material/NearMe';

import Places from './Places';

const Sidebar = ({ location, setLocation }) => {
	// for 'use my location' button
	const [geoPermissions, setGeoPermissions] = useState(null);
	const [isGettingLocation, setIsGettingLocation] = useState(false);
	const [currentAddress, setCurrentAddress] = useState(null);

	const handleUseLocation = () => {
		setIsGettingLocation(true);

		navigator.permissions
			.query({ name: 'geolocation' })
			.then((result) => {
				if (result.state === 'granted') {
					navigator.geolocation.getCurrentPosition((position) => {
						setLocation({
							lat: position.coords.latitude,
							lng: position.coords.longitude,
						});
						setGeoPermissions(true);
					});
				} else if (result.state === 'prompt') {
					navigator.geolocation.getCurrentPosition((position) => {
						setLocation({
							lat: position.coords.latitude,
							lng: position.coords.longitude,
						});
						setGeoPermissions(true);
					});
				} else if (result.state === 'denied') {
					// navigator.permissions.query({name: 'geolocation'}).
					setIsGettingLocation(false);
					setGeoPermissions(false);
				}
			})
			.catch((error) => {
				console.log(error);
				setIsGettingLocation(false);
				setGeoPermissions(false);
			});
	};

	return (
		<Box
			sx={{
				width: '20%',
				padding: '0px 20px',
				height: '100vh',
				backgroundColor: '#111',
				zIndex: 999,
			}}>
			<Box>
				<Stack
					direction='column'
					justifyContent='center'
					alignItems='flex-start'
					py={5}
					spacing={1}>
					<Typography
						level='display1'
						component='h1'
						textColor='white'
						fontSize='4.5vw'>
						Cr
						<Typography variant='plain' color='info' p={0}>
							i
						</Typography>
						me Re
						<Typography variant='plain' color='info' p={0}>
							p
						</Typography>
						orter
					</Typography>

					<Typography level='h6' component='p' textColor='lightgray' fontSize='1.4vw'>
						See the most recently reported crimes in your area.
					</Typography>
				</Stack>
			</Box>

			<Box>
				<Stack
					direction='column'
					justifyContent='center'
					alignItems='center'
					spacing={2}>
					<Button
						startDecorator={
							!isGettingLocation && (
								<NearMeIcon
									color={
										geoPermissions === false && !location
											? 'danger'
											: 'info'
									}
								/>
							)
						}
						onClick={handleUseLocation}
						loading={isGettingLocation}
						disabled={geoPermissions !== null}
						variant={
							geoPermissions === false && !location
								? 'solid'
								: location
								? 'plain'
								: 'soft'
						}
						color={
							geoPermissions === false && !location
								? 'danger'
								: 'info'
						}
						fullWidth>
						<Typography
							level='body1'
							component='strong'
							color={
								geoPermissions === false && !location
									? 'danger'
									: 'info'
							}>
							{geoPermissions === false && !location
								? 'Unable to fetch location'
								: !isGettingLocation &&
								  (location
										? currentAddress &&
										  `${currentAddress.locality.long_name}, ${currentAddress.state.short_name}`
										: 'Use my location')}
						</Typography>
					</Button>

					<Divider>
						<Typography level='body2' textColor='white'>
							OR
						</Typography>
					</Divider>
				</Stack>
			</Box>

			<Places
				location={location}
				setLocation={setLocation}
				currentAddress={currentAddress}
				setCurrentAddress={setCurrentAddress}
				setIsGettingLocation={setIsGettingLocation}
			/>
		</Box>
	);
};

export default Sidebar;
