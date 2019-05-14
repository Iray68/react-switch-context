import React from 'react';
import {
  Consumer,
  Provider,
  SwitchContext,
  withSwitcher
} from '../component/Switch/context';
import { mount, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

describe("Switch's context", () => {
  describe('<Provider>', () => {
    const context = {
      viewName: expect.any(String),
      viewProps: expect.anything(),
      to: jest.fn()
    };
    const TestComponent = jest.fn(props => <div />);

    it('context value', () => {
      const wrapper = mount(
        <Provider value={context}>
          <Consumer>{value => <TestComponent {...value} />}</Consumer>
        </Provider>
      );
      expect(wrapper.find(TestComponent).props()).toEqual(context);
    });
  });

  describe('HOC: withSwitcher', () => {
    let mockFunction;
    let mockProps;
    let context;
    let TestComponent;

    beforeEach(() => {
      jest.resetModules();

      mockFunction = jest.fn();
      mockProps = { testContext: expect.any(Object) };

      context = {
        viewName: expect.any(String),
        viewProps: mockProps,
        to: mockFunction
      };
      TestComponent = withSwitcher(props => <div />);
    });

    it("viewProps' attribute and to function in context should be passed into HOC", () => {
      const wrapper = mount(
        <Provider value={context}>
          <TestComponent />
        </Provider>
      );
      expect(wrapper.children().props()).toEqual({
        to: mockFunction,
        ...mockProps
      });
    });

    it("inner component's props", () => {
      const testProps = { test: expect.anything() };

      const wrapper = mount(
        <Provider value={context}>
          <TestComponent {...testProps} />
        </Provider>
      );
      expect(wrapper.children().props().test).toEqual(testProps.test);
    });

    it("viewProps in context should override component's props", () => {
      const testProps = { testContext: expect.anything() };

      const wrapper = mount(
        <Provider value={context}>
          <TestComponent {...testProps} />
        </Provider>
      );
      expect(wrapper.children().props().testContext).not.toEqual(
        testProps.testContext
      );

      expect(wrapper.children().props().testContext).toEqual(
        context.viewProps.testContext
      );
    });
  });

  it('class SwitchContext for createContext() parameter', () => {
    const name = expect.any(String);
    const props = expect.any(Object);
    const mockFunction = jest.fn();

    const context = new SwitchContext({
      viewName: name,
      viewProps: props,
      to: mockFunction,
      test: 'test'
    });

    const { viewName, viewProps, to, ...other } = context;

    expect(viewName).toEqual(name);
    expect(viewProps).toEqual(props);
    expect(to).toEqual(mockFunction);
    expect({ ...other }).toEqual({});
  });
});
