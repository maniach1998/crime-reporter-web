import React from 'react'
import { Component } from 'react';
import TextField from '@mui/material/TextField'
import { Autocomplete } from '@react-google-maps/api';

// based off this example
// https://react-google-maps-api-docs.netlify.app/#autocomplete

class MyAutocomplete extends Component {
	constructor (props) {
		super(props) 

		this.autocomplete = null

		this.onLoad = this.onLoad.bind(this)
		this.onPlaceChanged = this.onPlaceChanged.bind(this)
		this.stateFunc=props.stateFunc
	}

	onLoad (autocomplete) {
		console.log('autocomplete: ', autocomplete)

		this.autocomplete = autocomplete
	}
	
	onPlaceChanged () {
		if (this.autocomplete !== null) {
			console.log(this.autocomplete.getPlace())
			this.stateFunc(this.autocomplete.getPlace().formatted_address)
		} else {
			console.log('Autocomplete is not loaded yet!')
		}
	}

	render () {
		return (
			<Autocomplete
				onLoad={this.onLoad}
				onPlaceChanged={this.onPlaceChanged}
			>
				<TextField
					sx={{
						"& .MuiInputBase-root":{
							color:'whitesmoke'
						}
					}}
					color='info'
					fullWidth
				/>
			</Autocomplete>
		)
	}
}

export default MyAutocomplete;