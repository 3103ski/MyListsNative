import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { connect } from 'react-redux';
import { fetchLists } from '../../redux/actions/listActions';

import List from '../List/List';

const mapStateToProps = (state) => {
	return {
		lists: state.list.lists,
	};
};

const mapDispatchToProps = {
	fetchLists: () => fetchLists(),
};
class AllLists extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	componentDidMount() {
		this.props.fetchLists();
	}
	render() {
		return (
			<View>
				<List navigation={this.props.navigation} listData={this.props.lists} />
			</View>
		);
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(AllLists);
