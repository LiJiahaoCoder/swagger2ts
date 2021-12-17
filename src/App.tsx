import { useState } from 'react';
import PageHeader from '@/components/PageHeader';
import PageContent from '@/components/PageContent';
import useSchema from '@/hooks/useSchema';

const App = () => {
  const [url, setUrl] = useState('');
  const { loading, errorMessage, result, request } = useSchema();

  const handleFetch = () => {
    request(url);
  };

  return (
    <>
      <PageHeader />
      <PageContent
        url={url}
        loading={loading}
        schema={result}
        setUrl={setUrl}
        fetch={handleFetch}
      />
    </>
  );
};

export default App;
