import React from 'react';
import { mount, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Screen from '../component/Screen';
import { Provider } from '../component/Switch/context';
import faker from 'faker';

configure({ adapter: new Adapter() });

describe('<Screen />', () => {
  let props = {
    name: 'viewA',
    viewComponent: jest.fn(props => <div />),
    initialProps: {
      [faker.random.objectElement()]: faker.random.objectElement()
    }
  };
  let context = {
    viewName: 'viewB',
    viewProps: {
      [faker.random.objectElement()]: faker.random.objectElement()
    },
    to: jest.fn()
  };
  beforeEach(() => {
    jest.resetModules();
  });

  describe("while the viewName in context and name in component's props is different", () => {
    const wrapper = mount(
      <Provider value={context}>
        <Screen {...props} />
      </Provider>
    );

    test('viewComponent should not be rendered', () => {
      expect(wrapper.isEmptyRender()).toBeTruthy();
    });
  });

  describe('while the viewName in props and name in context is the same', () => {
    const viewName = faker.random.objectElement();

    const wrapper = mount(
      <Provider value={Object.assign({}, context, { viewName })}>
        <Screen {...props} name={viewName} />
      </Provider>
    );
    test('the content should be rendered', () => {
      expect(wrapper.exists()).toBeTruthy();
    });
    test('<ScreenView /> should be rendered', () => {
      expect(wrapper.find('ScreenView').exists()).toBeTruthy();
    });
  });

  test('Except for name and viewName, all props should be passed to child(ScreenView)', () => {
    const viewName = faker.random.objectElement();

    const wrapper = mount(
      <Provider value={Object.assign({}, context, { viewName })}>
        <Screen {...props} name={viewName} />
      </Provider>
    );

    const { viewComponent, initialProps } = props;
    const { viewProps, to } = context;

    expect(wrapper.find('ScreenView').props()).toEqual({
      viewComponent,
      initialProps,
      viewProps,
      to
    });
  });
});
