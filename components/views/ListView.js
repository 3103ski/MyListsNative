import React, { Component, useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import List from '../List/List';
import Loading from '../generic/LoadingComponent';

import { connect } from 'react-redux';

import { fetchListItems } from '../../redux/actions/listActions';

const mapStateToProps = (state) => {
	return {
		isLoading: state.list.isLoadingListItems,
		listItems: state.list.listItems,
	};
};

const mapDispatchToProps = {
	fetchListItemsInit: (id) => fetchListItems(id),
	toggleCompletion: (id) => toggleCompletion(id),
};

const ListView = (props) => {
	const list = props.navigation.getParam('list');
	useEffect(() => {
		props.fetchListItemsInit(list.id);
	}, []);

	if (props.isLoading) {
		return <Loading />;
	} else {
		return (
			<View>
				<List isItems listData={props.listItems} navigation={props.navigation} />
			</View>
		);
	}
};

export default connect(mapStateToProps, mapDispatchToProps)(ListView);
