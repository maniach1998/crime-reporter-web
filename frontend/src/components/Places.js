import React, { useEffect } from 'react';
import moment from 'moment';
import axios from 'axios';
import usePlacesAutocomplete, {
	getGeocode,
	getLatLng,
} from 'use-places-autocomplete';

import Typography from '@mui/joy/Typography';
import TextField from '@mui/joy/TextField';
import List from '@mui/joy/List';
import ListItem from '@mui/joy/ListItem';
import ListItemButton from '@mui/joy/ListItemButton';
import Sheet from '@mui/joy/Sheet';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import CircularProgress from '@mui/joy/CircularProgress';

const SIZE_OF_ELEMENTS_ABOVE_SCROLL_LIST = 540;

const Places = ({
	location,
	setLocation,
	currentAddress,
	setCurrentAddress,
	isGettingLocation,
	setIsGettingLocation,
	crimes,
	setCrimes,
}) => {
	// set lat and lng of the retrieved location
	useEffect(() => {
		if (location) {
			const geocoder = new window.google.maps.Geocoder();
			geocoder.geocode({ location }).then(({ results }) => {
				const currentLocality = results[0].address_components.filter(
					(address) =>
						address.types.includes('locality') ||
						address.types.includes('neighborhood')
				);
				const currentState = results[0].address_components.filter(
					(address) =>
						address.types.includes('administrative_area_level_1')
				);

				setCurrentAddress({
					locality: currentLocality[0],
					state: currentState[0],
				});

				setIsGettingLocation(false);
			});
		}
	}, [location]);

	// fetch crimes in the retrieved location from backend
	useEffect(() => {
		if (location && !isGettingLocation) {
			console.log('finished getting location, fetching crimes');

			axios
				.get(
					`http://localhost:4000/api/reports?lng=${location.lng}&lat=${location.lat}`
				)
				.then((res) => {
					setCrimes(res.data.data);
				});
		}
	}, [location, isGettingLocation]);

	// console.log(moment(moment.now()).format('YYYY-MM-DD HH:mm:ss'));
	// console.log(
	// 	moment(moment.now())
	// 		.day(-7)
	// 		.startOf('day')
	// 		.format('YYYY-MM-DD HH:mm:ss')
	// );
	// console.log(mockData.incidents.length);

	const {
		ready,
		value,
		setValue,
		suggestions: { status, data },
		clearSuggestions,
	} = usePlacesAutocomplete();

	const handleSelect = async (description) => {
		setValue(description, false);
		clearSuggestions();

		const results = await getGeocode({ address: description });
		const { lat, lng } = await getLatLng(results[0]);
		setLocation({ lat, lng });
	};

	return (
		<Box sx={{ py: 2 }}>
			<Stack
				direction='column'
				justifyContent='center'
				alignItems='flex-start'
				spacing={2}>
				<TextField
					color='info'
					variant='solid'
					placeholder='Search for a location'
					disabled={!ready}
					value={value}
					onChange={(e) => setValue(e.target.value)}
					fullWidth
				/>

				{status === 'OK' && (
					<List
						variant='soft'
						color='neutral'
						sx={{ width: '100%', borderRadius: 'sm' }}>
						{data.map(({ place_id, description }) => (
							<>
								<ListItem key={place_id}>
									<ListItemButton
										variant='soft'
										color='neutral'
										onClick={() =>
											handleSelect(description)
										}>
										<Typography
											level='body2'
											component='p'
											textColor='black'>
											{description}
										</Typography>
									</ListItemButton>
								</ListItem>
							</>
						))}
					</List>
				)}

				{currentAddress && (
					<Typography level='body1' component='p' textColor='white'>
						Showing results near{' '}
						<Typography
							level='body1'
							variant='soft'
							component='strong'
							p={0.5}
							color='info'>
							{currentAddress.locality.long_name},{' '}
							{currentAddress.state.short_name}
						</Typography>
					</Typography>
				)}

				{location && !isGettingLocation && crimes === null ? (
					<Stack
						direction='column'
						alignItems='center'
						justifyContent='center'
						py={2}
						spacing={2}
						sx={{ width: '100%' }}>
						<Typography level='body1' component='p' color='info'>
							<strong>Retrieving crimes...</strong>
						</Typography>
						<CircularProgress variant='plain' color='info' />
					</Stack>
				) : (
					<>
						{crimes && (
							<Stack
								direction='column'
								// justifyContent='center'
								alignItems='flex-start'
								sx={{
									// set max height to 100% - the size of the content above it (511px - 520 for simplicity)
									maxHeight: `calc(100vh - ${SIZE_OF_ELEMENTS_ABOVE_SCROLL_LIST}px)`,
									overflowY: 'scroll',
								}}
								spacing={2}>
								{crimes.map((incident) => (
									<Sheet
										key={incident._id}
										variant='soft'
										color='info'
										sx={{
											borderRadius: 10,
											marginright: 'auto',
											maxWidth: 0.98,
										}}>
										<Stack
											direction='column'
											justifyContent='center'
											alignItems='flex-start'
											paddingY={2}
											paddingX={3}>
											<Typography
												level='h5'
												component='h5'>
												<strong>
													{incident.title}
												</strong>
											</Typography>
											<Typography
												level='h6'
												component='h6'>
												<strong>
													{incident.address}
												</strong>
											</Typography>
											<Typography
												level='body2'
												component='body2'>
												<strong>
													{moment(
														incident.reportedAt
													).fromNow()}
												</strong>
											</Typography>
											<Typography
												level='body1'
												component='p'>
												{incident.description}
											</Typography>
										</Stack>
									</Sheet>
								))}
							</Stack>
						)}
					</>
				)}
			</Stack>
		</Box>
	);
};

export default Places;
