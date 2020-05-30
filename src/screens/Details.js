import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { TextInput, FAB, List as ListItem } from 'react-native-paper';
import DateTimePicker from '@react-native-community/datetimepicker';
import theme from '../theme';

function Details({ route, navigation }) {
	const day = route.params;
	navigation.setOptions({
		headerStyle: {
			backgroundColor: theme.colors.primary,
		},
		headerTintColor: theme.colors.headerText,
	});

	const [date, setDate] = useState(new Date());
	const [show, setShow] = useState(false);

	const dateToString = (date) => {
		let day;
		let month;
		let year = date.getFullYear();
		date.getDate().toString().length === 1
			? (day = '0' + date.getDate().toString())
			: (day = date.getDate().toString());
		date.getMonth().toString().length === 1
			? (month = '0' + (date.getMonth() + 1).toString())
			: (month = (date.getMonth() + 1).toString());
		return {
			normal: `${day}-${month}-${year}`,
			reverse: `${year}-${month}-${day}`,
		};
	};

	const onChange = (event, selectedDate) => {
		const currentDate = selectedDate || date;
		setShow(Platform.OS === 'ios');
		setDate(currentDate);
	};

	const showDatepicker = () => {
		setShow(true);
	};

	return (
		<View style={styles.container}>
			<TextInput
				label="Plaka"
				onChange={(event) => console.log(event.nativeEvent.text)}
				//				defaultValue={licensePlate}
			/>
			<TextInput
				label="Marka"
				onChange={(event) => console.log(event.nativeEvent.text)}
				//				defaultValue={brand}
			/>
			<TextInput
				label="Model"
				onChange={(event) => console.log(event.nativeEvent.text)}
				//				defaultValue={model}
			/>
			<ListItem.Item
				title="Alım Tarihi"
				description={dateToString(date).normal}
				left={(props) => <ListItem.Icon {...props} icon="calendar" />}
				onPress={() => showDatepicker()}
			/>

			<FAB
				style={styles.fab}
				icon="content-save"
				label="Kaydet"
				onPress={() => console.log('Save button pressed')}
			/>

			{show && (
				<DateTimePicker
					testID="dateTimePicker"
					timeZoneOffsetInMinutes={0}
					value={date}
					mode={'date'}
					is24Hour={true}
					display="default"
					onChange={onChange}
					maximumDate={new Date()}
				/>
			)}
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

	saveBtn: {
		width: '30%',
		alignSelf: 'center',
		marginTop: 50,
	},

	fab: {
		position: 'absolute',
		margin: 16,
		right: 0,
		bottom: 0,
	},
});

export default Details;
