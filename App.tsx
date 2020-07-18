import React, { useState } from 'react';
import { Provider as PaperProvider } from 'react-native-paper';

import CalendarApp from './src/CalendarApp';
import { DataContext } from './src/context/DataContext';
import theme from './src/theme';

const App: React.FC = () => {
	const [_dates, _setDates] = useState({});

	return (
		<PaperProvider theme={theme}>
			<DataContext.Provider value={{ _dates, _setDates }}>
				<CalendarApp />
			</DataContext.Provider>
		</PaperProvider>
	);
};

export default App;
