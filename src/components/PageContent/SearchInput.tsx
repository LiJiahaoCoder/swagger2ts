interface Props {
  value: string;
  onChange: (value: string) => void;
  onFetch: () => void;
}

const SearchInput = ({ value, onChange, onFetch }: Props) => {
  return (
    <>
      <input
        className="form-control"
        type="text"
        placeholder="Please input request URL of swagger.json"
        aria-label="Please input request URL of swagger.json"
        aria-describedby="input-search"
        value={value}
        onChange={(e) => {
          onChange(e.target.value);
        }}
      />
      <button
        className="btn btn-outline-secondary"
        type="button"
        id="input-search"
        onClick={onFetch}
      >
        Fetch
      </button>
    </>
  );
};

export default SearchInput;
