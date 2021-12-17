interface Props {
  value: string;
  loading: boolean;
  onChange: (value: string) => void;
  onFetch: () => void;
}

const SearchInput = ({ value, loading, onChange, onFetch }: Props) => {
  return (
    <>
      <input
        className="form-control"
        type="text"
        placeholder="Please input request URL of swagger.json"
        aria-label="Please input request URL of swagger.json"
        aria-describedby="input-search"
        value={value}
        disabled={loading}
        onChange={(e) => {
          onChange(e.target.value);
        }}
      />
      <button
        className="btn btn-outline-secondary"
        type="button"
        id="input-search"
        disabled={loading}
        onClick={onFetch}
      >
        {loading && (
          <span
            className="spinner-border spinner-border-sm" role="status"
            aria-hidden="true"
          />
        )}
        Fetch
      </button>
    </>
  );
};

export default SearchInput;
