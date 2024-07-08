import React from "react";
import { LuExpand, LuShrink } from "react-icons/lu";
import { FaHistory } from "react-icons/fa";
import { Button } from "../ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

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
    <div className="flex justify-between dark:bg-gray-800 bg-white text-black w-full border-b border-neutral-300 p-3">
      <div className="flex items-center gap-2 text-neutral-800 justify-center">
        <span className="font-bold dark:text-white text-xl">SQL Editor </span>
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
      <div className="flex items-center gap-3">
        <Button
          variant={"outline"}
          aria-label="Fullscreen"
          onClick={handleFullScreenToggle}
          className="dark:text-white text-black h-10"
        >
          {isFullScreen ? "Shrink" : "Fullscreen"}
          {!isFullScreen ? (
            <LuExpand className="ml-2 size-4" />
          ) : (
            <LuShrink className="ml-2" />
          )}
        </Button>

        <Select onValueChange={setTheme}>
          <SelectTrigger className="dark:text-white text-black h-10">
            <SelectValue placeholder="Select theme" />
          </SelectTrigger>
          <SelectContent>
            {themes.map((theme, key) => (
              <SelectItem key={key} value={theme}>
                {theme}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default EditorTopControls;
