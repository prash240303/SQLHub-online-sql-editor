import React, { useEffect, useState } from "react";
import OutputTable from "./OutputTable";
import {
  Button,
  Heading,
  Image,
  Spacer,
  Spinner,
  Text,
  VStack,
  Stack,
  useToast,
  Flex,
} from "@chakra-ui/react";
import QueryMap from "@/app/data/queries";
import CsvDownloadButton from 'react-json-to-csv';
import { BsFillFileEarmarkArrowDownFill } from "react-icons/bs";

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
  const toast = useToast();

  useEffect(() => {
    let startTime = performance.now();
    const selectResults = () => {
      if (submittedQuery === "") {
        setResults([]);
        setRowsAffected(0);
        return;
      }
      const queryIndex = QueryMap.findIndex((o) => o.query === submittedQuery);
      if (queryIndex === -1) {
        setResults([]);
        setRowsAffected(0);
      } else {
        const queryData = QueryMap[queryIndex].data;
        setResults(queryData || []);
        setFilename(QueryMap[queryIndex].tableQuery);
        setRowsAffected(queryData?.length || 0);
      }
    };
    selectResults();
    setLoading(false);
    let endTime = performance.now();
    setQueryTime((endTime - startTime).toFixed(2) + " ms");

    if (submittedQuery !== "") {
      toast({
        title: "Query Run Successfully",
        description: "Your query has been executed successfully.",
        status: "success",
        duration: 2000,
        isClosable: true,
        colorScheme: "blue",
      });
    }
  }, [submittedQuery, setLoading, toast]);

  if (loading) {
    return <Spinner thickness="4px" size="xl" />;
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
      {results.length > 0 ? (
        <>
          <Stack
            direction={["column", "column", "row"]}
            w={"100%"}
            px={4}
            justifyContent={"space-between"}
          >
            <Heading textAlign="center" fontSize={"3xl"}>
              Query Output
            </Heading>
            <Spacer />
            <Flex
              justify={"center"}
              align={"center"}
              direction={["column-reverse", "row"]}
            >
              <Button colorScheme="blue" mr={2} cursor={"initial"} size={"xs"}>
                Rows Affected: {rowsAffected}
              </Button>
              <Button colorScheme="blue" mr={2} cursor={"initial"} size={"xs"}>
                Query took: {queryTime}
              </Button>
              <Flex justify={"space-between"} py={[2, 0]}>
                <CsvDownloadButton data={results} filename={`${filename}.csv`}>
                  <Button
                    leftIcon={<BsFillFileEarmarkArrowDownFill />}
                    colorScheme="blue"
                    size={["sm", "md"]}
                  >
                    Export CSV
                  </Button>
                </CsvDownloadButton>
                <Button
                  ml={2}
                  onClick={exportToJSON}
                  leftIcon={<BsFillFileEarmarkArrowDownFill />}
                  colorScheme="blue"
                  size={["sm", "md"]}
                >
                  Export JSON
                </Button>
              </Flex>
            </Flex>
          </Stack>
          <OutputTable data={results} />
        </>
      ) : (
        <VStack justifyContent="center" p={4}>
          <Image
            src='/assets/screenshots/girlwithlaptop.png'
            alt="Girl With Laptop"
            maxH="300px"
          />
          <Heading as="h1" fontSize="xl" mt={4}>
            Nothing to show at the moment
          </Heading>
          <Text>Run a query first to see resulting table</Text>
        </VStack>
      )}
    </>
  );
};

export default OutputDisplay;
