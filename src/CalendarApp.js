import 'react-native-gesture-handler';
import React from 'react';
import { StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import HomeScreen from './screens/HomeScreen';
import List from './screens/List';
import Details from './screens/Details';

const Stack = createStackNavigator();

export default function CalendarApp() {
	return (
		<NavigationContainer>
			<StatusBar
				translucent
				backgroundColor="rgba(0,0,0,0.2)"
				barStyle="light-content"
			/>
			<Stack.Navigator>
				<Stack.Screen name="Calendar" component={HomeScreen} />
				<Stack.Screen name="List" component={List} />
				<Stack.Screen name="Details" component={Details} />
			</Stack.Navigator>
		</NavigationContainer>
	);
}
