import { getData } from '../utils';

const initialState = {
	isLoading: false,
	data: {},
	error: '',
};

const datesReducer = (state = initialState, action) => {
	switch (action.type) {
		case 'FETCH_DATES_REQUEST':
			return {
				...state,
				isLoading: true,
			};
		case 'FETCH_DATES_SUCCESS':
			return {
				isLoading: false,
				data: action.payload,
				error: '',
			};
		case 'FETCH_DATES_FAILURE':
			return {
				isLoading: false,
				data: [],
				error: action.payload,
			};
		default:
			return state;
	}
};

export default datesReducer;
