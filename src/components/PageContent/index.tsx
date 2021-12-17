import { Schema } from '@/typings/schema';
import SearchInput from './SearchInput';
import Editor from './Editor';

interface TransformButtonProps {
  loading: boolean;
}

const TransformButton = ({ loading }: TransformButtonProps) => (
  <div
    className="d-flex align-items-center
"
  >
    <button
      type="button"
      className="btn btn-secondary"
      disabled={loading}
    >
      {loading ?
         <span
          className="spinner-border spinner-border-sm" role="status"
          aria-hidden="true"
        />:
        <i className="fas fa-hand-point-right fs-4" />}
    </button>
  </div>
);

interface Props {
  url: string;
  schema: Schema | null;
  loading: boolean;
  setUrl: (url: string) => void;
  fetch: () => void;
}

const PageContent = ({ url, loading, schema, setUrl, fetch }: Props) => {
  const handleInput = (value: string) => {
    setUrl(value);
  };

  const handleFetch = () => {
    fetch();
  };

  return (
    <main className="container">
      <div className="shadow input-group my-5 w-100">
        <SearchInput
          value={url}
          loading={loading}
          onChange={handleInput}
          onFetch={handleFetch}
        />
      </div>
      <section className="d-flex justify-content-between">
        <Editor
          type="json"
          title={<>Swagger Schema <code className='ml-2 bg-light p-1 rounded-1 fs-5'>json</code></>}
          value={schema ? JSON.stringify(schema) : ''}
        />
        <TransformButton loading={loading} />
        <Editor
          type="typescript"
          title={<>TypeScript Types <code className='ml-2 bg-light p-1 rounded-1 fs-5'>typescript</code></>}
          value=""
        />
      </section>
    </main>
  );
};

export default PageContent;
