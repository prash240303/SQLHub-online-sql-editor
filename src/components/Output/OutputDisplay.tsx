import React, { useEffect, useState } from "react";
import OutputTable from "./OutputTable";
import QueryMap from "@/app/data/queries";
import CsvDownloadButton from "react-json-to-csv";
import { BsFillFileEarmarkArrowDownFill } from "react-icons/bs";
import toast, { Toaster } from "react-hot-toast";
import { Button } from "../ui/button";

export default function OutputDisplay({
  submittedQuery,
  loading,
  setLoading,
}: {
  submittedQuery: string;
  loading: boolean;
  setLoading: (loading: boolean) => void;
}) {
  const [results, setResults] = useState<any[]>([]);
  const [filename, setFilename] = useState("");
  const [queryTime, setQueryTime] = useState<string>();
  const [rowsAffected, setRowsAffected] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [schema, setSchema] = useState<{ [key: string]: string[] }>({});

  useEffect(() => {
    let startTime = performance.now();
    const executeQuery = () => {
      setError(null);
      if (submittedQuery === "") {
        setResults([]);
        setRowsAffected(0);
        return;
      }

      try {
        console.log("Submitted Query:", submittedQuery);

        const normalizedQuery = submittedQuery.trim().toUpperCase();

        if (normalizedQuery.startsWith("SELECT")) {
          handleSelectQuery(normalizedQuery);
        } else if (normalizedQuery.startsWith("CREATE TABLE")) {
          handleCreateTable(normalizedQuery);
        } else if (normalizedQuery.startsWith("DROP TABLE")) {
          handleDropTable(normalizedQuery);
        } else if (normalizedQuery.startsWith("ALTER TABLE")) {
          handleAlterTable(normalizedQuery);
        } else {
          throw new Error("Unsupported SQL command");
        }

        setLoading(false);
        let endTime = performance.now();
        setQueryTime((endTime - startTime).toFixed(2) + " ms");
      } catch (err: any) {
        handleError(err.message);
      }
    };

    const handleSelectQuery = (query: string) => {
      const tableNameMatch = query.match(/FROM\s+(\w+)/i);
      if (!tableNameMatch) {
        throw new Error("Invalid SELECT query: Unable to extract table name.");
      }
    
      const tableName = tableNameMatch[1].toUpperCase();
      const queryIndex = QueryMap.findIndex((o) => o.tableQuery === tableName);
    
      if (queryIndex === -1) {
        throw new Error(`Table "${tableName}" not found.`);
      }
    
      const queryData = QueryMap[queryIndex].data;
      const queryFieldsMatch = query.match(/SELECT\s+(.+?)\s+FROM/i);
      const queryFields = queryFieldsMatch
        ? queryFieldsMatch[1].split(",").map((field) => field.trim())
        : [];
    
      const whereClauseMatch = query.match(/WHERE\s+(.+)$/i);
      const whereClause = whereClauseMatch ? whereClauseMatch[1] : null;
    
      let filteredData = queryData;
    
      if (whereClause) {
        const comparisonMatch = whereClause.match(
          /(.*?)\s*(=|<>|<|>|<=|>=|LIKE)\s*(.*)/i
        );
        if (!comparisonMatch) {
          throw new Error("Invalid WHERE clause.");
        }
    
        const [, field, operator, rawValue] = comparisonMatch;
        const value = rawValue.replace(/['"`]/g, "");
        const convertedValue = isNaN(Number(value)) ? value : Number(value);
    
        filteredData = queryData.filter((row: any) => {
          const fieldKey = Object.keys(row).find(
            (key) => key.toLowerCase() === field.toLowerCase()
          );
          if (!fieldKey) {
            throw new Error(`Field "${field}" not found in table "${tableName}".`);
          }
    
          const rowValue = row[fieldKey];
    
          switch (operator.toUpperCase()) {
            case "=":
              return rowValue === convertedValue;
            case "<>":
              return rowValue !== convertedValue;
            case "<":
              return rowValue < convertedValue;
            case ">":
              return rowValue > convertedValue;
            case "<=":
              return rowValue <= convertedValue;
            case ">=":
              return rowValue >= convertedValue;
            case "LIKE":
              const regex = new RegExp(
                `^${value.replace(/%/g, ".*").replace(/_/g, ".")}$`,
                "i"
              );
              return regex.test(rowValue);
            default:
              throw new Error(`Unsupported operator "${operator}".`);
          }
        });
      }
    
      if (queryFields.length === 1 && queryFields[0] === "*") {
        setResults(filteredData || []);
      } else {
        const filteredResults = filteredData.map((row: any) => {
          const filteredRow: any = {};
          queryFields.forEach((field) => {
            const fieldKey = Object.keys(row).find(
              (key) => key.toLowerCase() === field.toLowerCase()
            );
            if (!fieldKey) {
              throw new Error(
                `Field "${field}" not found in table "${tableName}".`
              );
            }
            filteredRow[fieldKey] = row[fieldKey];
          });
          return filteredRow;
        });
        setResults(filteredResults || []);
      }
    
      setFilename(QueryMap[queryIndex].tableQuery);
      setRowsAffected(filteredData?.length || 0);
      toast.success("Your query has been executed successfully.", {
        duration: 2000,
        position: "bottom-center",
      });
    };
    
    const handleCreateTable = (query: string) => {
      const match = query.match(/CREATE TABLE (\w+) \((.*)\)/i);
      if (!match) {
        throw new Error("Invalid CREATE TABLE syntax");
      }
      const [, tableName, columnsString] = match;
      const columns = columnsString
        .split(",")
        .map((col) => col.trim().split(" ")[0]);
      setSchema((prevSchema) => ({ ...prevSchema, [tableName]: columns }));
      setResults([{ message: `Table ${tableName} created successfully` }]);
      setRowsAffected(0);
      toast.success(`Table ${tableName} created successfully.`, {
        duration: 2000,
        position: "bottom-center",
      });
    };

    const handleDropTable = (query: string) => {
      const match = query.match(/DROP TABLE (\w+)/i);
      if (!match) {
        throw new Error("Invalid DROP TABLE syntax");
      }
      const [, tableName] = match;
      setSchema((prevSchema) => {
        const newSchema = { ...prevSchema };
        delete newSchema[tableName];
        return newSchema;
      });
      setResults([{ message: `Table ${tableName} dropped successfully` }]);
      setRowsAffected(0);
      toast.success(`Table ${tableName} dropped successfully.`, {
        duration: 2000,
        position: "bottom-center",
      });
    };

    const handleAlterTable = (query: string) => {
      const match = query.match(/ALTER TABLE (\w+) ADD (\w+)/i);
      if (!match) {
        throw new Error("Invalid ALTER TABLE syntax");
      }
      const [, tableName, newColumn] = match;
      setSchema((prevSchema) => ({
        ...prevSchema,
        [tableName]: [...(prevSchema[tableName] || []), newColumn],
      }));
      setResults([{ message: `Table ${tableName} altered successfully` }]);
      setRowsAffected(0);
      toast.success(`Table ${tableName} altered successfully.`, {
        duration: 2000,
        position: "bottom-center",
      });
    };

    const handleError = (message: string) => {
      setError(message);
      setResults([]);
      setRowsAffected(0);
      toast.error(message, {
        duration: 4000,
        position: "bottom-center",
      });
    };

    executeQuery();
  }, [submittedQuery, setLoading]);

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
      {loading ? (
        <div className="spinner"></div>
      ) : error ? (
        <div className="flex flex-col items-center justify-center p-4">
          <h1 className="text-xl font-semibold mt-4 text-red-600">Error</h1>
          <p>{error}</p>
        </div>
      ) : results.length > 0 ? (
        <>
          <div className="flex border-b border-gray-600 border-t flex-col md:flex-row justify-between items-center w-full p-4">
            <h2 className="text-3xl font-semibold text-center">Query Output</h2>
            <div className="flex items-center space-x-2 py-2 md:py-0">
              <Button
                variant={"outline"}
                className="text-green-600 border-green-600"
              >
                Rows Affected: {rowsAffected}
              </Button>
              <Button
                variant={"outline"}
                className="text-blue-600 border-blue-600 "
              >
                Query took: {queryTime}
              </Button>
              <div className="flex space-x-2">
                <CsvDownloadButton data={results} filename={`${filename}.csv`}>
                  <Button
                    variant={"outline"}
                    className="flex items-center space-x-2"
                  >
                    <BsFillFileEarmarkArrowDownFill className="mr-2" />
                    Export CSV
                  </Button>
                </CsvDownloadButton>
                <Button
                  variant={"outline"}
                  onClick={exportToJSON}
                  className="flex items-center space-x-2"
                >
                  <BsFillFileEarmarkArrowDownFill className="mr-2" />
                  Export JSON
                </Button>
              </div>
            </div>
          </div>
          <OutputTable data={results} />
        </>
      ) : (
        <div className="flex flex-col items-center justify-center p-4">
          <h1 className="text-xl font-semibold mt-4">
            Nothing to show at the moment
          </h1>
          <p>Run a query first to see the resulting table</p>
        </div>
      )}
    </>
  );
}
