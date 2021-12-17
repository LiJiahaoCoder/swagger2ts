import SearchInput from './SearchInput';
import Editor from './Editor';

const TransformButton = () => (
  <div
    className="d-flex align-items-center
"
  >
    <button type="button" className="btn btn-secondary">
      <i className="fas fa-hand-point-right fs-4" />
    </button>
  </div>
);

const PageContent = () => {
  return (
    <main className="container">
      <div className="input-group my-5 w-100">
        <SearchInput />
      </div>
      <section className="d-flex justify-content-between">
        <Editor type="json" />
        <TransformButton />
        <Editor type="typescript" />
      </section>
    </main>
  );
};

export default PageContent;
