// @flow
import React from 'react';
import { withSwitcher } from '../../dist/index';

type ButtonPropsType = {
  label: string,
  onClick: () => {}
};

type ButtonSwitchPropsType<T> = {
  to: (target: string, targetProps: T) => {},
  target: string,
  targetProps: T,
  label: string
};

const Button = ({ label, onClick }: ButtonPropsType) => (
  <button style={{ border: '1px solid' }} onClick={onClick}>
    {label}
  </button>
);

const BtnSwitch = <T>({
  to,
  target,
  targetProps,
  label
}: ButtonSwitchPropsType<T>) => (
  <Button label={label} onClick={() => to(target, targetProps)} />
);

export default Button;

export const ButtonSwitch = <T>(props: {}) => {
  const HOCSwitcher = withSwitcher<ButtonSwitchPropsType<T>>(BtnSwitch);
  return <HOCSwitcher {...props} />;
};
