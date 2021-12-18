import { useState } from 'react';
import { Schema } from '@/typings/schema';
import { parse } from '@/utils/parser';
import SearchInput from './SearchInput';
import Editor from './Editor';

interface TransformButtonProps {
  loading: boolean;
  disabled: boolean;
  onClick: () => void;
}

const TransformButton = ({
  loading,
  disabled,
  onClick,
}: TransformButtonProps) => (
  <div
    className="d-flex align-items-center
"
  >
    <button
      type="button"
      className="btn btn-secondary"
      disabled={loading || disabled}
      onClick={onClick}
    >
      {loading ? (
        <span
          className="spinner-border spinner-border-sm"
          role="status"
          aria-hidden="true"
        />
      ) : (
        <i className="fas fa-arrow-right mt-1" />
      )}
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

const PageContent = ({
  url,
  loading,
  schema,
  setUrl,
  fetch,
}: Props) => {
  const [ts, setTs] = useState('');
  const [transforming, setTransforming] = useState(false);
  const schemaString = schema ? JSON.stringify(schema) : '';
  
  const handleInput = (value: string) => {
    setUrl(value);
  };

  const handleTransform = () => {
    if (!schema) return;

    setTransforming(true);
    setTs(parse(schema));
    setTransforming(false);
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
          title={
            <>
              Swagger Schema
              <code className="ms-2 bg-light p-1 rounded-1 fs-5">json</code>
            </>
          }
          value={schemaString}
        />
        <TransformButton
          loading={transforming}
          disabled={!schema || transforming}
          onClick={handleTransform}
        />
        <Editor
          type="typescript"
          title={
            <>
              TypeScript Types
              <code className="ms-2 bg-light p-1 rounded-1 fs-5">
                typescript
              </code>
            </>
          }
          value={ts}
        />
      </section>
    </main>
  );
};

export default PageContent;
