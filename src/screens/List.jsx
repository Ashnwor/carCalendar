import { useFocusEffect } from '@react-navigation/native';
import { Notifications } from 'expo';
import moment from 'moment';
import React, { useState, useCallback, useEffect } from 'react';
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
import theme from '../theme';
import { storeData, getData } from '../utils';

import 'moment/locale/tr';

const { OS } = Platform;

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

	const [dates, setDates] = useState({});
	const [isLoading, setLoading] = useState(true);
	const [isDialogVisible, setDialogVisible] = useState(false);
	const [contentToDelete, setContentToDelete] = useState('');

	useFocusEffect(
		useCallback(() => {
			setLoading(true);
			getData('storage').then((result) => {
				setDates(result);
				setLoading(false);
			});
		}, []),
	);

	useEffect(() => {
		console.log('UPDATED');
	}, [dates]);

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
			{!isLoading ? (
				<View style={styles.container}>
					{!dates[selectedDate] || Object.keys(dates[selectedDate]).length === 0 ? (
						<NoItemFound />
					) : (
						<ScrollView>
							{Object.keys(dates[selectedDate]).map((val) => {
								const licensePlate = dates[selectedDate][val];

								return (
									<ListAccordion
										licensePlateName={val}
										details={licensePlate}
										navigation={navigation}
										functions={{ setContentToDelete, setDialogVisible }}
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
									onPress={() => {
										if (OS !== 'web')
											Notifications.cancelScheduledNotificationAsync(
												dates[selectedDate][contentToDelete].notificationToken,
											);
										delete dates[selectedDate][contentToDelete];
										storeData('storage', dates);
										setDialogVisible(false);
									}}
								>
									Onayla
								</Button>
							</Dialog.Actions>
						</Dialog>
					</Portal>
				</View>
			) : (
				<View style={styles.containerCenter}>
					<ActivityIndicator size="large" />
				</View>
			)}
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
