import React, { useState, useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { View, StyleSheet } from 'react-native';
import { FAB, List as ListItem, Headline, Text } from 'react-native-paper';
import theme from '../theme';
import { storeData, getData } from '../utils';

function List({ route, navigation }) {
	const day = route.params.day;
	navigation.setOptions({
		headerTitle: day.dateString,
		headerStyle: {
			backgroundColor: theme.colors.primary,
		},
		headerTintColor: theme.colors.headerText,
	});

	const [dates, setDates] = useState({});

	useFocusEffect(
		useCallback(() => {
			console.log('List');
			let result;
			getData('storage').then((value) => {
				result = value;
				setDates(result);
				console.log('result: ', result);
			});
			// dispatch(fetchDates());
			// dispatch(cleanDates());
			// dispatch(storeDates({}));
		}, [])
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
		<View style={styles.container}>
			{/* <ListItem.Item
				title="First Item"
				description="Item description"
				left={(props) => <ListItem.Icon {...props} icon="car" />}
				onPress={() => console.log('TEST')}
			/> */}
			{!dates[day.dateString] ? (
				<NoItemFound />
			) : (
				Object.keys(dates[day.dateString]).map((val) => (
					<ListItem.Item
						title={val}
						description="Item description"
						left={(props) => <ListItem.Icon {...props} icon="car" />}
						onPress={() => console.log(val)}
					/>
				))
			)}
			<FAB
				style={styles.fab}
				icon="plus"
				onPress={() => navigation.navigate('Details', day)}
			/>
		</View>
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
