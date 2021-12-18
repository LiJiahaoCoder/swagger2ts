import { useState, useEffect, ReactNode } from 'react';
import AceEditor from 'react-ace';
import { formatJSON } from '@/utils/formatter';

import 'ace-builds/src-noconflict/mode-json';
import 'ace-builds/src-noconflict/mode-typescript';
import 'ace-builds/src-noconflict/theme-xcode';

interface Props {
  type: 'json' | 'typescript';
  value: string;
  title?: ReactNode;
}

const formatters: Record<'json' | 'typescript', (content: string) => string> = {
  json: formatJSON,
  typescript: function (content: string) {
    return content;
  },
};

const Editor = ({ type, value, title }: Props) => {
  const [formattedValue, setFormattedValue] = useState('');

  useEffect(() => {
    setFormattedValue(formatters[type](value));
  }, [value]);

  return (
    <div>
      <h3 className="display-6 fs-3">{title}</h3>
      <AceEditor
        readOnly
        width="550px"
        height="600px"
        className="shadow border rounded-1"
        mode={type}
        theme="xcode"
        name={type}
        value={formattedValue}
        editorProps={{ $blockScrolling: true }}
      />
    </div>
  );
};

export default Editor;
