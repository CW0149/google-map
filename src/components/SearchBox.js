import React, { Component } from 'react'
import propTypes from 'prop-types'
import _ from 'lodash'


class SearchBox extends Component {
	state = {
		inputValue: ''
	}

	filterList = () => {
		this.props.filterList(this.state.inputValue)
	}

	debouncedFilterList = _.debounce(this.filterList, 300)

	inputChange = (event) => {
		event.persist()
		this.setState({
			inputValue: event.target.value
		})
		this.debouncedFilterList()
	}
	componentDidMount() {
		this.input.focus()
	}
	render() {
		return (
			<div className="searchbox">
				<input
					type="text"
					value={this.state.inputValue}
					className="searchbox-input"
					onChange={this.inputChange}
					ref={(input) => {this.input = input}}
				/>
			</div>
		)
	}
}

SearchBox.defaultProps = {
	
}

SearchBox.propTypes = {
		filterList: propTypes.func
}

export default SearchBox
