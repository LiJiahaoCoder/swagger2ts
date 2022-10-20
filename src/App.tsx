import { useState } from 'react';
import PageHeader from '@/components/PageHeader';
import PageContent from '@/components/PageContent';
import PageFooter from '@/components/PageFooter';
import ErrorAlert from '@/components/ErrorAlert';
import useSchema from '@/hooks/useSchema';
import ctx from '@/store';

const App = () => {
  const [url, setUrl] = useState('');
  const {
    loading,
    result,
    errorMessage,
    setResult,
    setLoading,
    setErrorMessage,
    request,
  } = useSchema();

  const handleFetch = () => {
    request(url.trim());
  };

  return (
    <ctx.Provider
      value={{
        loading,
        url,
        schema: result,
        setLoading,
        setUrl,
        setSchema: setResult,
      }}
    >
      <PageHeader />
      <PageContent fetch={handleFetch} />
      <PageFooter />
      <ErrorAlert
        errorMessage={errorMessage}
        setErrorMessage={setErrorMessage}
      />
    </ctx.Provider>
  );
};

export default App;
