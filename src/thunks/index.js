import { getData } from '../utils';

export const fetchDates = () => {
	return function (dispatch) {
		// dispatch(fetchDatesRequest());
		getData('@storage')
			.then((response) => {
				console.log(response);
			})
			.catch((error) => {
				console.log(error);
			});
	};
};
