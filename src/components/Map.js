import React, { PureComponent } from 'react'
import propTypes from 'prop-types'

class Map extends PureComponent {
	state = {
		map: null
	}

	componentDidMount() {
		const { ControlPosition } =  window.google.maps
		const map = this.context.mapApis.Map('map', {
			center: this.props.center,
			zoom: this.props.zoom,
			mapTypeControl: true,
		  mapTypeControlOptions: {
		    style: window.google.maps.MapTypeControlStyle.HORIZONTAL_BAR,
		    position: window.isSmallScreen ? ControlPosition.BOTTOM : ControlPosition.TOP_RIGHT,
		  },
		  fullscreenControl: !window.isSmallScreen,
		  disableDoubleClickZoom: true

		})
		this.setState({map})
	}
	componentDidUpdate(prevProps) {
		const { center, zoom } = this.props
		if (prevProps.center !== center) {
			this.state.map.setCenter(center)
		}
		if (prevProps.zoom !== zoom) {
			this.state.map.setZoom(zoom)
		}
	}
	render() {
		const { props, state } = this

		const ChildrenWithProps = state.map ? React.Children.map(props.children, (child) => {
			return React.cloneElement(child, { map: state.map })
		}) : undefined

		return (
			<div id="map">
				{ChildrenWithProps}
			</div>
		)
	}
}

Map.contextTypes = {
	mapApis: propTypes.object
}

Map.defaultProps = {
	
}

Map.propTypes = {
	center: propTypes.shape({
		lat: propTypes.number.isRequired,
		lng: propTypes.number.isRequired
	}),
	zoom: propTypes.number
}

export default Map
