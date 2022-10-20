import { Schema } from '@/typings/schema';
import useRequest from './useRequest';

const useSchema = () => {
  const {
    loading,
    errorMessage,
    result,
    request,
    setResult,
    setLoading,
    setErrorMessage
  } = useRequest<Schema>();

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

export default useSchema;
