import moment from 'moment';
import React from 'react';
import { List, Button, Colors } from 'react-native-paper';
import call from 'react-native-phone-call';
import 'moment/locale/tr';

export default function ListAccordion(props) {
	console.log(props.details);
	const { navigation, day } = props;
	const { setContentToDelete, setDialogVisible } = props.functions;
	const licensePlate = props.licensePlateName;
	const {
		brand,
		model,
		clientNameSurname,
		clientPhone,
		referance,
		givenDate,
		notificationToken,
	} = props.details;
	return (
		<List.Accordion
			title={licensePlate}
			key={licensePlate}
			left={(props) => <List.Icon {...props} icon="car" />}
		>
			<List.Item
				title={`Marka: ${brand}`}
				key={`${licensePlate}-${brand}`}
				left={(props) => <List.Icon {...props} icon="tag-multiple" />}
			/>
			<List.Item
				title={`Model: ${model}`}
				key={`${licensePlate}-${model}`}
				left={(props) => <List.Icon {...props} icon="tag" />}
			/>
			<List.Item
				title={`Müşteri: ${clientNameSurname}`}
				key={`${licensePlate}-${clientNameSurname}`}
				left={(props) => <List.Icon {...props} icon="account" />}
			/>
			<List.Item
				title={`Telefon: ${clientPhone}`}
				key={`${licensePlate}-${clientPhone}`}
				left={(props) => <List.Icon {...props} icon="phone" />}
				right={(props) => <List.Icon {...props} icon="call-made" />}
				onPress={() =>
					call({
						number: clientPhone.replace(' ', ''),
						prompt: false,
					}).catch(console.error)
				}
			/>
			{referance ? (
				<List.Item
					title={`Referans: ${referance}`}
					key={`${licensePlate}-${referance}`}
					left={(props) => <List.Icon {...props} icon="account-multiple" />}
				/>
			) : null}
			<List.Item
				title={`Verilen tarih: ${`${moment(givenDate).format('D MMMM YYYY')}`}`}
				key={`${licensePlate}-${givenDate}`}
				left={(props) => <List.Icon {...props} icon="calendar" />}
			/>
			<List.Item
				key={`${licensePlate}-controls`}
				right={() => (
					<>
						<Button
							uppercase={false}
							mode="outlined"
							icon="pencil"
							style={{ margin: 4 }}
							onPress={() =>
								navigation.navigate('Details', {
									day,
									edit: true,
									editThis: {
										licensePlate,
										brand,
										model,
										clientNameSurname,
										clientPhone,
										referance,
										givenDate,
										notificationToken,
									},
								})
							}
						>
							Düzenle
						</Button>
						<Button
							uppercase={false}
							style={{ margin: 4, width: 90 }}
							color={Colors.red500}
							mode="contained"
							icon="delete"
							onPress={() => {
								setContentToDelete(licensePlate);
								setDialogVisible(true);
							}}
						>
							Sil
						</Button>
					</>
				)}
			/>
		</List.Accordion>
	);
}
