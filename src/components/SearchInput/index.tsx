import { useContext } from 'react';
import ctx from '@/store';

interface Props {
  onFetch: () => void;
}

const SearchInput = ({ onFetch }: Props) => {
  const { url, loading, setUrl } = useContext(ctx);

  return (
    <div className="shadow input-group mt-5 mb-4 w-100">
      <input
        className="form-control"
        type="text"
        placeholder="Please input request URL of swagger.json"
        aria-label="Please input request URL of swagger.json"
        aria-describedby="input-search"
        value={url}
        disabled={loading}
        onChange={(e) => {
          setUrl?.(e.target.value);
        }}
      />
      <button
        className="btn btn-outline-secondary"
        type="button"
        id="input-search"
        disabled={loading || !url.trim()}
        onClick={onFetch}
      >
        {loading && (
          <span
            className="spinner-border spinner-border-sm me-1" role="status"
            aria-hidden="true"
          />
        )}
        Fetch
      </button>
    </div>
  );
};

export default SearchInput;
