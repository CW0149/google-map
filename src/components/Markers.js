import React, { PureComponent } from 'react'
import propTypes from 'prop-types'

import { getWikiSearch } from 'apis/wiki'

class Markers extends PureComponent {
	handleMarkerPositions(positions, map) {
		this.createMarkers(positions, map)
		this.props.fitMap(positions, map)
	}

	createMarkers(positions, map) {
		if (this.markers && this.markers.length) {
			this.markers.forEach(marker =>  marker.setMap(null))
		}

		this.markers = []
		for(let position of positions) {
			if (!(typeof position === 'object')) continue
			const { location } = position.geometry

			const short_name = position.address_components[0].short_name 

			const marker = this.context.mapApis.Marker({
				position: location,
				map: map,
				title: position.formatted_address,
				animation: window.google.maps.Animation.DROP
			})

			marker.addListener('click', async (event) => {
				if (!this[short_name]) {
					const result = await getWikiSearch({ search: short_name })
					this[short_name] = result
				}
				this.infoWindow.setContent(`<div>${this[short_name][2][0]}</div><div style="text-align: right">来自wiki api</div>`)
				this.infoWindow.open(this.props.map, marker)
			})

			this.markers.push(marker)
		}
	}

	componentDidMount() {
		this.infoWindow = this.context.mapApis.InfoWindow()
		this.handleMarkerPositions(this.props.positions, this.props.map)
	}
	componentDidUpdate(prevProps) {
		if (prevProps.positions !== this.props.positions) {
			this.handleMarkerPositions(this.props.positions, this.props.map)
		}
	}
	render() {
		return (
			<div></div>
		)
	}
}

Markers.contextTypes = {
	mapApis: propTypes.object,
	fitMap: propTypes.func
}

Markers.defaultProps = {
	
}

Markers.propTypes = {
	positions: propTypes.array.isRequired,
	map: propTypes.object
}

export default Markers
