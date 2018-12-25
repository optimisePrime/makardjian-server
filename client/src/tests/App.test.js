import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';
import App from './../Components/App.jsx';

Enzyme.configure({ adapter: new EnzymeAdapter() })

test('renders the App component without error', () => {
    const wrapper = shallow(<App />);
    const AppComponent = wrapper.find("[data-test='component-app']")
    expect(AppComponent.length).toBe(1);
});