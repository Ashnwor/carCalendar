import { getData } from '../utils';
import {
	fetchDatesRequest,
	fetchDatesSuccess,
	fetchUsersFailure,
} from '../actions';

export const fetchDates = () => {
	return function (dispatch) {
		dispatch(fetchDatesRequest());
		getData('@storage')
			.then((response) => {
				dispatch(fetchDatesSuccess(response));
				// console.log(response);
			})
			.catch((error) => {
				dispatch(fetchUsersFailure());
				// console.log(error);
			});
	};
};
