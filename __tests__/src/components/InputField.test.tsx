import React from 'react';
import { render } from 'react-native-testing-library';

import InputField from '../../../src/components/InputField';

describe('<InputField />', () => {
	it('renders without crashing', () => {
		const component = render(
			<InputField
				label="test_label"
				value="test_value"
				onChangeText={(_text) => jest.fn()}
				error={false}
			/>,
		);
		const tree = component.toJSON();
		expect(tree).toMatchSnapshot();
	});
});
