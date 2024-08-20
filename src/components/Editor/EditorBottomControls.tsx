import React, { useRef } from "react";
import { Button } from "../ui/button";
import QueriesDrawer from "../Queries/QueriesDrawer";
import { Input } from "../ui/input";
import { PlayCircle } from "lucide-react";

interface EditorBottomControlsProps {
  SubmitQuery: () => void;
  ClearQuery: () => void;
  usePredefinedQuery: (value: string) => void;
  setValue: (value: string) => void;
}

const EditorBottomControls: React.FC<EditorBottomControlsProps> = ({
  SubmitQuery,
  ClearQuery,
  usePredefinedQuery,
  setValue,
}) => {
  const fileInput = useRef<HTMLInputElement | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      console.log("File selected:", file);
      // You can read the file content and process it as needed
      const reader = new FileReader();
      reader.onload = (e) => {
        const text = e.target?.result;
        console.log("File content:", text);
        // You can use setValue to set the content to your query editor
        // setValue(text as string);
      };
      reader.readAsText(file);
    }
  };

  return (
    <div className="flex flex-col md:flex-row justify-between border-t border-neutral-300 bg-white dark:bg-gray-800 w-full p-3 space-y-2 md:space-y-0 md:space-x-2">
      <QueriesDrawer
        usePredefinedQuery={usePredefinedQuery}
        displayText={true}
        setValue={setValue}
      />
      <div>
        <Input
          id="import"
          name="import"
          type="file"
          ref={fileInput}
          onChange={handleFileChange}
          className="hidden"
        />
        <Button variant={'outline'} onClick={() => fileInput.current?.click()}>
          Import Table
        </Button>
      </div>
      <div className="flex flex-1 font-semibold justify-end space-x-2">
        <Button className="bg-green-500 font-semibold text-white hover:bg-green-600" onClick={SubmitQuery}>
          Run
          <PlayCircle className="ml-1 h-4 w-4" />
        </Button>
        <Button variant={'outline'} onClick={ClearQuery}>
          Clear
        </Button>
      </div>
    </div>
  );
};

export default EditorBottomControls;
