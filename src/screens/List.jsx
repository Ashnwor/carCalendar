import { useFocusEffect } from '@react-navigation/native';
import { Notifications } from 'expo';
import moment from 'moment';
import React, { useState, useCallback, useEffect, useContext } from 'react';
import { View, StyleSheet, ScrollView, Platform } from 'react-native';
import {
	FAB,
	Headline,
	Text,
	Button,
	ActivityIndicator,
	Paragraph,
	Dialog,
	Portal,
} from 'react-native-paper';

import ListAccordion from '../components/ListAccordion';
import { DataContext } from '../context/DataContext';
import theme from '../theme';
import { storeData, getData } from '../utils';

import 'moment/locale/tr';

const { OS } = Platform;

// This screen is clusterfucked.
// Need rewrite or refactor.
function List({ route, navigation }) {
	const { day } = route.params;
	const selectedDate = day.dateString;

	navigation.setOptions({
		headerTitle: moment(selectedDate, 'YYYY-MM-DD').format('D MMMM YYYY'),
		headerStyle: {
			backgroundColor: theme.colors.primary,
		},
		headerTintColor: theme.colors.headerText,
	});

	const { _dates, _setDates } = useContext(DataContext);
	const [isLoading, setLoading] = useState(true);
	const [isDialogVisible, setDialogVisible] = useState(false);
	const [contentToDelete, setContentToDelete] = useState('');

	useFocusEffect(
		useCallback(() => {
			setLoading(true);
			getData('storage').then((result) => {
				_setDates(result);
				setLoading(false);
			});
		}, []),
	);

	function NoItemFound() {
		return (
			<View style={styles.containerCenter}>
				<Headline>Bu tarihte kayıtlı araç bulunamadı</Headline>
				<Text>Araç eklemek için + tuşuna basınız</Text>
			</View>
		);
	}

	return (
		<>
			<View style={styles.container}>
				{!_dates[selectedDate] || Object.keys(_dates[selectedDate]).length === 0 ? (
					<NoItemFound />
				) : (
					<ScrollView>
						{Object.keys(_dates[selectedDate]).map((val, index) => {
							const licensePlate = _dates[selectedDate][val];

							return (
								<ListAccordion
									licensePlateName={val}
									details={licensePlate}
									navigation={navigation}
									functions={{ setContentToDelete, setDialogVisible }}
									key={`${val}-${index}`}
									day={day}
								/>
							);
						})}
					</ScrollView>
				)}
				<FAB
					style={styles.fab}
					icon="plus"
					onPress={() => navigation.navigate('Details', { day, edit: false })}
				/>
				<Portal>
					<Dialog visible={isDialogVisible} onDismiss={() => setDialogVisible(false)}>
						<Dialog.Title>Uyarı</Dialog.Title>
						<Dialog.Content>
							<Paragraph>Araç silinsin mi?</Paragraph>
						</Dialog.Content>
						<Dialog.Actions>
							<Button onPress={() => setDialogVisible(false)}>İptal</Button>
							<Button
								onPress={async () => {
									if (OS !== 'web')
										Notifications.cancelScheduledNotificationAsync(
											_dates[selectedDate][contentToDelete].notificationToken,
										);
									delete _dates[selectedDate][contentToDelete];
									await storeData('storage', _dates);
									setDialogVisible(false);
								}}
							>
								Onayla
							</Button>
						</Dialog.Actions>
					</Dialog>
				</Portal>
			</View>
		</>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
	},

	containerCenter: {
		flex: 1,
		backgroundColor: '#fff',
		justifyContent: 'center',
		alignItems: 'center',
	},

	fab: {
		position: 'absolute',
		margin: 16,
		right: 0,
		bottom: 0,
	},
});

export default List;
