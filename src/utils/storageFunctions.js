import AsyncStorage from '@react-native-community/async-storage';

const getData = async (key) => {
	try {
		const jsonValue = await AsyncStorage.getItem(key);
		console.log('getData:', jsonValue);
		return jsonValue ? JSON.parse(jsonValue) : {};
	} catch (e) {
		// error reading value
	}
};

const storeData = async (key, value) => {
	try {
		const jsonValue = JSON.stringify(value);
		await AsyncStorage.setItem(key, jsonValue);
	} catch (e) {
		// saving error
	}
};

export { getData, storeData };
