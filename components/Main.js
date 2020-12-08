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
import Home from './views/Home';

// Components

const mapDispatchToProps = {};

const HomeNavigator = createStackNavigator(
	{
		Home: { screen: Home },
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
			headerLeft: <Icon name='home' type='font-awesome' iconStyle={styles.stackIcon} onPress={() => navigation.toggleDrawer()} />,
		}),
	}
);

const CustomDrawerContentComponent = (props) => {
	return (
		<ScrollView>
			<SafeAreaView style={styles.container} forceInset={{ top: 'always', horizontal: 'never' }}>
				<View style={styles.drawerHeader}>
					<View style={{ flex: 2 }}>
						<Text style={styles.drawerHeaderText}>Nav</Text>
					</View>
				</View>
				<DrawerItems {...props} />
			</SafeAreaView>
		</ScrollView>
	);
};

const MainNavigator = createDrawerNavigator(
	{
		Home: {
			screen: HomeNavigator,
			navigationOptions: {
				drawerIcon: ({ tintColor }) => <Icon name='home' type='font-awesome' size={24} color={tintColor} />,
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
