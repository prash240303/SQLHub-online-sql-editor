import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface OutputTableProps {
  data: Record<string, any>[];
}

const OutputTable: React.FC<OutputTableProps> = ({ data }) => {
  if (data.length === 0) {
    return <p className="text-gray-500">Write a query to see tabular results</p>;
  }

  const headerItems = Object.keys(data[0]);

  return (
    <div className="w-full h-full overflow-y-auto">
      <div className="overflow-x-auto h-full">
        <Table>
          <TableHeader>
            <TableRow>
              {headerItems.map((item, key) => (
                <TableHead key={key}>{item}</TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((bodyItem, key) => (
              <TableRow key={key}>
                {headerItems.map((item, subKey) => (
                  <TableCell key={subKey} className="text-ellipsis truncate max-w-48">{bodyItem[item]}</TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default OutputTable;
