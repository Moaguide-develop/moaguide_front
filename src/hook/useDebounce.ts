import { useEffect, useState } from 'react';

/**
 * 불필요한 입력 요청을 막기 위한 함수입니다.
 * 매번 키보드 입력을 받는것이 아닌 delay에 입력된 시간을 기다린 후 최종 입력 텍스트를 반환합니다.
 */

function useDebounce<T = any>(value: T, delay = 800) {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(timeout);
    };
  }, [delay, value]);

  return debouncedValue;
}

export default useDebounce;
