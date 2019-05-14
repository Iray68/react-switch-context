// @flow
import * as React from 'react';
import { Component, useState } from 'react';
import { SwitchContext, Provider } from './context';
import Screen from '../Screen';
import { Suspense } from 'react';

type SwitchPropsType = {
  rootView: ?string,
  notFoundView: typeof Component,
  loadingView: ?React.Node,
  children: React.ChildrenArray<React.Element<typeof Screen>>
};

const getViewState = (viewName, viewProps) => {
  return {
    viewName: viewName,
    viewProps: viewProps ? viewProps : {}
  };
};

const Switch = ({
  rootView,
  notFoundView: NotFoundView,
  loadingView,
  children
}: SwitchPropsType) => {
  const allScreenName = React.Children.map(children, child => child.props.name);

  const [{ viewName, viewProps }, setView] = useState(
    rootView != null
      ? getViewState(rootView)
      : getViewState(allScreenName ? allScreenName[0] : '')
  );

  if (!children || !viewName || !allScreenName.includes(viewName)) {
    return <NotFoundView />;
  }

  const switcher = new SwitchContext({
    viewName: viewName,
    viewProps: viewProps,
    to: (viewName, props) => setView(getViewState(viewName, props))
  });

  return (
    <Provider value={switcher}>
      <Suspense fallback={loadingView}>{children}</Suspense>
    </Provider>
  );
};

Switch.defaultProps = {
  rootView: null,
  loadingView: <div />,
  notFoundView: props => <div>404</div>
};

export default Switch;
export { Screen };
