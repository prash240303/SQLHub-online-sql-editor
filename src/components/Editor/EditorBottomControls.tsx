import React, { useRef } from "react";
import { Input, Button } from "@chakra-ui/react";
// import { Button } from "../ui/button";
import QueriesDrawer from "../Queries/QueriesDrawer";
import { AiFillCaretRight } from "react-icons/ai";
import { BsFillFileEarmarkArrowUpFill } from "react-icons/bs";

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

  return (
    <div className="flex flex-col md:flex-row justify-between w-full mt-2 space-y-2 md:space-y-0 md:space-x-2">
      <QueriesDrawer
        usePredefinedQuery={usePredefinedQuery}
        displayText={true}
        setValue={setValue}
      />
      <div>
        <Input hidden id="import" name="import" type="file" ref={fileInput} />
        <Button onClick={() => fileInput.current?.click()} leftIcon={<BsFillFileEarmarkArrowUpFill />}>
          Import
        </Button>
      </div>
      <div className="flex flex-1 justify-end space-x-2">
        <Button leftIcon={<AiFillCaretRight />} onClick={SubmitQuery}>
          Run Query
        </Button>
        <Button onClick={ClearQuery}>
          Clear
        </Button>
      </div>
    </div>
  );
};

export default EditorBottomControls;
