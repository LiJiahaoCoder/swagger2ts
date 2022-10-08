import { useState } from 'react';
import { Schema } from '@/typings/schema';
import { parse } from '@/utils/parser';
import SearchInput from './SearchInput';
import Editor from './Editor';
import TransformButton from './TransformButton';

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
