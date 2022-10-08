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

export default TransformButton;
