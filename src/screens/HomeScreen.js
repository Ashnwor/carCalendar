import React, { useEffect, useState, useCallback } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { Calendar } from 'react-native-calendars';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import theme from '../theme';
import { useFocusEffect } from '@react-navigation/native';

import { useDispatch, useSelector } from 'react-redux';
import { fetchDates, storeDates } from '../thunks';
import { storeData, getData } from '../utils';
import { cleanDates } from '../actions';

function HomeScreen({ navigation }) {
	navigation.setOptions({
		headerStyle: {
			backgroundColor: theme.colors.primary,
		},
		headerTintColor: theme.colors.headerText,
	});

	const [dates, setDates] = useState({});
	const dispatch = useDispatch();

	useFocusEffect(
		useCallback(() => {
			console.log('Homescreen');
			let result;
			getData('storage').then((value) => {
				result = value;
				setDates(result);
				console.log('result: ', result);
			});
			// dispatch(fetchDates());
			// dispatch(cleanDates());
			// dispatch(storeDates({}));
		}, [])
	);

	// const dates = useSelector((state) => state.dates);
	// console.log(dates);
	function OpenList(navigation, day) {
		console.log(day);
		navigation.navigate('List', { day });
	}

	const datesKeys = Object.keys(dates);
	const markedDates = Object.fromEntries(
		datesKeys.map((date) => [date, { selected: true }])
	);

	// console.log(markedDates);
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
