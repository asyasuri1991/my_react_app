import cl from 'classnames';

import { ComponentProps } from '../types';

import s from './counter.module.css';

interface CounterProps extends ComponentProps {
  activeIndex: number;
  size: number;
}

export const Counter = ({ activeIndex, size, className}: CounterProps) => (
  <div className={s.counter}>
    {activeIndex}/{size}
  </div>
);