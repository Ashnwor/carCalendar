import DateTimePicker from '@react-native-community/datetimepicker';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { Notifications } from 'expo';
import moment from 'moment';
import React, { useState, useContext } from 'react';
import { View, StyleSheet, Platform } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { TextInputMask } from 'react-native-masked-text';
import { TextInput, FAB, List as ListItem, HelperText } from 'react-native-paper';

import { RootStackParamList } from '../CalendarApp';
import { DataContext } from '../context/DataContext';
import theme from '../theme';
import { storeData } from '../utils';

const { OS } = Platform;

type ProfileScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Details'>;
type ProfileScreenRouteProp = RouteProp<RootStackParamList, 'Details'>;

type Props = {
	navigation: ProfileScreenNavigationProp;
	route: ProfileScreenRouteProp;
};

const Details: React.FC<Props> = ({ route, navigation }) => {
	const { day, edit, editThis } = route.params;
	const selectedDate = day.dateString;
	navigation.setOptions({
		headerTitle: edit ? 'Düzenle' : 'Araç Ekle',
		headerStyle: {
			backgroundColor: theme.colors.primary,
		},
		headerTintColor: theme.colors.headerText,
	});

	const [details, setDetails] = useState({
		licensePlate: !edit ? '' : editThis?.licensePlate,
		brand: !edit ? '' : editThis?.brand,
		model: !edit ? '' : editThis?.model,
		clientNameSurname: !edit ? '' : editThis?.clientNameSurname,
		clientPhone: !edit ? '' : editThis?.clientPhone,
		referance: !edit ? '' : editThis?.referance,
		givenDate: !edit ? moment() : editThis?.givenDate,
	});

	const [errors, setErrors] = useState({
		licensePlate: false,
		brand: false,
		model: false,
		clientNameSurname: false,
		clientPhone: false,
	});

	const [show, setShow] = useState(false);

	const onChange = (_event: any, selectedgivenDate: Date | undefined) => {
		const currentDate = selectedgivenDate || details.givenDate;
		setShow(OS === 'ios');
		setDetails({ ...details, givenDate: currentDate });
	};

	const showDatepicker = () => {
		setShow(true);
	};

	// @ts-ignore
	const { _dates, _setDates } = useContext(DataContext);

	const save = async () => {
		console.log(details);
		console.log(errors);
		const {
			licensePlate,
			brand,
			model,
			clientNameSurname,
			clientPhone,
			referance,
			givenDate,
		} = details;

		if (edit) delete _dates[selectedDate][editThis?.licensePlate];
		if (edit && OS !== 'web')
			Notifications.cancelScheduledNotificationAsync(editThis?.notificationToken);

		if (licensePlate && brand && model && clientNameSurname && clientPhone) {
			if (!_dates[selectedDate]) _dates[selectedDate] = {};
			_dates[selectedDate][licensePlate] = {
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
				_dates[selectedDate][licensePlate] = {
					..._dates[selectedDate][licensePlate],
					notificationToken: token,
				};
			};

			if (moment().valueOf() < schedulingOptions.time && OS !== 'web') await registerNotification();

			_setDates(_dates);
			await storeData('storage', _dates);
			navigation.goBack();
		} else {
			setErrors({
				licensePlate: !licensePlate,
				brand: !brand,
				model: !model,
				clientNameSurname: !clientNameSurname,
				clientPhone: !clientPhone,
			});
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
					value={details.licensePlate}
					onChangeText={(text) => {
						setDetails({ ...details, licensePlate: text.toUpperCase().replace(' ', '-') });
						setErrors({ ...errors, licensePlate: false });
					}}
				/>
				{errors.licensePlate && <FieldMandatory />}

				<TextInput
					style={styles.input}
					label="Marka"
					value={details.brand}
					onChangeText={(text) => {
						setDetails({ ...details, brand: text });
						setErrors({ ...errors, brand: false });
					}}
				/>
				{errors.brand && <FieldMandatory />}

				<TextInput
					style={styles.input}
					label="Model"
					value={details.model}
					onChangeText={(text) => {
						setDetails({ ...details, model: text });
						setErrors({ ...errors, model: false });
					}}
				/>
				{errors.model && <FieldMandatory />}
				<TextInput
					style={styles.input}
					label="Müşteri Ad Soyad"
					value={details.clientNameSurname}
					onChangeText={(text) => {
						setDetails({ ...details, clientNameSurname: text });
						setErrors({ ...errors, clientNameSurname: false });
					}}
				/>
				{errors.clientNameSurname && <FieldMandatory />}
				<TextInputMask
					// @ts-ignore
					label="Telefon"
					placeholder="XXXX XXX XX XX"
					keyboardType="numeric"
					type="custom"
					options={{
						mask: '9999 999 99 99',
					}}
					customTextInput={TextInput}
					value={details.clientPhone}
					onChangeText={(text) => {
						setDetails({ ...details, clientPhone: text });
						setErrors({ ...errors, clientPhone: false });
					}}
					style={styles.input}
				/>
				{errors.clientPhone && <FieldMandatory />}
				<TextInput
					style={styles.input}
					label="Referans (isteğe bağlı)"
					value={details.referance}
					onChangeText={(text) => setDetails({ ...details, referance: text })}
				/>
				<ListItem.Item
					style={styles.input}
					title="Verilen tarih"
					description={moment(details.givenDate).format('D MMMM YYYY')}
					left={(props) => <ListItem.Icon {...props} icon="calendar" />}
					onPress={() => showDatepicker()}
				/>
				{show && (
					<DateTimePicker
						testID="dateTimePicker"
						timeZoneOffsetInMinutes={0}
						value={details.givenDate}
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
};

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
