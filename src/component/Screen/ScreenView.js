// @flow
import React, { Component } from 'react';

export type ScreenViewType<T> = {
  viewComponent: typeof Component,
  initialProps: ?T,
  viewProps: ?T,
  to: (string, T) => void
};

const ScreenView = <T>({
  viewComponent: View,
  initialProps,
  viewProps,
  ...others
}: ScreenViewType<T>) => <View {...others} {...initialProps} {...viewProps} />;

export default ScreenView;
