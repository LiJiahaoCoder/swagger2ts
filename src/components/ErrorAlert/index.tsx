interface Props {
  errorMessage: string;
  setErrorMessage: (msg: string) => void;
}

const ErrorAlert = ({ errorMessage, setErrorMessage }: Props) => {
  const handleCloseAlert = () => {
    setErrorMessage('');
  };

  return errorMessage ? (
    <div
      className={`position-fixed w-100 bottom-0 start-0 alert alert-warning alert-dismissible mb-0 fade${
        errorMessage ? ' show' : ''
      }`}
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
    </div>
  ) : null;
};

export default ErrorAlert;
