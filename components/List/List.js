import React from 'react';
import { FlatList, View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faSquare, faCheckSquare } from '@fortawesome/free-solid-svg-icons';

const List = (props) => {
	const { navigate } = props.navigation;
	const renderListItem = ({ item }) => {
		if (props.isItems) {
			return (
				<View style={styles.listItemContainer}>
					<FontAwesomeIcon mask={['far']} icon={item.isComplete ? faCheckSquare : faSquare} size={27} />
					<Text style={styles.listItemText}>{item.title}</Text>
				</View>
			);
		} else {
			return (
				<TouchableOpacity onPress={() => navigate('ListView', { listId: item.id, list: item })} style={styles.listItemContainer}>
					<Text style={styles.listItemText}>{item.title}</Text>
				</TouchableOpacity>
			);
		}
	};
	return <FlatList contentContainerStyle={styles.listContainer} renderItem={renderListItem} data={props.listData} keyExtractor={(item) => item.id.toString()} />;
};

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
});

export default List;
