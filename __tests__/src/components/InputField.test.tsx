import React from 'react';
import { render } from 'react-native-testing-library';

import InputField from '../../../src/components/InputField';

describe('<InputField />', () => {
	it('renders without crashing', () => {
		render(
			<InputField
				label="test_label"
				value="test_value"
				onChangeText={(_text) => jest.fn()}
				error={false}
			/>,
		);
	});
});
