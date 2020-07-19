import React from 'react';
import { render, act } from 'react-native-testing-library';

import App from './App';

describe('<App />', () => {
	it('has 1 child', async () => {
		const tree = render(<App />).toJSON();
		await act(async () => expect(tree.children.length).toBe(1));
	});
});

jest.mock('react-native/Libraries/Animated/src/NativeAnimatedHelper');
