import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';
import App from './../Components/App.jsx';

Enzyme.configure({ adapter: new EnzymeAdapter() });

/**
 * Factory Function to create a shallowWrapper for the App component
 * @function setup
 * @constructor
 * @param {object} props 
 * @param {object} state 
 * @returns {ShallowWrapper}
 */
const setup = (props={}, state=null) => {
    const wrapper = shallow(<App {...props} />);
    if (state) {
        wrapper.setState(state);
    }
    return wrapper;
}

/**
 * Return ShallowWrapper containing node(s) with the given data-test value.
 * @param {ShallowWrapper} wrapper - Enzyme shallow wrapper to search within.
 * @param {string} val - Value of data-test attribute for search.
 * @returns {ShallowWrapper}
 */

const findByTestAttr = (wrapper, val) => {
    return wrapper.find(`[data-test='${val}']`)
}

test('renders the App component without error', () => {
    const wrapper = setup();
    const appComponent = findByTestAttr(wrapper, 'component-app');
    expect(appComponent.length).toBe(1);
});

test('photoSideBar starts as an empty array', () => {
    const wrapper = setup();
    const initialPhotoSideBarState = wrapper.state('photoSideBar');
    expect(initialPhotoSideBarState).toMatchObject([]);
});

//currently the mainPhoto property on the wrapper's state is not updating so this test fails.
test('mainPhoto changes on mouseEnter', () => {
    const wrapper = setup();
    const intitialMainPhoto = wrapper.state('mainPhoto');
    const thumbnail = {photo_id: 190, url: "http://lorempixel.com/640/480/nature", product_id: 35, main_photo: 0};
    wrapper.instance().changeMainPhoto(thumbnail);
    wrapper.update();
    expect(intitialMainPhoto).toBe(thumbnail);
});
