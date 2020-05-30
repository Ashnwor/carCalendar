import React from 'react';
import { createStore, applyMiddleware } from 'redux';
import { Provider as ReduxProvider } from 'react-redux';
import thunkMiddleware from 'redux-thunk';
import allReducers from './src/reducers';
import { Provider as PaperProvider } from 'react-native-paper';
import CalendarApp from './src/CalendarApp';
import theme from './src/theme';

const store = createStore(allReducers, applyMiddleware(thunkMiddleware));

export default function App() {
	return (
		<ReduxProvider store={store}>
			<PaperProvider theme={theme}>
				<CalendarApp />
			</PaperProvider>
		</ReduxProvider>
	);
}
