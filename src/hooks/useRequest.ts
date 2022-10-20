import { useState, useCallback } from 'react';
import { HttpMethod } from '@/constants/common';

const useRequest = <T>() => {
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [result, setResult] = useState<T | null>(null);

  const request = useCallback(async (url: string) => {
    setLoading(true);
    setErrorMessage('');
    
    try {
      const response = await(
        await fetch(url, { method: HttpMethod.GET })
      ).json();
      setLoading(false);

      setResult(response);
    } catch (error) {
      setLoading(false);
      setErrorMessage(String(error || 'Unexpected Error'));
    }
  }, []);

  return {
    loading,
    errorMessage,
    result,
    request,
    setResult,
    setLoading,
    setErrorMessage,
  };
};

export default useRequest;
