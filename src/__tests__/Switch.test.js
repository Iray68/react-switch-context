import React from 'react';
import faker from 'faker';
import { mount, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Switch, { Screen } from '../component/Switch';

configure({ adapter: new Adapter() });

describe('<Switch>', () => {
  const newProps = { test: faker.random.objectElement() };
  const SECOND_VIEW_NAME = 'SECOND_VIEW_NAME';
  const Home = ({ to }) => (
    <div>
      <button onClick={e => to(SECOND_VIEW_NAME, newProps)} />
    </div>
  );
  const TestComponent = ({ to }) => (
    <div>
      <button onClick={e => to('third', newProps)} />
    </div>
  );
  const NotFound = props => <div>404 no found</div>;
  const wrapper = mount(
    <Switch notFoundView={NotFound} loadingView={<div>Loading...</div>}>
      <Screen viewComponent={Home} name="home" />
      <Screen viewComponent={TestComponent} name={SECOND_VIEW_NAME} />
    </Switch>
  );

  it('sholud show first screen default', () => {
    expect(wrapper.find(Home).exists()).toBeTruthy();
    expect(wrapper.find(TestComponent).exists()).toBeFalsy();
  });
  it('can go to other screen with props', () => {
    wrapper.find('button').simulate('click');
    const test = wrapper.find(TestComponent);
    expect(test.exists()).toBeTruthy();
  });
  it('should display not found view while no screen name is matched', () => {
    wrapper.find('button').simulate('click');
    expect(wrapper.find(NotFound).exists()).toBeTruthy();
  });
});
