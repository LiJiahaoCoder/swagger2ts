import { useState } from 'react';
import { Schema } from '@/typings/schema';
import { parse } from '@/utils/parser';
import SearchInput from './SearchInput';
import EditorTitle from './EditorTitle';
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
      <SearchInput
        value={url}
        loading={loading}
        onChange={handleInput}
        onFetch={handleFetch}
      />
      <section className="d-flex justify-content-between">
        <Editor
          type="json"
          title={<EditorTitle title="Swagger Schema" lang="json" />}
          value={schemaString}
        />
        <TransformButton
          loading={transforming}
          disabled={!schema || transforming}
          onClick={handleTransform}
        />
        <Editor
          type="typescript"
          title={<EditorTitle title="TypeScript Types" lang="typescript" />}
          value={ts}
        />
      </section>
    </main>
  );
};

export default PageContent;
