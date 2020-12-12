// React
import React, { Component, useState } from 'react';
import { FlatList, Modal, View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';

// Components
import CheckBox from '../generic/CheckBox';

// actions
import { toggleCompletion } from '../../redux/actions/listActions';

const mapDispatchToProps = {
	// complete: (id) => toggleCompletion(id),
};

const mapStateToProps = (state) => {
	return {
		listItems: state.list.listItems,
		refresh: state.list.refresh,
	};
};

class List extends Component {
	constructor(props) {
		super(props);
		this.state = {
			items: this.props.listItems,
		};
	}
	render() {
		const { navigate } = this.props.navigation;
		const renderListItem = ({ item, index }) => {
			if (item.listId === this.props.listId) {
				if (this.props.isItems) {
					return (
						<TouchableOpacity onPress={() => navigate('ListItemView', { listId: item.id, listItem: item })} style={styles.listItemContainer}>
							<CheckBox item={item} itemId={item.id} index={index} />
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
			}
		};

		return (
			<>
				{this.props.isItems ? (
					<FlatList contentContainerStyle={styles.listContainer} data={this.props.listItems} renderItem={renderListItem} keyExtractor={(item, index) => item.id.toString()} />
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
