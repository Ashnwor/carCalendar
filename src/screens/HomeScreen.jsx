import { useFocusEffect } from '@react-navigation/native';
import React, { useState, useCallback } from 'react';
import { View, StyleSheet } from 'react-native';
import { Calendar, LocaleConfig } from 'react-native-calendars';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import calendarLocale from '../calendarLocale/';
import theme from '../theme';
import { storeData, getData } from '../utils';

LocaleConfig.locales['tr'] = calendarLocale;
LocaleConfig.defaultLocale = 'tr';

function HomeScreen({ navigation }) {
	navigation.setOptions({
		headerTitle: 'Takvim',
		headerStyle: {
			backgroundColor: theme.colors.primary,
		},
		headerTintColor: theme.colors.headerText,
	});

	const [dates, setDates] = useState({});

	useFocusEffect(
		useCallback(() => {
			const fetchData = async () => {
				const result = await getData('storage');
				const resultKeys = Object.keys(result);
				const emptyKeys = resultKeys.filter((value) => Object.keys(result[value]).length === 0);
				if (emptyKeys.length > 0) {
					emptyKeys.forEach((value) => delete result[value]);
					await storeData('storage', result);
				}
				setDates(result);
			};
			fetchData();
		}, []),
	);

	function OpenList(navigation, day) {
		navigation.navigate('List', { day });
	}

	const datesKeys = Object.keys(dates);
	const markedDates = Object.fromEntries(datesKeys.map((date) => [date, { selected: true }]));

	return (
		<View style={styles.container}>
			<Calendar
				style={styles.calendar}
				onDayPress={(day) => {
					OpenList(navigation, day);
				}}
				minDate={Date()}
				firstDay={1}
				renderArrow={(direction) => <Icon name={'chevron-' + direction} size={30} />}
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
