import React from 'react';
import faker from 'faker';
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
      viewName: faker.random.objectElement(),
      viewProps: {
        [faker.random.objectElement()]: faker.random.objectElement()
      },
      to: jest.fn()
    };
    const TestComponent = jest.fn(props => <div />);

    test('context value', () => {
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
      mockProps = {
        testContext: faker.random.objectElement()
      };

      context = {
        viewName: faker.random.objectElement(),
        viewProps: mockProps,
        to: mockFunction
      };
      TestComponent = withSwitcher(props => <div />);
    });

    test("viewProps' attribute and to function in context should be passed into HOC", () => {
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

    test("inner component's props", () => {
      const testProps = { test: faker.random.objectElement() };

      const wrapper = mount(
        <Provider value={context}>
          <TestComponent {...testProps} />
        </Provider>
      );
      expect(wrapper.children().props().test).toEqual(testProps.test);
    });

    test("viewProps in context should override component's props", () => {
      const defaultProps = { testContext: 'somethingElse' };

      const wrapper = mount(
        <Provider value={context}>
          <TestComponent {...defaultProps} />
        </Provider>
      );
      expect(wrapper.children().props().testContext).not.toEqual(
        defaultProps.testContext
      );

      expect(wrapper.children().props().testContext).toEqual(
        context.viewProps.testContext
      );
    });
  });

  test('SwitchContext for createContext() parameter', () => {
    const name = faker.random.objectElement();
    const props = {
      [faker.random.objectElement()]: faker.random.objectElement()
    };
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
