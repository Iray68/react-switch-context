// @flow
import * as React from 'react';
import { createContext } from 'react';

export type ContextType<Props> = {
  viewName: string,
  viewProps: Props,
  to: () => void
};

class SwitchContext {
  viewName = '';
  viewProps = {};
  to = () => {};

  constructor(value: ContextType<{}>) {
    const { viewName, viewProps, to } = value;
    this.viewName = viewName;
    this.viewProps = viewProps;
    this.to = to;
  }
}

const context = createContext<ContextType<{}>>(new SwitchContext({}));

export const withSwitcher = <T>(Component: React.ComponentType<T>) => (
  props: T
) => (
  <Consumer>
    {({ viewName, viewProps, to }) => (
      <Component to={to} {...props} {...viewProps} />
    )}
  </Consumer>
);

export const { Provider, Consumer } = context;
export { SwitchContext };
