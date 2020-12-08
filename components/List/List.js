import React from 'react';
import { FlatList, View, Text, StyleSheet } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faSquare, faCheckSquare } from '@fortawesome/free-solid-svg-icons';

const DUMDATA = [
	{ title: 'something', description: 'a bunch of details here', isComplete: false, id: 0 },
	{ title: 'something', description: 'a bunch of details here', isComplete: true, id: 1 },
	{ title: 'something', description: 'a bunch of details here', isComplete: false, id: 2 },
	{ title: 'something', description: 'a bunch of details here', isComplete: true, id: 3 },
	{ title: 'something', description: 'a bunch of details here', isComplete: false, id: 4 },
];

const List = (props) => {
	const renderListItem = ({ item }) => {
		console.log(item);
		return (
			<View style={styles.listItemContainer}>
				<FontAwesomeIcon icon={item.isComplete ? faCheckSquare : faSquare} size={27} />
				<Text style={styles.listItemText}>{item.title}</Text>
			</View>
		);
	};
	return <FlatList contentContainerStyle={styles.listContainer} renderItem={renderListItem} data={DUMDATA} keyExtractor={(item) => item.id.toString()} />;
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
