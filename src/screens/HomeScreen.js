import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Calendar } from 'react-native-calendars';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import theme from '../theme';

function HomeScreen({ navigation }) {
	navigation.setOptions({
		headerStyle: {
			backgroundColor: theme.colors.primary,
		},
		headerTintColor: theme.colors.headerText,
	});

	function OpenList(navigation, day) {
		console.log(day);
		navigation.navigate('List', day);
	}

	//	const datesKeys = Object.keys(dates);
	//	const markedDates = Object.fromEntries(
	//		datesKeys.map((date) => [date, { selected: true }])
	//	);

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
				//	markedDates={markedDates}
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
		height: '100%',
	},
});
export default HomeScreen;
