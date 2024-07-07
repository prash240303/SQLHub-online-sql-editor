import {
  Td,
  Th,
  Tr,
  Box,
  Table,
  TableCaption,
  Thead,
  Tbody,
  Text,
} from "@chakra-ui/react";
import React from "react";

interface OutputTableProps {
  data: Record<string, any>[];
}

const OutputTable: React.FC<OutputTableProps> = ({ data }) => {
  if (data.length === 0) {
    return <Text>Write a query to see tabular results</Text>;
  }

  const headerItems = Object.keys(data[0]);

  return (
    <Box px={4} width={"100%"}>
      <Box overflowY="auto" overflowX="auto" maxH="50vh" maxW="100%">
        <Table variant="striped">
          <TableCaption>Resulting Query Table</TableCaption>
          <Thead position="sticky" top={0} zIndex="docked" bgColor="teal">
            <Tr>
              {headerItems.map((item, key) => (
                <Th fontWeight="extrabold" color="white" key={key}>
                  {item}
                </Th>
              ))}
            </Tr>
          </Thead>
          <Tbody height={"50vh"} overflowY={"scroll"}>
            {data.map((bodyItem, key) => (
              <Tr key={key}>
                {headerItems.map((item, subKey) => (
                  <Td key={subKey}>{bodyItem[item]}</Td>
                ))}
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Box>
    </Box>
  );
};

export default OutputTable;
