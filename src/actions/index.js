export const fetchDatesRequest = () => ({
	type: 'FETCH_DATES_REQUEST',
});

export const fetchDatesSuccess = (dates) => ({
	type: 'FETCH_DATES_SUCCESS',
	payload: dates,
});

export const fetchDatesFailure = (error) => ({
	type: 'FETCH_DATES_FAILURE',
	payload: error,
});

export const storeDatesRequest = () => ({
	type: 'STORE_DATES_REQUEST',
});

export const storeDatesSuccess = () => ({
	type: 'STORE_DATES_SUCCESS',
});

export const storeDatesFailure = (error) => ({
	type: 'STORE_DATES_FAILURE',
	payload: error,
});
