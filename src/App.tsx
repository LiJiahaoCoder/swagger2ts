import { useState } from 'react';
import PageHeader from '@/components/PageHeader';
import PageContent from '@/components/PageContent';
import useSchema from '@/hooks/useSchema';

const App = () => {
  const [url, setUrl] = useState('');
  const { loading, errorMessage, result, request, setErrorMessage } = useSchema();

  const handleFetch = () => {
    request(url);
  };

  const handleCloseAlert = () => {
    setErrorMessage('');
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
      {errorMessage && <div
        className={`position-fixed w-100 bottom-0 start-0 alert alert-warning alert-dismissible mb-0 fade${errorMessage ? ' show' : ''}`}
        role="alert"
      >
      {errorMessage}
        <button
          type="button"
          className="btn-close"
          data-bs-dismiss="alert"
          aria-label="Close"
          onClick={handleCloseAlert}
        />
      </div>}
    </>
  );
};

export default App;
