import { combineReducers } from 'redux';
import datesReducer from './dates';

const allReducers = combineReducers({ dates: datesReducer });

export default allReducers;
