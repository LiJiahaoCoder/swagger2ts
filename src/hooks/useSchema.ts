import { Schema } from '@/typings/schema';
import useRequest from './useRequest';

const useSchema = () => {
  const { loading, error, result, request } = useRequest<Schema>();

  return {
    loading,
    error,
    result,
    request,
  };
};

export default useSchema;
