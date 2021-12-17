import { useState, useEffect } from 'react';
import AceEditor from 'react-ace';
import { formatJSON } from '@/utils/format';

import 'ace-builds/src-noconflict/mode-json';
import 'ace-builds/src-noconflict/mode-typescript';
import 'ace-builds/src-noconflict/theme-xcode';

interface Props {
  type: 'json' | 'typescript';
  value: string | null;
}

const Editor = ({ type, value }: Props) => {
  const [formattedValue, setFormattedValue] = useState('');

  useEffect(() => {
    setFormattedValue(formatJSON(value));
  }, [value]);
  
  return (
    <AceEditor
      readOnly
      width='550px'
      height='600px'
      className='shadow border rounded-1'
      mode={type}
      theme="xcode"
      name={type}
      value={formattedValue}
      editorProps={{ $blockScrolling: true }}
    />
  );
};

export default Editor;
