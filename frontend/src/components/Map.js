import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { GoogleMap, Marker } from '@react-google-maps/api';

const Map = ({
	mapRef,
	location,
	crimes,
	setLocation,
	currentHighlightedKey,
	setHighlightedKey,
}) => {
	const center = useMemo(
		() => ({ lat: 40.70835219465311, lng: -74.00525406624838 }),
		[]
	);
	const [marker, setMarker] = useState();
	const options = useMemo(
		() => ({
			mapId: 'c4bf32b3037c7fe9',
			disableDefaultUI: true,
			clickableIcons: false,
		}),
		[]
	);

	useEffect(() => {
		if (location) {
			setMarker({
				lat: location.lat,
				lng: location.lng,
			});

			mapRef.current?.panTo(location);
			mapRef.current?.setZoom(13.5);
		}
	}, [location]);

	const onLoad = useCallback((map) => (mapRef.current = map), []);

	return (
		<div className='map'>
			<GoogleMap
				zoom={12}
				center={center}
				onLoad={onLoad}
				onClick={(location) => {
					setMarker({
						lat: location.latLng.lat(),
						lng: location.latLng.lng(),
					});
					setLocation({
						lat: location.latLng.lat(),
						lng: location.latLng.lng(),
					});
				}}
				mapContainerClassName='map-container'
				options={options}>
				{crimes &&
					crimes.map((crime) => (
						<Marker
							key={crime._id}
							onClick={() => {
								setHighlightedKey(crime._id);
							}}
							icon={
								currentHighlightedKey === crime._id
									? 'https://i.imgur.com/yj4lHNM.png'
									: 'https://i.imgur.com/Lj1OFLn.png'
							}
							zIndex={
								currentHighlightedKey === crime._id ? 999 : 1
							}
							position={{
								lat: crime.location.coordinates[1],
								lng: crime.location.coordinates[0],
							}}
						/>
					))}
				{marker && (
					<Marker
						icon='https://i.imgur.com/umepEtB.png'
						clickable={false}
						zIndex={999}
						position={marker}
					/>
				)}
			</GoogleMap>
		</div>
	);
};

export default Map;
