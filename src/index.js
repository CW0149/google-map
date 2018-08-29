import React, { Component } from 'react'
import ReactDom from 'react-dom'
import PropTypes from 'prop-types'

import withGoogle from 'apis/google'

import './index.css'
import mapConfigs from 'configs/map'

import Map from 'components/Map'
import Markers from 'components/Markers'
import ShowBox from 'components/ShowBox'

const rootDom =  document.getElementById('root')

if (window.outerWidth < 800) { 
	window.isSmallScreen = true
	rootDom.className = `sd ${rootDom.className}`
}


class App extends Component {
	state = {
		currentPosition: null,
		mapCenter: mapConfigs.init.center,
		mapZoom: mapConfigs.init.zoom,
		geocodedMarkerPositions: null,
		filteredMarkerPositions: null
	}


	getCurrentPosition() {
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition((res) => {
				const { coords } = res
				const latlng = {
					lat: coords.latitude,
					lng: coords.longitude
				}

				if (!this.state.geocodedMarkerPositions) { // 只在初始marker未完全加载后触发
					this.setState({
						currentPosition: latlng,
						mapCenter: latlng
					})
				}
			}, (error) => {
				console.log(error)
			} ,{timeout:10000})
		}
	}

	fitMap = (positions, map) => {
		const bounds = this.context.mapApis.LatLngBounds()
		for (let pos of positions) {
			if (!(typeof pos === 'object')) continue
			bounds.extend(pos.geometry.location)
		}
		map.fitBounds(bounds)
		this.setState({mapZoom: map.getZoom() - .1})
	}

	setMapCenter = (item) => {
		const { location } = item
		this.setState({
			mapCenter: {
				lat: location.lat(),
				lng: location.lng()
			},
			mapZoom: 13
		})
	}

	filterList = (query) => {
		const results = []

		this.state.geocodedMarkerPositions.forEach(row => {
			if (row.formatted_address.match(query)) {
				results.push(row)
			}
		})
		this.setState({ filteredMarkerPositions: results })
	}


	async componentDidMount() {
		this.getCurrentPosition()

		const { positionType } = mapConfigs.markers
		const positions = await this.context.mapApis.geocodePositions(mapConfigs.markers[`${positionType}Positions`], positionType)
		this.setState({
			geocodedMarkerPositions: positions,
			filteredMarkerPositions: positions
		})


	}

	render() {
		const { state } = this

		return (
			<React.Fragment>
				<div className="map-container">
					<Map center={state.mapCenter} zoom={state.mapZoom}>
						{state.geocodedMarkerPositions && 
							<Markers
								positions={state.filteredMarkerPositions}
								fitMap={this.fitMap}
							/>
						}
					</Map>
				</div>
				<ShowBox listData={state.filteredMarkerPositions} filterList={this.filterList} setMapCenter={this.setMapCenter} />
			</React.Fragment>
		)
	}
}

App.contextTypes = {
	mapApis: PropTypes.object
}

const NewApp = withGoogle(App)

ReactDom.render(<NewApp />, rootDom)




