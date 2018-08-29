import React, { Component } from 'react'
import PropTypes from 'prop-types'
import scriptjs from 'scriptjs'

import mapConfigs from 'configs/map'

function geocodePosition(geocoder, options, type) {
	return new Promise((resolve, reject) => {
		// setTimeout(() => {
			geocoder.geocode(options, (results, status) => {
				if (window.google.maps.GeocoderStatus.OK === status) {
					resolve(results[0])
				} else {
					reject({ message: `error geocode address: ${JSON.stringify(options.address)} ${status}`, status })
				}
			})
		// }, 500)
	})
}

const mapApis =  {
	Geocoder: () => {
		return new window.google.maps.Geocoder()
	},

	Marker: (options) => {
		return new window.google.maps.Marker(options)
	},

	LatLngBounds: () => {
		return new window.google.maps.LatLngBounds()
	},

	Map: (id, options) => {
		return new window.google.maps.Map(document.getElementById(id), options)
	},

	InfoWindow: () => {
		return new window.google.maps.InfoWindow({ maxWidth: 200 })
	},

	PlacesService: (map) => {
		return new window.google.maps.places.PlacesService(map)
	},

	geocodePosition,

	geocodePositions: async (positions, type) => {
		const geocodedPositions = []
		const { google } = window
		const geocoder = new google.maps.Geocoder()
		if (!Array.isArray(positions) && (typeof positions === 'object')) {
			positions = [positions]
		}

		for (let pos of positions) {
			const options = {}
			if (type === 'latlng') {
				options.location = pos
			} else {
				options.address = pos
			}

			const data = await geocodePosition(
				geocoder,
				options,
				type
			).catch((error) => {
				return error.status
			})

			if (typeof data === 'object') {
				geocodedPositions.push(data)
			}
		}
		return geocodedPositions
	}
}

function withGoogle(ChildComponent) {
	return class extends Component {
		getChildContext() {
			return { mapApis }
		}
		static childContextTypes = {
			mapApis: PropTypes.object
		}

		state = {
			google: null
		}


		componentDidMount() {
			scriptjs(mapConfigs.api.url, () => {
				const { google } = window
				this.setState({ google })

			})
		}

		render() {
			const { state, props } = this

			return (
				state.google && (
					<ChildComponent
						google={state.google}
						{...props}
					/>
				)
			)
		}
	}
}


export default withGoogle
