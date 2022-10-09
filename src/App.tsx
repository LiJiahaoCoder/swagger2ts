import { useState } from 'react';
import PageHeader from '@/components/PageHeader';
import PageContent from '@/components/PageContent';
import PageFooter from '@/components/PageFooter';
import ErrorAlert from '@/components/ErrorAlert';
import useSchema from '@/hooks/useSchema';

const App = () => {
  const [url, setUrl] = useState('');
  const {
    loading,
    errorMessage,
    result,
    request,
    setErrorMessage,
  } = useSchema();

  const handleFetch = () => {
    request(url.trim());
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
      <PageFooter />
      <ErrorAlert
        errorMessage={errorMessage}
        setErrorMessage={setErrorMessage}
      />
    </>
  );
};

export default App;
