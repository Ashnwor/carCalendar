import AsyncStorage from '@react-native-community/async-storage';

const getData = async (key) => {
	try {
		const jsonValue = await AsyncStorage.getItem(key);
		return jsonValue != null ? JSON.parse(jsonValue) : null;
	} catch (e) {
		// error reading value
	}
};

const storeData = async (value) => {
	try {
		const jsonValue = JSON.stringify(key, value);
		await AsyncStorage.setItem(key, jsonValue);
	} catch (e) {
		// saving error
	}
};

export { getData, storeData };
