import React from 'react';
import { mount, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import ScreenView from '../component/Screen/ScreenView';

configure({ adapter: new Adapter() });

describe('<ScreenView />', () => {
  const Component = jest.fn(props => <div>Test</div>);

  const props = {
    viewComponent: Component,
    initialProps: { test: expect.any(Object) },
    viewProps: { testContext: expect.any(Object) },
    to: jest.fn()
  };

  const wrapper = mount(<ScreenView {...props} />);

  it('viewComponent: render props function should be called', () => {
    expect(Component).toHaveBeenCalledTimes(1);
  });

  it('viewComponent should be rendered', () => {
    expect(wrapper.containsMatchingElement(Component)).toBeTruthy();
  });

  it('override initialProps by viewProps, and pass all the props to viewComponent', () => {
    const { initialProps, viewProps, to } = props;

    expect(wrapper.children().props()).toEqual({
      ...initialProps,
      ...viewProps,
      to
    });
  });
});
