import { Schema } from '@/typings/schema';
import useRequest from './useRequest';

const useSchema = () => {
  const { loading, errorMessage, result, request } = useRequest<Schema>();

  return {
    loading,
    errorMessage,
    result,
    request,
  };
};

export default useSchema;
