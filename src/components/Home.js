import { useLoadScript } from '@react-google-maps/api';
import React, { useRef, useState } from 'react';
import Map from './Map';
import Sidebar from './Sidebar';

const libraries = ['places'];

const Home = () => {
	const { isLoaded } = useLoadScript({
		googleMapsApiKey: 'AIzaSyBoU-jUAuFITy9q0ZoHUlR10jd_UA1TqDc',
		libraries: libraries,
	});

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
		</div>
	);
};

export default Home;
