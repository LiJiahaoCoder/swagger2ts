const SearchInput = () => {
  return (
    <>
      <input
        className="form-control"
        type="text"
        placeholder="Please input request URL of swagger.json"
        aria-label="Please input request URL of swagger.json"
        aria-describedby="button-addon2"
      />
      <button
        className="btn btn-outline-secondary"
        type="button"
        id="button-addon2"
      >
        Fetch
      </button>
    </>
  );
};

export default SearchInput;
