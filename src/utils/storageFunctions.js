import SyncStorage from 'sync-storage';

const getData = () => {
	try {
		let Dates;
		const value = SyncStorage.get('@Dates');
		value ? (Dates = value) : (Dates = {});
		return Dates;
	} catch (e) {
		// error reading value
	}
};

const storeData = (value) => {
	try {
		SyncStorage.set('@Dates', value);
		console.log(value);
	} catch (e) {
		// saving error
	}
};

export { getData, storeData };
