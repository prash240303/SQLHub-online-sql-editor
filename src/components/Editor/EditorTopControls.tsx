import React from "react";
import { BsArrowsFullscreen, BsFullscreenExit } from "react-icons/bs";
import { FaHistory } from "react-icons/fa";

interface EditorTopControlsProps {
  setTheme: (theme: string) => void;
  isFullScreen: boolean;
  setIsFullScreen: (isFullScreen: boolean) => void;
}

const EditorTopControls: React.FC<EditorTopControlsProps> = ({
  setTheme,
  isFullScreen,
  setIsFullScreen,
}) => {
  const themes = [
    "sqlserver",
    "ambiance",
    "chaos",
    "chrome",
    "clouds",
    "cobalt",
    "github",
    "monokai",
    "solarized_dark",
    "solarized_light",
    "terminal",
    "tomorrow",
    "xcode",
  ];

  const handleFullScreenToggle = () => {
    setIsFullScreen(!isFullScreen);
  };

  return (
    <div className="flex justify-between text-black w-full mb-2">
      <div className="flex items-center gap-2 justify-center">
        <button
          aria-label="Fullscreen"
          onClick={handleFullScreenToggle}
          className="p-2 bg-gray-200 w-8 text-black h-8 rounded-md hover:bg-gray-300"
        >
          {!isFullScreen ? <BsArrowsFullscreen /> : <BsFullscreenExit />}
        </button>
        <div className="flex-grow" />
        {isFullScreen && (
          <button
            aria-label="History"
            onClick={handleFullScreenToggle}
            className="p-2 bg-gray-200 rounded-md hover:bg-gray-300"
          >
            <FaHistory />
          </button>
        )}
      </div>
      <div className="flex items-center">
        <span className="font-bold text-white">Theme</span>
        <select
          aria-label="Theme options"
          onChange={(e) => setTheme(e.currentTarget.value)}
          className="ml-2 p-2 border border-gray-300 rounded-md"
        >
          <option defaultValue="sqlserver" disabled>
            Select
          </option>
          {themes.map((item, key) => (
            <option key={key} value={item}>
              {item}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default EditorTopControls;
