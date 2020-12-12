import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Input } from 'react-native-elements';
import { connect } from 'react-redux';

import { toggleCompletion, updateItemDetails, refreshList } from '../../redux/actions/listActions';

const mapStateToProps = (state) => {
	return {
		listItems: state.list.listItems,
	};
};

const mapDispatchToProps = {
	update: (updatedItem) => updateItemDetails(updatedItem),
	complete: (id) => toggleCompletion(id),
	refresh: () => refreshList(),
};

class ListItemView extends Component {
	constructor(props) {
		super(props);
		this.state = {
			isEditingTitle: false,
			isEditingDescription: false,
		};
	}
	componentDidMount() {
		const item = this.props.listItems.filter((item) => item.id === this.props.navigation.getParam('listItem').id)[0];
		this.setState({
			description: item.description,
			id: item.id,
			isComplete: item.isComplete,
			listId: item.listId,
			title: item.title,
			isEditingTitle: false,
			isEditingDescription: false,
		});
	}

	updateCurrItem(item, newVal) {
		this.setState({
			...this.state,
			[item]: newVal,
		});
	}

	handleSubmitUpdate() {
		this.props.update(this.state);
	}

	toggleCompletion(id) {
		this.props.complete(id);
		return this.setState({
			...this.state,
			isComplete: !this.state.isComplete,
		});
	}

	render() {
		return (
			<View>
				{!this.state.isEditingTitle ? (
					<View style={styles.titleContainer}>
						<Text style={styles.title}>{this.state.title}</Text>
						<Text style={styles.titleIcon} onPress={() => this.updateCurrItem('isEditingTitle', true)}>
							EDIT
						</Text>
					</View>
				) : (
					<View style={styles.titleContainer}>
						<Input style={styles.title} placeholder={this.state.title} value={this.state.title} onChangeText={(val) => this.updateCurrItem('title', val)} />
						<Text
							style={styles.titleIcon}
							onPress={() => {
								this.updateCurrItem('isEditingTitle', false);
								return this.handleSubmitUpdate();
							}}>
							SAVE
						</Text>
					</View>
				)}
				<View style={styles.descContainer}>
					<Text style={styles.description}>Details: {this.state.description}</Text>
					<Text
						style={styles.completeText}
						onPress={() => {
							return this.toggleCompletion(this.state.id);
						}}>
						{this.state.isComplete ? 'Item is complete' : 'Not done yet'}
					</Text>
				</View>
			</View>
		);
	}
}

const styles = {
	titleContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		paddingHorizontal: 30,
		height: 50,
		marginVertical: 10,
	},
	titleIcon: {
		marginLeft: 'auto',
	},
	title: {
		fontSize: 20,
		textTransform: 'capitalize',
	},
	descContainer: {
		padding: 40,
	},
	description: {
		marginBottom: 20,
		padding: 10,
		backgroundColor: 'rgba(40,40,40,0.2)',
	},
};

export default connect(mapStateToProps, mapDispatchToProps)(ListItemView);
