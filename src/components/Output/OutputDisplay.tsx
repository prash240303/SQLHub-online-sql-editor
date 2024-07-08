import React, { useEffect, useState } from "react";
import OutputTable from "./OutputTable";
import QueryMap from "@/app/data/queries";
import CsvDownloadButton from "react-json-to-csv";
import { BsFillFileEarmarkArrowDownFill } from "react-icons/bs";
import toast, { Toaster } from "react-hot-toast";
import Image from "next/image";

interface OutputDisplayProps {
  submittedQuery: string;
  loading: boolean;
  setLoading: (loading: boolean) => void;
}

const OutputDisplay: React.FC<OutputDisplayProps> = ({
  submittedQuery,
  loading,
  setLoading,
}) => {
  const [results, setResults] = useState<any[]>([]);
  const [filename, setFilename] = useState("");
  const [queryTime, setQueryTime] = useState<string>();
  const [rowsAffected, setRowsAffected] = useState(0);

  useEffect(() => {
    let startTime = performance.now();
    const selectResults = () => {
      if (submittedQuery === "") {
        setResults([]);
        setRowsAffected(0);
        return;
      }

      console.log("Submitted Query:", submittedQuery);

      // Extract the table name from the query
      const tableNameMatch = submittedQuery.match(/from (\w+)/i);
      const tableName = tableNameMatch ? tableNameMatch[1].toUpperCase() : "";

      console.log("Table Name:", tableName);

      const queryIndex = QueryMap.findIndex((o) => o.tableQuery === tableName);
      console.log("Query Index:", queryIndex);

      if (queryIndex === -1) {
        setResults([]);
        setRowsAffected(0);
      } else {
        const queryData = QueryMap[queryIndex].data;
        const queryFieldsMatch = submittedQuery.match(/select (.+) from/i);
        const queryFields = queryFieldsMatch
          ? queryFieldsMatch[1].split(",").map((field) => field.trim())
          : [];

        console.log("Query Fields:", queryFields);

        // If the query is "select *", return all data
        if (queryFields.length === 1 && queryFields[0] === "*") {
          setResults(queryData || []);
        } else {
          // Return only the specific fields requested
          const filteredResults = queryData.map((row: any) => {
            const filteredRow: any = {};
            queryFields.forEach((field) => {
              // Convert field to lower case to match key case in data
              const fieldKey = Object.keys(row).find(
                (key) => key.toLowerCase() === field.toLowerCase()
              );
              if (fieldKey) {
                filteredRow[fieldKey] = row[fieldKey];
              }
            });
            return filteredRow;
          });
          setResults(filteredResults || []);
        }

        setFilename(QueryMap[queryIndex].tableQuery);
        setRowsAffected(queryData?.length || 0);
      }
    };
    selectResults();
    setLoading(false);
    let endTime = performance.now();
    setQueryTime((endTime - startTime).toFixed(2) + " ms");

    if (submittedQuery !== "") {
      toast.success("Your query has been executed successfully.", {
        duration: 2000,
        position: "bottom-center",
      });
    }
  }, [submittedQuery, setLoading]);

  if (loading) {
    return <div className="spinner"></div>; // You can customize the spinner class in your CSS
  }

  const exportToJSON = () => {
    const element = document.createElement("a");
    const file = new Blob([JSON.stringify(results, null, 2)], {
      type: "application/json",
    });
    element.href = URL.createObjectURL(file);
    element.download = `${filename}.json`;
    document.body.appendChild(element);
    element.click();
  };

  return (
    <>
      <Toaster />
      {results.length > 0 ? (
        <>
          <div className="flex flex-col md:flex-row justify-between items-center w-full p-4">
            <h2 className="text-3xl font-semibold text-center">Query Output</h2>
            <div className="flex items-center space-x-2 py-2 md:py-0">

              {/* rows affected */}
              <button className="bg-blue-500 text-white py-1 px-2 rounded-md cursor-default text-xs">
                Rows Affected: {rowsAffected}
              </button>

              {/* query time */}
              <button className="bg-blue-500 text-white py-1 px-2 rounded-md cursor-default text-xs">
                Query took: {queryTime}
              </button>


              {/* dowload buttons */}
              <div className="flex space-x-2">
                <CsvDownloadButton data={results} filename={`${filename}.csv`}>
                  <button className="bg-blue-500 text-white py-1 px-4 rounded-md flex items-center">
                    <BsFillFileEarmarkArrowDownFill className="mr-2" />
                    Export CSV
                  </button>
                </CsvDownloadButton>
                <button
                  onClick={exportToJSON}
                  className="bg-blue-500 text-white py-1 px-4 rounded-md flex items-center"
                >
                  <BsFillFileEarmarkArrowDownFill className="mr-2" />
                  Export JSON
                </button>
              </div>

            </div>
          </div>

          <OutputTable data={results} />

        </>
      ) : (
        // when no query is running or no results to show
        <div className="flex flex-col items-center justify-center p-4">
          <Image
            width={100}
            height={100}
            src="/assets/screenshots/girlwithlaptop.png"
            alt="Girl With Laptop"
            className="max-h-72"
          />
          <h1 className="text-xl font-semibold mt-4">Nothing to show at the moment</h1>
          <p>Run a query first to see the resulting table</p>
        </div>
      )}
    </>
  );
};

export default OutputDisplay;
