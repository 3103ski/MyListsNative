// React
import React, { Component } from 'react';
import { View, Platform, StyleSheet, Text, ScrollView, Image } from 'react-native';
import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';
import { Icon } from 'react-native-elements';
import { createDrawerNavigator, DrawerItems } from 'react-navigation-drawer';
import SafeAreaView from 'react-native-safe-area-view';
import { connect } from 'react-redux';

// Actions

// View Components
import AllLists from './views/AllLists';
import ListView from './views/ListView';

// Components

const mapDispatchToProps = {};

const AllListsNavigator = createStackNavigator(
	{
		AllLists: {
			screen: AllLists,
			navigationOptions: ({ navigation }) => ({
				headerLeft: <Icon name='list' type='font-awesome' onPress={() => navigation.toggleDrawer()} />,
				headerTitle: 'All Lists',
			}),
		},
		ListView: {
			screen: ListView,
			navigationOptions: ({ navigation }) => ({
				initialRouteName: 'All Lists',
			}),
		},
	},
	{
		defaultNavigationOptions: ({ navigation }) => ({
			headerStyle: {
				backgroundColor: 'grey',
			},
			headerTintColor: '#fff',
			headerTitleStyle: {
				color: '#fff',
			},
		}),
	}
);

const CustomDrawerContentComponent = (props) => {
	return (
		<ScrollView>
			<SafeAreaView style={styles.container} forceInset={{ top: 'always', horizontal: 'never' }}>
				<View style={styles.drawerHeader}>
					<View style={{ flex: 2 }}>
						<Text style={styles.drawerHeaderText}>My Lists App</Text>
					</View>
				</View>
				<DrawerItems {...props} />
			</SafeAreaView>
		</ScrollView>
	);
};

const MainNavigator = createDrawerNavigator(
	{
		Lists: {
			screen: AllListsNavigator,
			navigationOptions: {
				drawerIcon: ({ tintColor }) => <Icon name='clipboard' type='font-awesome' size={24} color={tintColor} />,
			},
		},
	},
	{
		drawerBackgroundColor: '#CEC8FF',
		contentComponent: CustomDrawerContentComponent,
	}
);

const AppNavigator = createAppContainer(MainNavigator);

class Main extends Component {
	componentDidMount() {}
	render() {
		return (
			<View
				style={{
					flex: 1,
					paddingTop: Platform.OS === 'ios' ? 0 : Expo.Constants.statusBarHeight,
				}}>
				<AppNavigator />
			</View>
		);
	}
}

const styles = StyleSheet.create({
	stackIcon: {
		marginLeft: 10,
		color: '#fff',
		fontSize: 24,
	},
	container: {
		flex: 1,
	},
	drawerHeader: {
		backgroundColor: 'black',
		height: 140,
		alignItems: 'center',
		justifyContent: 'center',
		flex: 1,
		flexDirection: 'row',
	},
	drawerHeaderText: {
		color: '#fff',
		fontSize: 24,
		fontWeight: 'bold',
	},
	drawerImage: {
		margin: 10,
		height: 60,
		width: 60,
	},
});

export default connect(null, mapDispatchToProps)(Main);
