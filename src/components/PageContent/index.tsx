import { Schema } from '@/typings/schema';
import SearchInput from './SearchInput';
import Editor from './Editor';

interface TransformButtonProps {
  loading: boolean;
  disabled: boolean;
}

const TransformButton = ({ loading, disabled }: TransformButtonProps) => (
  <div
    className="d-flex align-items-center
"
  >
    <button
      type="button"
      className="btn btn-secondary"
      disabled={loading || disabled}
    >
      {loading ?
         <span
          className="spinner-border spinner-border-sm" role="status"
          aria-hidden="true"
        />:
        <i className="fas fa-arrow-right mt-1" />}
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
      <div className="shadow input-group mt-5 mb-4 w-100">
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
          title={<>Swagger Schema <code className='ms-2 bg-light p-1 rounded-1 fs-5'>json</code></>}
          value={schema ? JSON.stringify(schema) : ''}
        />
        <TransformButton loading={false} disabled={!schema} />
        <Editor
          type="typescript"
          title={<>TypeScript Types <code className='ms-2 bg-light p-1 rounded-1 fs-5'>typescript</code></>}
          value=""
        />
      </section>
    </main>
  );
};

export default PageContent;
