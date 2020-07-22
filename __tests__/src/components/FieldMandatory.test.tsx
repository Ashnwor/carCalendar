import React from 'react';
import { render } from 'react-native-testing-library';

import FieldMandatory from '../../../src/components/FieldMandatory';

describe('<FieldMandatory />', () => {
	it('renders without crashing', () => {
		const component = render(<FieldMandatory />);
		const tree = component.toJSON();
		expect(tree).toMatchSnapshot();
	});
});
