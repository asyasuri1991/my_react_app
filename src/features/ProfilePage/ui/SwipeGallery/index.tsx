import { useState, useRef, useEffect } from 'react';

import { Button } from '../Button';
import { Counter } from '../Counter';

import { useUpdateActiveIndex } from './hooks/useUpdateActiveIndex';
import { useKeysEvents } from './hooks/useKeyEvents';

import s from './gallery.module.css';

import { Article } from 'shared/types/article';
import { Link } from 'react-router-dom';
import { ROUTES } from 'router/routes';

interface SwipeGalleryProps {
  images: Article[];
}

const increaseIndex = (index: number, size: number) => Math.min(index + 1, size - 1);

const decreaseIndex = (index: number) => Math.max(0, index - 1);

export const SwipeGallery = ({ images }: SwipeGalleryProps) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollActiveIndex = useUpdateActiveIndex(containerRef);

  useEffect(() => {
    setActiveIndex(scrollActiveIndex);
  }, [scrollActiveIndex]);

  const move = (newActiveElement: number) => {
    const currentNode = containerRef?.current;

    if (!currentNode) {
      return;
    }

    const dataContainer = currentNode.getBoundingClientRect();
    setActiveIndex(newActiveElement);

    currentNode.scrollTo({
      left: newActiveElement * dataContainer.width,
      behavior: 'smooth',
    });
  };

  useKeysEvents(key => {
    if (key === 'ArrowLeft') {
      move(decreaseIndex(activeIndex));
    }
    if (key === 'ArrowRight') {
      move(increaseIndex(activeIndex, images.length));
    }
  });

  const isLoaded = (index: number) => activeIndex - 1 === index || activeIndex + 1 === index || activeIndex === index;

  return (
    <div className={s.gallery}>
      <div className={s.galleryContainer} ref={containerRef}>
        {images.map((image, index) => (
          <div key={index} className={s.galleryContainerItem}>
            <Link to={`${ROUTES.ARTICLE}/${image.id}`}>
              <div className={s.galleryLink}>
                <img src={image.coverImage} alt={image.title} loading={isLoaded(index) ? undefined : 'lazy'} className={s.galleryImg}/>
                <span className={s.galleryText}>{image.title}</span>
              </div>
            </Link>
          </div>
        ))}
      </div>
      <div className={s.navigation}>
        <Button iconName="arrow-left" disabled={activeIndex === 0} onClick={() => move(decreaseIndex(activeIndex))} />
        <Counter activeIndex={activeIndex + 1} size={images.length} />
        <Button
          iconName="arrow-right"
          disabled={activeIndex === images.length - 1}
          onClick={() => move(increaseIndex(activeIndex, images.length))}
        />
      </div>
    </div>
  );
};
