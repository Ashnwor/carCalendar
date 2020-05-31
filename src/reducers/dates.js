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
			console.log('payload:', action.payload);
			return {
				isLoading: false,
				data: action.payload ? action.payload : {},
				error: '',
			};
		case 'FETCH_DATES_FAILURE':
			return {
				isLoading: false,
				data: {},
				error: action.payload,
			};
		case 'STORE_DATES_REQUEST':
			return {
				...state,
				isLoading: true,
			};
		case 'STORE_DATES_SUCCESS':
			return {
				...state,
				isLoading: false,
			};
		case 'STORE_DATES_FAILURE':
			return {
				...state,
				isLoading: false,
				error: action.payload,
			};
		case 'ADD_DATE_REQUEST':
			return {
				isLoading: true,
				data: {
					...state.data,
					[action.newDate]: action.details,
				},
				error: '',
			};
		case 'ADD_DATE_DONE':
			return {
				...state,
				isLoading: false,
			};
		case 'CLEAN_DATES':
			return {
				initialState,
			};
		default:
			return state;
	}
};

export default datesReducer;
