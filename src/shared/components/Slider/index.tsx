import { SliderProps } from './slider.props';
import s from './slider.module.css';
import cn from 'classnames';
import { useState } from 'react';
import Arrow from 'assets/icons/Right.svg';

const FADE_DURATION = 300;

export const Slider = ({ slides }: SliderProps) => {
  const [slide, setSlide] = useState<number>(0);
  const [fadeState, setFadeState] = useState<'fade-in' | 'fade-out'>('fade-in');
  const [currentTimer, setCurrentTimer] = useState<NodeJS.Timeout>();

  const handleClick = (move: number) => {
    const timer = setTimeout(() => {
      setSlide(s => s + move);
      setFadeState('fade-in');
    }, FADE_DURATION);
    clearTimeout(currentTimer);
    setFadeState('fade-out');
    setCurrentTimer(timer);
  };

  return (
    <div className={s.slider}>
      <div className={cn(s.slide, s[fadeState])} style={{transitionDuration: `${FADE_DURATION}ms`}}>
        <div className={s.left}>
          <div className={s.text}>{slides[slide].text}</div>
        </div>
        <div className={s.right} style={{ backgroundImage: `url(${slides[slide].image})` }}></div>
      </div>
      {slide > 0 && (
        <button className={cn(s.arrow, s.arrowLeft)} onClick={() => handleClick(-1)}>
          <Arrow />
        </button>
      )}
      {slide < slides.length - 1 && (
        <button className={cn(s.arrow, s.arrowRight)} onClick={() => handleClick(1)}>
          <Arrow />
        </button>
      )}
    </div>
  );
};
