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
    className="d-flex align-items-center justify-content-center m-3"
  >
    <button
      type="button"
      className="btn btn-secondary"
      disabled={loading || disabled}
      onClick={onClick}
      title="Transform"
    >
      {loading ? (
        <span
          className="spinner-border spinner-border-sm"
          role="status"
          aria-hidden="true"
        />
      ) : (
        <>
          <i className="fas fa-arrow-right d-none d-xl-inline-block mt-1" />
          <i className="fas fa-arrow-down d-xl-none mt-1" />
        </>
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
      <SearchInput
        value={url}
        loading={loading}
        onChange={handleInput}
        onFetch={handleFetch}
      />
      <section
        className="d-flex flex-column flex-xl-row justify-content-between mb-4"
      >
        <Editor
          type="json"
          title="Swagger Schema"
          value={schemaString}
        />
        <TransformButton
          loading={transforming}
          disabled={!schema || transforming}
          onClick={handleTransform}
        />
        <Editor
          showDownload
          type="typescript"
          title="TypeScript Types"
          value={ts}
        />
      </section>
    </main>
  );
};

export default PageContent;
