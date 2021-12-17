import { Schema } from '@/typings/schema';
import useRequest from './useRequest';

const useSchema = () => {
  const { loading, errorMessage, result, request, setErrorMessage } = useRequest<Schema>();

  return {
    loading,
    errorMessage,
    result,
    request,
    setErrorMessage,
  };
};

export default useSchema;
