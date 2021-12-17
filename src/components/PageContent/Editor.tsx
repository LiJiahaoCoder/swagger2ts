import AceEditor from 'react-ace';

import 'ace-builds/src-noconflict/mode-json';
import 'ace-builds/src-noconflict/mode-typescript';
import 'ace-builds/src-noconflict/theme-xcode';

interface Props {
  type: 'json' | 'typescript';
  value?: string;
}

const Editor = ({ type, value }: Props) => {
  return (
    <AceEditor
      readOnly
      style={{ width: 550, height: 600 }}
      mode={type}
      theme="xcode"
      name={type}
      value={value}
      editorProps={{ $blockScrolling: true }}
    />
  );
};

export default Editor;
