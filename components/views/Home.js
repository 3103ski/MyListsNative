import React, { Component } from 'react';
import { Text, View } from 'react-native';

import List from '../List/List';

class Home extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}
	render() {
		return (
			<View>
				<List />
			</View>
		);
	}
}

export default Home;
