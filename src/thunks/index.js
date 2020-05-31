import { getData, storeData } from '../utils';
import {
	fetchDatesRequest,
	fetchDatesSuccess,
	fetchDatesFailure,
	storeDatesSuccess,
	storeDatesFailure,
	storeDatesRequest,
	addDateRequest,
	addDateDone,
} from '../actions';

export const fetchDates = () => {
	return function (dispatch) {
		dispatch(fetchDatesRequest());
		getData('storage')
			.then((response) => {
				dispatch(fetchDatesSuccess(response));
				console.log('response:', response);
			})
			.catch((error) => {
				dispatch(fetchDatesFailure(error));
				console.log('error:', error);
			});
	};
};

export const storeDates = (payload) => {
	console.log('sfaf');
	return function (dispatch) {
		dispatch(storeDatesRequest());
		storeData('storage', payload)
			.then((response) => dispatch(storeDatesSuccess(response)))
			.catch((error) => dispatch(storeDatesFailure(error)));
	};
};

export const addDate = (newDate, details) => {
	return function (dispatch) {
		dispatch(addDateRequest(newDate, details));
		setTimeout(() => {
			dispatch(addDateDone());
		}, 500);
	};
};
