'use client';

import React, { useEffect, useState } from "react";
import AceEditor from "react-ace";
import "ace-builds/src-min-noconflict/mode-mysql";
import "ace-builds/src-min-noconflict/ext-language_tools";
import "ace-builds/src-noconflict/theme-sqlserver";
import "ace-builds/src-noconflict/theme-github";
import "ace-builds/src-noconflict/theme-tomorrow";
import "ace-builds/src-noconflict/theme-xcode";
import "ace-builds/src-noconflict/theme-monokai";
import "ace-builds/src-noconflict/theme-ambiance";
import "ace-builds/src-noconflict/theme-chaos";
import "ace-builds/src-noconflict/theme-chrome";
import "ace-builds/src-noconflict/theme-clouds";
import "ace-builds/src-noconflict/theme-cobalt";
import "ace-builds/src-noconflict/theme-solarized_dark";
import "ace-builds/src-noconflict/theme-terminal";
import "ace-builds/src-noconflict/theme-solarized_light";
import EditorTopControls from "./EditorTopControls";
import EditorBottomControls from "./EditorBottomControls";

interface EditorProps {
  query: string;
  setQuery: (query: string) => void;
  runQuery: () => void;
  usePredefinedQuery: (value: string) => void;
  history: string[];
  setHistory: (history: string[]) => void;
  value: string;
  setValue: (value: string) => void;
  setSubmittedQuery: (query: string) => void;
  isFullScreen: boolean;
  setIsFullScreen: (isFullScreen: boolean) => void;
}

const Editor: React.FC<EditorProps> = ({
  query,
  setQuery,
  runQuery,
  usePredefinedQuery,
  history,
  setHistory,
  value,
  setValue,
  setSubmittedQuery,
  isFullScreen,
  setIsFullScreen,
}) => {
  const [theme, setTheme] = useState<string>("sqlserver");
  const [width, setWidth] = useState<string>("80%");
  const [maxLines, setMaxLines] = useState<number>(30);

  useEffect(() => {
    setMaxLines(isFullScreen ? 20 : 10);
    setWidth(isFullScreen ? "100%" : "80%");
  }, [isFullScreen]);

  const handleChange = (newValue: string) => {
    setQuery(newValue);
    setValue(newValue);
  };

  const handleRunQuery = () => {
    runQuery();
    setHistory([...history, query]);
  };

  return (
    <div className={`h-full w-full  flex items-start justify-start flex-col `}>
      <EditorTopControls
        setTheme={setTheme}
        isFullScreen={isFullScreen}
        setIsFullScreen={setIsFullScreen}
      />
      <AceEditor
        mode="mysql"
        aria-label="editor"
        theme={theme}
        onChange={handleChange}
        value={value}
        width="100%"
        name="editor"
        showGutter
        showPrintMargin={false}
        height="100%"
        placeholder="Write SQL query..."
        fontSize={16}
        minLines={30}
        setOptions={{
          enableBasicAutocompletion: true,
          enableLiveAutocompletion: true,
          enableSnippets: true,
        }}
      />
      <EditorBottomControls
        SubmitQuery={handleRunQuery}
        ClearQuery={() => setQuery("")}
        usePredefinedQuery={usePredefinedQuery}
        setValue={setValue}
      />
    </div>
  );
};

export default Editor;
