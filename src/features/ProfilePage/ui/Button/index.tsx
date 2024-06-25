import cl from 'classnames';

import { IconName, ComponentProps } from '../types';
import { Icon } from '../Icon';

import s from './button.module.css';

interface ButtonProps extends ComponentProps {
  onClick: () => void;
  iconName?: IconName;
  disabled?: boolean;
}

export const Button = ({
  iconName,
  children,
  onClick,
  disabled = false,
  className
}: ButtonProps) => (
  <button
    onClick={onClick}
    className={cl(s.button, className)}
    disabled={disabled}
  >
    {iconName && <Icon name={iconName} />}
    {children}
  </button>
)