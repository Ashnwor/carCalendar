import React, { useContext } from 'react';
import { Provider as PaperProvider } from 'react-native-paper';

import CalendarApp from './src/CalendarApp';
import theme from './src/theme';

export default function App() {
	return (
		<PaperProvider theme={theme}>
			<CalendarApp />
		</PaperProvider>
	);
}
