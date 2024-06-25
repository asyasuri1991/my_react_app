import { useEffect, useState } from 'react';

export function useUpdateActiveIndex(containerRef: React.RefObject<HTMLDivElement>) {
  const [ activeIndex, setActiveIndex ] = useState(0);

  useEffect(() => {
    const currentNode = containerRef?.current;

    if (!currentNode) {
      return;
    }

    const scroll = () => {
      const dataContainer = currentNode.getBoundingClientRect();
      const firstElementData = currentNode.firstElementChild?.getBoundingClientRect();

      if (!firstElementData) {
        return;
      }

      const shift = firstElementData.left - dataContainer.left;
      setActiveIndex(Math.abs(Math.round(shift / dataContainer.width)))
    };

    currentNode.addEventListener('scroll', scroll);

    return () => {
      currentNode.removeEventListener('scroll', scroll);
    };
  }, [ containerRef ])

  return activeIndex;
}