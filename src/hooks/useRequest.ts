import { useState, useCallback } from 'react';
import { HttpMethod } from '@/constants/common';

const useRequest = <T>() => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [result, setResult] = useState<T | null>(null);

  const request = useCallback(async (url: string) => {
    setLoading(true);
    setError(false);
    
    try {
      const response = await(
        await fetch(url, { method: HttpMethod.GET })
      ).json();
      setLoading(false);

      setResult(response);
    } catch (error) {
      setLoading(false);
      setError(true);
    }
  }, []);

  return {
    loading,
    error,
    result,
    request,
  };
};

export default useRequest;
