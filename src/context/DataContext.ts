import { createContext } from 'react';

interface ContextInterface {
	_dates: Record<string, any>;
	_setDates: any;
}

export const DataContext = createContext<ContextInterface | null>(null);
