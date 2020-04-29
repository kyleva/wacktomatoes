/** Third-party libraries */
import { expect } from 'chai';
import { shallow } from 'enzyme';
import { stub } from 'sinon';

/** Our code */
// Actions
import { logoutStart } from '../../api/account/actions';
// Components
import UserUtility from './UserUtility';

suite('components/UserUtility/UserUtility', () => {
  test('component renders a div with email prop rendered within text content', () => {
    const wrapper = shallow(<UserUtility email="test@email.com" />);

    const expectedResult = 'Signed in as test@email.com. Sign out'.trim();
    const wrapperText = wrapper.text().trim();

    expect(wrapperText).to.equal(expectedResult);
  });

  test('when email is not supplied as prop: text content is empty string', () => {
    const wrapper = shallow(<UserUtility />);

    const expectedResult = '';
    const wrapperText = wrapper.text();

    expect(wrapperText).to.equal(expectedResult);
  });

  test('when sign out button is clicked `logoutStart` action is dispatched', () => {
    const dispatch = stub();
    const wrapper = shallow(<UserUtility />);

    const expectedResult = logoutStart();
    wrapper.find('button').simulate('click');

    expect(dispatch).to.have.been.calledWith(expectedResult);
  });
});
