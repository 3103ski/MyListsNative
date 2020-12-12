// react
import React, { Component } from 'react';
import { Text, View, Modal, Button, StyleSheet } from 'react-native';
import { Input } from 'react-native-elements';
import { connect } from 'react-redux';

// third party
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';

// components
import Loading from '../generic/LoadingComponent';
import List from '../List/List';

// actions
import { addListItem } from '../../redux/actions/listActions';

const mapStateToProps = (state) => {
	return {
		isLoading: state.list.isLoadingListItems,
		listItems: state.list.listItems,
		refresh: state.list.refresh,
	};
};

const mapDispatchToProps = {
	addItem: (item) => addListItem(item),
};

class ListView extends Component {
	constructor(props) {
		super(props);
		this.state = {
			showModal: false,
			listId: null,
			items: this.props.listItems,
			newListItemTitle: '',
			newListItemDescription: '',
		};
	}

	toggleModal = () => {
		return this.setState({
			...this.state,
			showModal: !this.state.showModal,
			newListItemTitle: '',
			newListItemDescription: '',
		});
	};

	reloadList = (listId) => {
		return this.setState({
			...this.state,
			listId: listId,
			showModal: false,
		});
	};

	handleAddListItem = () => {
		const newItem = {
			listId: this.state.listId,
			title: this.state.newListItemTitle,
			description: this.state.newListItemDescription,
			isComplete: false,
		};
		this.reloadList(this.state.listId);
		this.props.addItem(newItem);
	};

	componentDidMount() {
		const list = this.props.navigation.getParam('list');
		this.reloadList(list.id);
	}

	render() {
		const list = this.props.navigation.getParam('list');
		return this.props.isLoading ? (
			<Loading />
		) : (
			<View>
				{/* LIST */}
				<List listItems={this.props.listItems} isItems navigation={this.props.navigation} listId={list.id} />

				{/* ADD BUTTON */}
				<View style={styles.addBtnContainer}>
					<FontAwesomeIcon onPress={() => this.toggleModal()} style={styles.addBtn} mask={['far']} icon={faPlusCircle} size={50} />
				</View>

				{/* MODAL */}
				<Modal animationType={'slide'} transparent={false} visible={this.state.showModal} onRequestClose={() => this.toggleModal()}>
					<View style={styles.modal}>
						<Input placeholder='Title' value={this.state.newListItemTitle} onChangeText={(val) => this.setState({ ...this.state, newListItemTitle: val })} />
						<Input placeholder='Description' value={this.state.newListItemDescription} onChangeText={(val) => this.setState({ ...this.state, newListItemDescription: val })} />

						<View style={{ margin: 15 }}>
							<Button title='Add Item' color='#5637DD' onPress={() => this.handleAddListItem()} />
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

export default connect(mapStateToProps, mapDispatchToProps)(ListView);
