import { StackNavigationProp } from '@react-navigation/stack';
import moment from 'moment';
import React from 'react';
import { List, Button, Colors } from 'react-native-paper';
// @ts-ignore
import call from 'react-native-phone-call';

import { RootStackParamList } from '../CalendarApp';
import 'moment/locale/tr';

type ProfileScreenNavigationProp = StackNavigationProp<RootStackParamList, 'List'>;

type Props = {
	navigation: ProfileScreenNavigationProp;
	day: Record<string, any>;
	licensePlateName: string;
	details: Record<string, any>;
	// eslint-disable-next-line @typescript-eslint/ban-types
	functions: {
		setContentToDelete: (licensePlate: string) => void;
		setDialogVisible: (bool: boolean) => void;
	};
};

const ListAccordion: React.FC<Props> = ({
	navigation,
	day,
	licensePlateName,
	details,
	functions,
}) => {
	const { setContentToDelete, setDialogVisible } = functions;
	const licensePlate = licensePlateName;
	const {
		brand,
		model,
		clientNameSurname,
		clientPhone,
		referance,
		givenDate,
		notificationToken,
	} = details;
	return (
		<List.Accordion
			title={licensePlate}
			key={licensePlate}
			left={(props) => <List.Icon {...props} icon="car" />}
		>
			{/* @ts-ignore */}
			<List.Item
				title={`Marka: ${brand}`}
				key={`${licensePlate}-${brand}`}
				left={(props) => <List.Icon {...props} icon="tag-multiple" />}
			/>
			{/* @ts-ignore */}
			<List.Item
				title={`Model: ${model}`}
				key={`${licensePlate}-${model}`}
				left={(props) => <List.Icon {...props} icon="tag" />}
			/>
			{/* @ts-ignore */}
			<List.Item
				title={`Müşteri: ${clientNameSurname}`}
				key={`${licensePlate}-${clientNameSurname}`}
				left={(props) => <List.Icon {...props} icon="account" />}
			/>
			{/* @ts-ignore */}
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
				// @ts-ignore
				<List.Item
					title={`Referans: ${referance}`}
					key={`${licensePlate}-${referance}`}
					left={(props) => <List.Icon {...props} icon="account-multiple" />}
				/>
			) : null}
			{/* @ts-ignore */}
			<List.Item
				title={`Verilen tarih: ${`${moment(givenDate).format('D MMMM YYYY')}`}`}
				key={`${licensePlate}-${givenDate}`}
				left={(props) => <List.Icon {...props} icon="calendar" />}
			/>
			{/* @ts-ignore */}
			<List.Item
				key={`${licensePlate}-controls`}
				right={() => (
					<>
						{/* @ts-ignore */}
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
						{/* @ts-ignore */}
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
};

export default ListAccordion;
