import { useFocusEffect } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React, { useCallback, useContext } from 'react';
import { View, StyleSheet } from 'react-native';
import { Calendar, LocaleConfig } from 'react-native-calendars';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import { RootStackParamList } from '../CalendarApp';
import calendarLocale from '../calendarLocale';
import { DataContext } from '../context/DataContext';
import theme from '../theme';
import { storeData, getData } from '../utils';

LocaleConfig.locales['tr'] = calendarLocale;
LocaleConfig.defaultLocale = 'tr';

type ProfileScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Calendar'>;

type Props = {
	navigation: ProfileScreenNavigationProp;
};

const HomeScreen: React.FC<Props> = ({ navigation }) => {
	navigation.setOptions({
		headerTitle: 'Takvim',
		headerStyle: {
			backgroundColor: theme.colors.primary,
		},
		headerTintColor: theme.colors.headerText,
	});

	// @ts-ignore
	const { _dates, _setDates } = useContext(DataContext);

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
				_setDates(result);
			};
			fetchData();
		}, []),
	);

	const OpenList = (navigation: ProfileScreenNavigationProp, day: Record<string, any>): void => {
		navigation.navigate('List', { day });
	};

	const datesKeys = Object.keys(_dates);
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
};

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
