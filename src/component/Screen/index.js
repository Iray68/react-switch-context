// @flow
import React, { Component } from 'react';
import { Consumer } from '../Switch/context';
import ScreenView from './ScreenView';

export type ScreenPropsType<T> = {
  name: string,
  viewComponent: typeof Component,
  initialProps: ?T
};

const Screen = <T>({
  viewComponent,
  name,
  initialProps
}: ScreenPropsType<T>) => (
  <Consumer>
    {({ viewName, to, ...others }) =>
      viewName === name ? (
        <ScreenView
          viewComponent={viewComponent}
          initialProps={initialProps}
          to={to}
          {...others}
        />
      ) : null
    }
  </Consumer>
);

Screen.defaultProps = {
  initialProps: {}
};

export default Screen;
