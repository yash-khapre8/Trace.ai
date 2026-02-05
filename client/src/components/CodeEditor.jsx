import Editor from '@monaco-editor/react';

/**
 * Code Editor Component
 * Wrapper around Monaco Editor
 */

const CodeEditor = ({ value, onChange, language }) => {
  const handleEditorChange = (value) => {
    onChange(value || '');
  };

  return (
    <Editor
      height="500px"
      language={language}
      value={value}
      onChange={handleEditorChange}
      theme="vs-dark"
      options={{
        minimap: { enabled: false },
        fontSize: 14,
        lineNumbers: 'on',
        scrollBeyondLastLine: false,
        automaticLayout: true,
        tabSize: 2,
      }}
    />
  );
};

export default CodeEditor;
