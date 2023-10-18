import { useCallback, useEffect, useState } from 'react';

function useScrollY(): [number, (scrollY: number) => void] {
  const [scrollY, setScrollY] = useState(0);

  // useEffect(() => {
  //   if (sessionStorage.getItem('scrollY')) {
  //     setScrollY(Number(sessionStorage.getItem('scrollY')));
  //   }
  // }, []);

  const updateScrollY = useCallback((scrollY: number) => {
    setScrollY(scrollY);
    // sessionStorage.setItem('scrollY', scrollY.toString());
  }, []);

  return [scrollY, updateScrollY];
}

export default useScrollY;
