import React from 'react';
import { StyleSheet } from 'react-native';
import { TextInput, HelperText } from 'react-native-paper';

import FieldMandatory from './FieldMandatory';

const InputField: React.FC<{
	label: string;
	value: string | undefined;
	error: boolean;
	onChangeText: (text: string) => void;
}> = ({ label, value, error, onChangeText }) => {
	return (
		<>
			<TextInput style={styles.input} label={label} value={value} onChangeText={onChangeText} />
			{error && <FieldMandatory />}
		</>
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

export default InputField;
