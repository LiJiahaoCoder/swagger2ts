import { createContext, Dispatch, SetStateAction } from 'react';
import { Schema } from '@/typings/schema';

interface Store {
  loading: boolean;
  url: string;
  schema: Schema | null;
  setLoading?: Dispatch<SetStateAction<boolean>>;
  setUrl?: Dispatch<SetStateAction<string>>;
  setSchema?: Dispatch<SetStateAction<Schema | null>>;
}

const ctx = createContext<Store>({
  loading: false,
  url: '',
  schema: null,
  setLoading: undefined,
  setUrl: undefined,
  setSchema: undefined,
});

export default ctx;
