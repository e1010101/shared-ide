import logo from "./logo.svg";
import "./App.css";
import { useRef, useState } from "react";
import Editor from "@monaco-editor/react";
import * as Y from "yjs";
import { WebrtcProvider } from "y-webrtc";
import { MonacoBinding } from "y-monaco";

function App() {
  const editorRef = useRef(null);

  function handleEditorDidMount(editor, monaco) {
    editorRef.current = editor;

    const doc = new Y.Doc();

    const provider = new WebrtcProvider("test-room", doc);

    const type = doc.getText("monaco");

    const binding = new MonacoBinding(
      type,
      editorRef.current.getModel(),
      new Set([editorRef.current]),
      provider.awareness
    );
  }

  return (
    <div>
      <Editor
        height="100vh"
        width="100vh"
        theme="vs-dark"
        onMount={handleEditorDidMount}
        language="python"
      />
    </div>
  );
}

export default App;
