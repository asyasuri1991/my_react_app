import cl from 'classnames';

import { IconName, ComponentProps } from '../types';

import './icon.css';

interface IconProps extends ComponentProps {
  name: IconName;
}

export const Icon = ({ name, className }: IconProps) => (
  <span className={cl(`icon`, `icon--${name}`, className)} />
);