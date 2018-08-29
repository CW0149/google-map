import React from 'react';
import propTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import Divider from '@material-ui/core/Divider'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import Tooltip from '@material-ui/core/Tooltip'


const styles = theme => ({
  root: {
    borderRadius: '2px',
    padding: '0'
  },
  ul: {
  	padding: '0',
  	maxHeight: window.isSmallScreen ? '200px' : '400px',
  	overflow: 'auto'
  }
})


function PosList(props) {
	const { classes } = props

	return (
		<Paper className={`${classes.root} list`}>
			<List className={`${classes.ul}`}>
				{
					props.data.map((row, index) => {
						return (
							<React.Fragment key={row.place_id || index}>
								<ListItem button className={`${classes.li} list-item`} onClick={props.placeClicked.bind(props, row)}>
									<Tooltip title={row.name || 'unknow'}>
										<Typography variant="body2" gutterBottom align="center" noWrap>
										   {row.name}
										 </Typography>
									</Tooltip>
								</ListItem>
								<Divider />
							</React.Fragment>
						)
					})
				}
			</List>
		</Paper>
	)
}

PosList.defaultProps = {
	data: [
		{
			name: 'test',
			location: { lat: 22, lng: 117 },
			place_id: 'ChIJcy9ZI93UxjYRgvETXtLw5oY'
		},
		{
			name: 'test',
			location: { lat: 22, lng: 117 },
			place_id: 'hIJcy9ZI93UxjYRgvETXtLw5oY'
		},
	]
}

PosList.propTypes = {
	data: propTypes.array,
	placeClicked: propTypes.func
}

export default withStyles(styles)(PosList)
