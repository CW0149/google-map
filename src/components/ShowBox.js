import React, { Component } from 'react'
import propTypes from 'prop-types'
import Tooltip from '@material-ui/core/Tooltip'

import SearchBox from 'components/SearchBox'
import List from 'components/List'

const tooltips = {
	panelButton: {
		close: '收缩面板',
		open: '展开面板'
	},
	typeButton: {
		min: '展示面板',
		max: '收缩面板'
	},
	listButton: {
		show: '隐藏列表',
		hide: '显示列表'
	}
}

class ShowBox extends Component {
	static getDerivedStateFromProps(props, state) {
		if (!Array.isArray(props.listData)) {
			return { listData: [] }
		}

		return {
			listData: props.listData.map(row => {
				if (!(typeof row === 'object')) return {}
				return {
					name: row.formatted_address,
					location: row.geometry.location,
					place_id: row.place_id,
					short_name: row.address_components[0].short_name 
				}
			})
		}
	}
	state = {
		ifCurtainShow: true,
		hide: false,
		ifListShow: true
	}
	filterList = (...arg) => {
		if (window.isSmallScreen) {
			this.setState({
				ifListShow: true
			})
		}
		this.props.filterList(...arg)
	}
	panelButtonClicked() {
		this.setState((prevState) => {
			return {
				hide: !prevState.hide
			}
		})
	}
	typeButtonClicked() {
		this.setState((prevState) => {
			return {
				ifCurtainShow: !prevState.ifCurtainShow
			}
		})
	}
	listButtonClicked() {
		this.setState((prevState) => {
			return {
				ifListShow: !prevState.ifListShow
			}
		})
	}

	render() {
		const { state, props } = this

		return (
			<div id="showbox" className={`${state.hide ? 'hide' : 'show'} ${state.ifCurtainShow ? 'max' : 'min'}`}>
				{!window.isSmallScreen && (
					<div>
						<div className="showbox-curtain"></div>
						<Tooltip title={tooltips.panelButton[state.hide ? 'open' : 'close']} placement="right">
							<button className="panel-button" onClick={this.panelButtonClicked.bind(this)}>
									<span className="panel-button-inner">▼</span>
							</button>
						</Tooltip>
						<button className="type-button" onClick={this.typeButtonClicked.bind(this)}>{tooltips.typeButton[state.ifCurtainShow ? 'max' : 'min']}</button>
					</div>
				)}
				{window.isSmallScreen && <button className="list-button" onClick={this.listButtonClicked.bind(this)}>{tooltips.listButton[state.ifListShow ? 'show' : 'hide']}</button>}


				<div className="showbox-content">
					<SearchBox filterList={this.filterList} />
					{state.ifListShow && <List data={state.listData} placeClicked={props.setMapCenter} />}
				</div>
			</div>
		)
	}
}

ShowBox.defaultProps = {
	
}

ShowBox.propTypes = {
	setMapCenter: propTypes.func,
	filterList: propTypes.func,
	listData: propTypes.array
}

export default ShowBox
