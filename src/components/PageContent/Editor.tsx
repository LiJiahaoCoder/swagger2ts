import {
  useState,
  useEffect,
  useCallback,
  useContext,
} from 'react';
import AceEditor, { IAceEditorProps } from 'react-ace';
import { formatJSON } from '@/utils/formatter';
import { copy } from '@/utils/clipboard';
import ctx from '@/store';
import EditorTitle from './EditorTitle';

import 'ace-builds/src-noconflict/mode-json';
import 'ace-builds/src-noconflict/mode-typescript';
import 'ace-builds/src-noconflict/theme-xcode';

interface Props {
  type: 'json' | 'typescript';
  value: string;
  title: string;
  readOnly?: boolean;
  showDownload?: boolean;
}

const EDITOR_PROPS: IAceEditorProps = {
  width: '100%',
  height: '600px',
  className: 'shadow border rounded-1',
  theme: 'xcode',
  editorProps: { $blockScrolling: true },
};

const formatters: Record<'json' | 'typescript', (content: string) => string> = {
  json: formatJSON,
  typescript: function (content: string) {
    return content;
  },
};

const getContentBlob = (formattedValue: string) => {
  const blob = new Blob([formattedValue]);
  return URL.createObjectURL(blob);
};

const Editor = ({
  type,
  value,
  title,
  readOnly = true,
  showDownload,
}: Props) => {
  const [formattedValue, setFormattedValue] = useState('');
  const { setSchema } = useContext(ctx);
  const actionDisabled = !Boolean(formattedValue);
  const actionCursor = {
    cursor: actionDisabled ? 'not-allowed' : 'pointer',
  };

  const handleCopy = () => {
    if (!formattedValue) return;

    void copy(formattedValue);
  };

  const handleChange = useCallback((value: string) => {
    setSchema?.(JSON.parse(value));
  }, []);

  useEffect(() => {
    setFormattedValue(formatters[type](value));
  }, [value]);

  return (
    <div
      style={{ flex: '1' }}
    >
      <div className="d-flex justify-content-between align-items-center">
        <h3 className="display-6 fs-3">
          <EditorTitle title={title} lang={type} />
        </h3>
        <div>
          {
            showDownload && (
              <a
                className="pe-3"
                href={
                  actionDisabled ?
                    'void: 0' :
                    getContentBlob(formattedValue)
                }
                download="type.ts"
                style={actionCursor}
              >
                <i
                  className="fas fa-download text-secondary"
                  title="Download TypeScript file⏬"
                />
              </a>
            )
          }
          <a
            href="void: 0"
            style={actionCursor}
            onClick={actionDisabled ? undefined : handleCopy}
          >
            <i className="far fa-copy fs-5 text-secondary" title="Copy content📖" />
          </a>
        </div>
      </div>
      <AceEditor
        {...EDITOR_PROPS}
        readOnly={readOnly}
        mode={type}
        name={type}
        value={formattedValue}
        onChange={handleChange}
      />
    </div>
  );
};

export default Editor;
