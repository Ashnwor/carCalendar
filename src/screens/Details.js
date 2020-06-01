import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { TextInput, FAB, List as ListItem, Text } from 'react-native-paper';
import { Button, Paragraph, Dialog, Portal } from 'react-native-paper';
import DateTimePicker from '@react-native-community/datetimepicker';
import theme from '../theme';
import { storeDates, addDate } from '../thunks';
import { storeData, getData } from '../utils';

function Details({ route, navigation }) {
	const day = route.params;
	navigation.setOptions({
		headerStyle: {
			backgroundColor: theme.colors.primary,
		},
		headerTintColor: theme.colors.headerText,
	});

	const [retrievalDate, setRetrievalDate] = useState(new Date());
	const [show, setShow] = useState(false);
	const [visible, setVisible] = useState(false);

	const [licensePlate, setLicensePlate] = useState();
	const [brand, setBrand] = useState();
	const [model, setModel] = useState();

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
		const currentDate = selectedDate || retrievalDate;
		setShow(Platform.OS === 'ios');
		setRetrievalDate(currentDate);
	};

	const showDatepicker = () => {
		setShow(true);
	};

	let dates;
	getData('storage').then((data) => (dates = data));

	const save = () => {
		console.log('TESTING');
		if (licensePlate && brand && model) {
			if (dates[day.dateString]) {
				dates[day.dateString][licensePlate] = {
					brand,
					model,
					retrievalDate,
				};
			} else {
				dates[day.dateString] = {};
				dates[day.dateString][licensePlate] = {
					brand,
					model,
					retrievalDate,
				};
			}
		} else {
			setVisible(true);
		}

		console.log(dates);
		storeData('storage', dates).then(() => {
			getData('storage').then((data) => console.log('data:', data));
		});
	};

	return (
		<View style={styles.container}>
			<TextInput
				label="Plaka"
				onChange={(event) => setLicensePlate(event.nativeEvent.text)}
				//				defaultValue={licensePlate}
			/>
			<TextInput
				label="Marka"
				onChange={(event) => setBrand(event.nativeEvent.text)}
				//				defaultValue={brand}
			/>
			<TextInput
				label="Model"
				onChange={(event) => setModel(event.nativeEvent.text)}
				//				defaultValue={model}
			/>
			<ListItem.Item
				title="Alım Tarihi"
				description={dateToString(retrievalDate).normal}
				left={(props) => <ListItem.Icon {...props} icon="calendar" />}
				onPress={() => showDatepicker()}
			/>

			{show && (
				<DateTimePicker
					testID="dateTimePicker"
					timeZoneOffsetInMinutes={0}
					value={retrievalDate}
					mode={'date'}
					is24Hour={true}
					display="default"
					onChange={onChange}
					maximumDate={new Date()}
				/>
			)}

			<Portal>
				<Dialog visible={visible} onDismiss={() => setVisible(false)}>
					<Dialog.Title>Uyarı</Dialog.Title>
					<Dialog.Content>
						{!licensePlate ? <Text>Plaka bilgisi girilmemiş</Text> : null}
						{!brand ? <Text>Marka bilgisi girilmemiş</Text> : null}
						{!model ? <Text>Model bilgisi girilmemiş</Text> : null}
					</Dialog.Content>
					<Dialog.Actions>
						<Button onPress={() => setVisible(false)}>Done</Button>
					</Dialog.Actions>
				</Dialog>
			</Portal>
			<FAB
				style={styles.fab}
				icon="content-save"
				label="Kaydet"
				onPress={() => save()}
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
