import { useRef, useEffect } from 'react';

const useWatch = (callback: Function, refer: any[]) => {
  const isFirst = useRef<boolean>(true);

  useEffect(() => {
    if (isFirst.current) {
      isFirst.current = false;
    } else {
      callback();
    }
  }, [...refer]);
};

export default useWatch;
