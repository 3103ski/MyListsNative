import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faSquare, faCheckSquare } from '@fortawesome/free-solid-svg-icons';

import { toggleCompletion } from '../../redux/actions/listActions';

const mapStateToProps = (state) => {
	return {
		listItems: state.list.listItems,
		refresh: state.list.refresh,
	};
};

const mapDispatchToProps = {
	complete: (id) => toggleCompletion(id),
};

class CheckBox extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	render() {
		let [iconSize, icon] = [27, null];
		const item = this.props.listItems.filter((item) => item.id === this.props.itemId)[0];
		if (item.isComplete) {
			icon = faCheckSquare;
		} else {
			icon = faSquare;
		}
		return <FontAwesomeIcon onPress={() => this.props.complete(this.props.itemId)} mask={['far']} icon={icon} size={iconSize} />;
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(CheckBox);
