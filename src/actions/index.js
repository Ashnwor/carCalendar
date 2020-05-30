export const fetchDatesRequest = () => ({
	type: 'FETCH_DATES_REQUEST',
});

export const fetchDatesSuccess = (dates) => ({
	type: 'FETCH_DATES_SUCCESS',
	payload: dates,
});

export const fetchUsersFailure = (error) => ({
	type: 'FETCH_DATES_FAILURE',
});
