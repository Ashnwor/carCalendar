import React from 'react';
import { View, StyleSheet } from 'react-native';
import { FAB, List as ListItem } from 'react-native-paper';
import theme from '../theme';

function List({ route, navigation }) {
	const day = route.params.day;
	navigation.setOptions({
		headerTitle: day.dateString,
		headerStyle: {
			backgroundColor: theme.colors.primary,
		},
		headerTintColor: theme.colors.headerText,
	});

	return (
		<View style={styles.container}>
			<ListItem.Item
				title="First Item"
				description="Item description"
				left={(props) => <ListItem.Icon {...props} icon="car" />}
				onPress={() => console.log('TEST')}
			/>
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

	fab: {
		position: 'absolute',
		margin: 16,
		right: 0,
		bottom: 0,
	},
});

export default List;
