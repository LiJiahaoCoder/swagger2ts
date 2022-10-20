import { useEffect, useState, useContext } from 'react';
import { parse } from '@/utils/parser';
import ctx from '@/store';
import SearchInput from './SearchInput';
import Editor from './Editor';
import TransformButton from './TransformButton';

interface Props {
  fetch: () => void;
}

const PageContent = ({ fetch }: Props) => {
  const [ts, setTs] = useState('');
  const [transforming, setTransforming] = useState(false);
  const { schema } = useContext(ctx);
  const schemaString = schema ? JSON.stringify(schema) : '';

  const handleTransform = () => {
    if (!schema) return;

    setTransforming(true);
    setTs(parse(schema));
    setTransforming(false);
  };

  useEffect(() => {
    console.log(schema);
  }, [schema]);

  return (
    <main className="container">
      <SearchInput onFetch={fetch} />
      <section
        className="d-flex flex-column flex-xl-row justify-content-between mb-4"
      >
        <Editor
          readOnly={false}
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
