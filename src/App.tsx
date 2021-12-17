import AceEditor from 'react-ace';
import PageHeader from '@/components/PageHeader';

import 'ace-builds/src-noconflict/mode-json';
import 'ace-builds/src-noconflict/mode-typescript';
import 'ace-builds/src-noconflict/theme-xcode';

const App = () => {
  return (
    <>
      <PageHeader />
      <main className="container">
        <div className="input-group my-5 w-100">
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
        </div>
        <section className="d-flex justify-content-between">
          <AceEditor
            readOnly
            style={{ width: 550, height: 600 }}
            mode="json"
            theme="xcode"
            name="Json"
            editorProps={{ $blockScrolling: true }}
          />
          <div
            className="d-flex align-items-center
"
          >
            <button type="button" className="btn btn-secondary">
              <i className="fas fa-hand-point-right fs-4" />
            </button>
          </div>
          <AceEditor
            readOnly
            style={{ width: 550, height: 600 }}
            mode="typescript"
            theme="xcode"
            name="TypeScript"
            editorProps={{ $blockScrolling: true }}
          />
        </section>
      </main>
    </>
  );
};

export default App;
