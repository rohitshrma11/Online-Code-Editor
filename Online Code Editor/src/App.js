import React, { useState, useEffect } from "react";
import Editor from "./components/Editor";
import useLocalStorage from "./hooks/useLocalStorage";

function App() {
  const [html, setHtml] = useLocalStorage("html", "");
  const [css, setCss] = useLocalStorage("css", "");
  const [javascript, setJavascript] = useLocalStorage("javascript", "");
  const [srcDoc, setSrcDoc] = useState("");
  // Inside App.js
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    setIsSaving(true);
    const timeout = setTimeout(() => {
      setSrcDoc(`...`);
      setIsSaving(false);
    }, 250);
    return () => clearTimeout(timeout);
  }, [html, css, javascript]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setSrcDoc(`
        <html>
          <body>${html}</body>
          <style>${css}</style>
          <script>${javascript}</script>
        </html>
      `);
    }, 250);
    return () => clearTimeout(timeout);
  }, [html, css, javascript]);

  return (
    <div className="app">
      {/* Add heading here */}
      <h1 className="main-heading">
        🖊️ Online Code Editor{" "}
        {isSaving && <span className="saving">Saving...</span>}
      </h1>

      <div className="pane top-pane">
        <Editor launguage="xml" label="HTML" value={html} onChange={setHtml} />
        <Editor launguage="css" label="CSS" value={css} onChange={setCss} />
        <Editor
          launguage="javascript"
          label="JavaScript"
          value={javascript}
          onChange={setJavascript}
        />
      </div>
      <div className="bottom-pane">
        <iframe
          srcDoc={srcDoc}
          title="output"
          sandbox="allow-scripts"
          frameBorder="0"
          width="100%"
          height="100%"
        ></iframe>
      </div>
    </div>
  );
}

export default App;
