import React from 'react';
import { render } from 'react-native-testing-library';

import ListAccordion from '../../../src/components/ListAccordion';

describe('<ListAccordion />', () => {
	it('renders without crashing', () => {
		const navigation: any = { navigate: jest.fn() };
		render(
			<ListAccordion
				navigation={navigation}
				day={new Date()}
				licensePlateName="test-name"
				details={{
					brand: 'test_brand',
					model: 'test_model',
					clientNameSurname: 'test_name_surname',
					clientPhone: '5555 555 55 55',
					referance: 'test_reference',
					givenDate: new Date(),
				}}
				functions={{
					setContentToDelete: jest.fn(),
					setDialogVisible: jest.fn(),
				}}
			/>,
		);
	});
});
