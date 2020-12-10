import React, { Component, useState } from 'react';
import { FlatList, Modal, View, Text, StyleSheet, TouchableOpacity } from 'react-native';

import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faSquare, faCheckSquare } from '@fortawesome/free-solid-svg-icons';
import { connect } from 'react-redux';
import { toggleCompletion } from '../../redux/actions/listActions';

const mapDispatchToProps = {
	complete: (id) => toggleCompletion(id),
};

const mapStateToProps = (state) => {
	return {
		listItems: state.list.listItems,
	};
};

class CheckBox extends Component {
	constructor(props) {
		super(props);
		this.state = {
			isComplete: this.props.isComplete,
		};
	}

	toggleButton(itemId) {
		this.props.toggleCompletion(itemId);
		return this.setState({
			...this.state,
			isComplete: !this.state.isComplete,
		});
	}

	render() {
		let [iconSize] = [27];
		if (this.state.isComplete) {
			return <FontAwesomeIcon onPress={() => this.toggleButton(this.props.itemId)} mask={['far']} icon={faCheckSquare} size={iconSize} />;
		}
		return <FontAwesomeIcon onPress={() => this.toggleButton(this.props.itemId)} mask={['far']} icon={faSquare} size={iconSize} />;
	}
}

class List extends Component {
	render() {
		const { navigate } = this.props.navigation;
		const renderListItem = ({ item }) => {
			if (this.props.isItems) {
				return (
					<TouchableOpacity style={styles.listItemContainer}>
						<CheckBox itemId={item.id} isComplete={item.isComplete} toggleCompletion={(id) => this.props.complete(id)} />
						<Text style={styles.listItemText}>{item.title}</Text>
					</TouchableOpacity>
				);
			} else {
				return (
					<TouchableOpacity onPress={() => navigate('ListView', { listId: item.id, list: item })} style={styles.listItemContainer}>
						<Text style={styles.listItemText}>{item.title}</Text>
					</TouchableOpacity>
				);
			}
		};
		return (
			<>
				{this.props.isItems ? (
					<FlatList
						contentContainerStyle={styles.listContainer}
						renderItem={renderListItem}
						data={this.props.listItems.filter((item) => item.listId === this.props.listId)}
						keyExtractor={(item) => item.id.toString()}
					/>
				) : (
					<FlatList contentContainerStyle={styles.listContainer} renderItem={renderListItem} data={this.props.listData} keyExtractor={(item) => item.id.toString()} />
				)}
			</>
		);
	}
}

const styles = StyleSheet.create({
	listContainer: {
		justifyContent: 'center',
		marginTop: 10,
	},
	listItemContainer: {
		flexDirection: 'row',
		backgroundColor: '#e8e8e8',
		height: 50,
		marginHorizontal: 10,
		marginVertical: 4,
		flex: 1,
		paddingLeft: 20,
		alignItems: 'center',
		justifyContent: 'flex-start',
		borderRadius: 7,
		shadowColor: 'grey',
		shadowOffset: { width: 2, height: 3 },
		shadowOpacity: 0.5,
	},
	listItemText: {
		fontSize: 18,
		letterSpacing: 0.3,
		marginLeft: 10,
	},
	addBtnContainer: {
		justifyContent: 'center',
		alignItems: 'center',
		marginTop: 20,
	},
	addBtn: {
		color: 'grey',
	},
	modal: {
		justifyContent: 'center',
		margin: 20,
		flex: 1,
	},
});

export default connect(mapStateToProps, mapDispatchToProps)(List);
