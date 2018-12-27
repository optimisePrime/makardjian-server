import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';
import App from './../Components/App.jsx';

Enzyme.configure({ adapter: new EnzymeAdapter() });

/**
 * @function setup
 * @constructor
 * @param {object} props 
 * @param {any} state 
 * @returns {ShallowWrapper}
 */
const setup = (props={}, state=null) => {
    return shallow(<App {...props} />)
}

test('renders the App component without error', () => {
    const wrapper = setup();
    const AppComponent = wrapper.find("[data-test='component-app']")
    expect(AppComponent.length).toBe(1);
});