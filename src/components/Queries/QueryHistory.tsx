import React from "react";
import { BsCodeSquare } from "react-icons/bs";
import { MdDelete } from "react-icons/md";

interface QueryHistoryProps {
  history: string[];
  setQuery: (query: string) => void;
  setValue: (value: string) => void;
  setHistory: React.Dispatch<React.SetStateAction<string[]>>;
}

const QueryHistory: React.FC<QueryHistoryProps> = ({
  history,
  setQuery,
  setValue,
  setHistory,
}) => {
  const onClickHistory = (value: string) => {
    setQuery(value);
    setValue(value);
  };

  const handleRemoveHistory = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    historyItem: string
  ) => {
    e.stopPropagation();
    setHistory((prevHistory) =>
      prevHistory.filter((history) => history !== historyItem)
    );
  };

  return (
    <div className="w-full bg-white bg-opacity-50 p-2 h-full overflow-y-auto text-center shadow-lg">
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-2xl m-2">Queries History</h2>
        {history.length > 0 && (
          <button
            className="text-red-500 hover:text-red-700"
            aria-label="Delete All"
            onClick={() => setHistory([])}
          >
            <MdDelete />
          </button>
        )}
      </div>
      {history.length > 0 ? (
        <ul className="space-y-3 p-2">
          {history.map((item, id) => (
            <li
              className="bg-teal-200 p-3 rounded-md cursor-pointer flex justify-between items-center hover:bg-teal-500"
              onClick={() => onClickHistory(item)}
              key={`${item}---${id}`}
            >
              <BsCodeSquare className="mr-2" />
              <span className="flex-grow">{item}</span>
              <button
                className="text-red-500 hover:text-red-700"
                aria-label="Delete"
                onClick={(e) => handleRemoveHistory(e, item)}
              >
                <MdDelete />
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p>Execute a query first</p>
      )}
    </div>
  );
};

export default QueryHistory;
