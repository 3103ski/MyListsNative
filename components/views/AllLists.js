// React
import React, { Component } from 'react';
import { Text, View, Modal, Button, StyleSheet } from 'react-native';
import { Input } from 'react-native-elements';
import { connect } from 'react-redux';

// third party
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';

// actions
import { addList } from '../../redux/actions/listActions';

// components
import List from '../List/List';
import Loading from '../generic/LoadingComponent';

const mapStateToProps = (state) => {
	return {
		lists: state.list.lists,
		isLoading: state.list.isLoadingLists,
	};
};

const mapDispatchToProps = {
	addNewList: (list) => addList(list),
};

class AllLists extends Component {
	constructor(props) {
		super(props);
		this.state = {
			showModal: false,
			newListTitle: '',
			newListDescription: '',
		};
	}

	toggleModal = () => {
		this.setState({
			...this.state,
			showModal: !this.state.showModal,
			newListTitle: '',
			newListDescription: '',
		});
	};

	resetNewList = () => {
		this.setState({
			...this.state,
			newListTitle: '',
			newListDescription: '',
		});
	};

	handleAddList = () => {
		const newList = {
			title: this.state.newListTitle,
			description: this.state.newListDescription,
			creationDate: new Date(),
		};

		this.toggleModal();
		this.props.addNewList(newList);
	};

	render() {
		return this.props.isLoading ? (
			<Loading />
		) : (
			<View>
				<List navigation={this.props.navigation} listData={this.props.lists} />
				<View style={styles.addBtnContainer}>
					<FontAwesomeIcon style={styles.addBtn} onPress={() => this.toggleModal()} mask={['far']} icon={faPlusCircle} size={50} />
				</View>
				<Modal animationType={'slide'} transparent={false} visible={this.state.showModal} onRequestClose={() => toggleModal()}>
					<View style={styles.modal}>
						<Input placeholder='Title' value={this.state.newListTitle} onChangeText={(val) => this.setState({ ...this.state, newListTitle: val })} />
						<Input placeholder='Description' value={this.state.newListDescription} onChangeText={(val) => this.setState({ ...this.state, newListDescription: val })} />

						<View style={{ margin: 15 }}>
							<Button title='Add List' color='#5637DD' onPress={() => this.handleAddList()} />
						</View>
						<View style={{ margin: 15 }}>
							<Button
								title='Cancel'
								onPress={() => {
									this.toggleModal();
								}}
								color='#808080'
							/>
						</View>
					</View>
				</Modal>
			</View>
		);
	}
}

const styles = StyleSheet.create({
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

export default connect(mapStateToProps, mapDispatchToProps)(AllLists);
