import { getData, storeData } from '../utils';
import {
	fetchDatesRequest,
	fetchDatesSuccess,
	fetchDatesFailure,
	storeDatesSuccess,
	storeDatesFailure,
	storeDatesRequest,
} from '../actions';

export const fetchDates = () => {
	return function (dispatch) {
		dispatch(fetchDatesRequest());
		getData('@storage')
			.then((response) => dispatch(fetchDatesSuccess(response)))
			.catch((error) => dispatch(fetchDatesFailure(error)));
	};
};

export const storeDates = (payload) => {
	return function (dispatch) {
		dispatch(storeDatesRequest());
		storeData('@storage', payload)
			.then(() => dispatch(storeDatesSuccess()))
			.catch((error) => dispatch(storeDatesFailure(error)));
	};
};
