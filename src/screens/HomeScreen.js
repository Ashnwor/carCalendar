import React, { useState, useCallback } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { Button } from 'react-native-paper';
import { Calendar } from 'react-native-calendars';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import theme from '../theme';
import { useFocusEffect } from '@react-navigation/native';
// import { Notifications } from 'expo';
import { storeData, getData } from '../utils';

// const localNotification = {
// 	title: 'TEST',
// 	body: 'test',
// 	priority: 'max',
// 	vibrate: [0, 250, 250, 250],
// 	color: 'red',
// 	data: { test: 'Test' },
// };

// const schedulingOptions = {
// 	repeat: 'minute',
// };

// Notifications.cancelAllScheduledNotificationsAsync();
// Notifications.dismissAllNotificationsAsync();
// Notifications.scheduleLocalNotificationAsync(
// 	localNotification,
// 	schedulingOptions
// );

function HomeScreen({ navigation }) {
	navigation.setOptions({
		headerStyle: {
			backgroundColor: theme.colors.primary,
		},
		headerTintColor: theme.colors.headerText,
	});

	const [dates, setDates] = useState({});

	useFocusEffect(
		useCallback(() => {
			async function fetchData() {
				const result = await getData('storage');
				const resultKeys = Object.keys(result);
				const emptyKeys = resultKeys.filter(
					(value) => Object.keys(result[value]).length === 0
				);
				if (emptyKeys.length > 0) {
					emptyKeys.forEach((value) => delete result[value]);
					await storeData('storage', result);
				}

				console.log('empty:', emptyKeys);
				setDates(result);
				console.log('result: ', result);
			}
			console.log('Homescreen');
			fetchData();
		}, [])
	);

	function OpenList(navigation, day) {
		console.log(day);
		navigation.navigate('List', { day });
	}

	const datesKeys = Object.keys(dates);
	const markedDates = Object.fromEntries(
		datesKeys.map((date) => [date, { selected: true }])
	);

	return (
		<View style={styles.container}>
			<Calendar
				style={styles.calendar}
				onDayPress={(day) => {
					OpenList(navigation, day);
				}}
				minDate={Date()}
				firstDay={1}
				renderArrow={(direction) => (
					<Icon name={'chevron-' + direction} size={30} />
				)}
				markedDates={markedDates}
			/>
			{/* <Button
				mode="contained"
				onPress={() =>
					Notifications.presentLocalNotificationAsync(localNotification)
				}
			>
				Notification Test
			</Button> */}
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
	},

	calendar: {
		width: '100%',
		height: '90%',
	},
});
export default HomeScreen;
