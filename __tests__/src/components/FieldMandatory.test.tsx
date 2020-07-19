import React from 'react';
import { render } from 'react-native-testing-library';

import FieldMandatory from '../../../src/components/FieldMandatory';

describe('<FieldMandatory />', () => {
	it('renders without crashing', () => {
		render(<FieldMandatory />);
	});
});
