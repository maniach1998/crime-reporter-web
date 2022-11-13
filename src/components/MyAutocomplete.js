import React from 'react'
import { Component } from 'react';
import TextField from '@mui/material/TextField'
import { Autocomplete } from '@react-google-maps/api';

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
					fullWidth
					// variant="outline"
					// label="Address"
					// value={reportAddr}
					// onChange={(event) => {
					// 	console.log(event.target.value)
					// 	setReportAddr(event.target.value)}}
				/>
			</Autocomplete>
		)
	}
}

export default MyAutocomplete;