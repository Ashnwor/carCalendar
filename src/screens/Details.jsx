import DateTimePicker from '@react-native-community/datetimepicker';
import { useFocusEffect } from '@react-navigation/native';
import { Notifications } from 'expo';
import moment from 'moment';
import React, { useState, useCallback } from 'react';
import { View, StyleSheet, Platform } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { TextInputMask } from 'react-native-masked-text';
import { TextInput, FAB, List as ListItem, HelperText } from 'react-native-paper';

import theme from '../theme';
import { storeData, getData } from '../utils';

const { OS } = Platform;

function Details({ route, navigation }) {
	const { day, edit, editThis } = route.params;
	const selectedDate = day.dateString;
	navigation.setOptions({
		headerTitle: edit ? 'Düzenle' : 'Araç Ekle',
		headerStyle: {
			backgroundColor: theme.colors.primary,
		},
		headerTintColor: theme.colors.headerText,
	});

	const [givenDate, setGivenDate] = !edit ? useState(new Date()) : useState(editThis.givenDate);
	const [show, setShow] = useState(false);

	const [licensePlate, setLicensePlate] = !edit ? useState('') : useState(editThis.licensePlate);
	const [errLicensePlate, setErrLicensePlate] = useState(false);

	const [brand, setBrand] = !edit ? useState('') : useState(editThis.brand);
	const [errBrand, setErrBrand] = useState(false);

	const [model, setModel] = !edit ? useState('') : useState(editThis.model);
	const [errModel, setErrModel] = useState(false);

	const [clientNameSurname, setClientNameSurname] = !edit
		? useState('')
		: useState(editThis.clientNameSurname);
	const [errClientNameSurname, setErrClientNameSurname] = useState(false);

	const [clientPhone, setClientPhone] = !edit ? useState('') : useState(editThis.clientPhone);
	const [errClientPhone, setErrClientPhone] = useState(false);

	const [referance, setReferance] = !edit ? useState('') : useState(editThis.referance);

	const onChange = (event, selectedgivenDate) => {
		const currentDate = selectedgivenDate || givenDate;
		setShow(OS === 'ios');
		setGivenDate(currentDate);
	};

	const showDatepicker = () => {
		setShow(true);
	};

	const [dates, setDates] = useState({});

	useFocusEffect(
		useCallback(() => {
			getData('storage').then((result) => setDates(result));
		}, []),
	);

	const save = async () => {
		console.log('TESTING');
		if (edit) delete dates[selectedDate][editThis.licensePlate];
		if (edit && OS !== 'web')
			Notifications.cancelScheduledNotificationAsync(editThis.notificationToken);

		if (licensePlate && brand && model && clientNameSurname && clientPhone) {
			if (!dates[selectedDate]) dates[selectedDate] = {};
			dates[selectedDate][licensePlate] = {
				brand,
				model,
				clientNameSurname,
				clientPhone,
				referance,
				givenDate,
			};

			const localNotification = {
				title: 'Yarın teslim alınacak araç:',
				body: `${licensePlate} ${brand} ${model}`,
				priority: 'max',
				vibrate: true,
				color: 'red',
			};

			const schedulingOptions = {
				time: moment(selectedDate, 'YYYY-MM-DD')
					.subtract(1, 'day')
					.hour(21)
					.minute(0)
					.second(0)
					.valueOf(),
			};

			const registerNotification = async () => {
				const token = await Notifications.scheduleLocalNotificationAsync(
					localNotification,
					schedulingOptions,
				);
				console.log('token:', token);
				dates[selectedDate][licensePlate] = {
					...dates[selectedDate][licensePlate],
					notificationToken: token,
				};
			};

			if (moment().valueOf() < schedulingOptions.time && OS !== 'web') await registerNotification();

			await storeData('storage', dates);
			navigation.goBack();
		} else {
			if (!licensePlate) setErrLicensePlate(true);
			if (!brand) setErrBrand(true);
			if (!model) setErrModel(true);
			if (!clientNameSurname) setErrClientNameSurname(true);
			if (!clientPhone) setErrClientPhone(true);
		}
	};

	function FieldMandatory() {
		return <HelperText type="error">*Bu alan zorunlu</HelperText>;
	}

	return (
		<View style={styles.container}>
			<KeyboardAwareScrollView style={styles.container}>
				<TextInput
					style={styles.input}
					label="Plaka"
					value={licensePlate}
					onChangeText={(text) => {
						setLicensePlate(text.toUpperCase().replace(' ', '-'));
						setErrLicensePlate(false);
					}}
				/>
				{errLicensePlate && <FieldMandatory />}
				<TextInput
					style={styles.input}
					label="Marka"
					value={brand}
					onChangeText={(text) => {
						setBrand(text);
						setErrBrand(false);
					}}
				/>
				{errBrand && <FieldMandatory />}
				<TextInput
					style={styles.input}
					label="Model"
					value={model}
					onChangeText={(text) => {
						setModel(text);
						setErrModel(false);
					}}
				/>
				{errModel && <FieldMandatory />}
				<TextInput
					style={styles.input}
					label="Müşteri Ad Soyad"
					value={clientNameSurname}
					onChangeText={(text) => {
						setClientNameSurname(text);
						setErrClientNameSurname(false);
					}}
				/>
				{errClientNameSurname && <FieldMandatory />}
				<TextInputMask
					label="Telefon"
					placeholder="XXXX XXX XX XX"
					keyboardType="numeric"
					type="custom"
					options={{
						mask: '9999 999 99 99',
					}}
					customTextInput={TextInput}
					value={clientPhone}
					onChangeText={(text) => {
						setClientPhone(text);
						setErrClientPhone(false);
					}}
					style={styles.input}
				/>
				{errClientPhone && <FieldMandatory />}

				<TextInput
					style={styles.input}
					label="Referans (isteğe bağlı)"
					value={referance}
					onChangeText={(text) => setReferance(text)}
				/>
				<ListItem.Item
					style={styles.input}
					title="Verilen tarih"
					description={moment(givenDate).format('D MMMM YYYY')}
					left={(props) => <ListItem.Icon {...props} icon="calendar" />}
					onPress={() => showDatepicker()}
				/>
				{show && (
					<DateTimePicker
						testID="dateTimePicker"
						timeZoneOffsetInMinutes={0}
						value={givenDate}
						mode={'date'}
						is24Hour={true}
						display="default"
						onChange={onChange}
					/>
				)}
			</KeyboardAwareScrollView>
			<FAB style={styles.fab} icon="content-save" label="Kaydet" onPress={() => save()} />
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
	},

	input: { margin: 5 },

	fab: {
		position: 'absolute',
		margin: 16,
		right: 0,
		bottom: 0,
	},
});

export default Details;
