import React, { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { BsFillArrowRightCircleFill } from "react-icons/bs";
import QueryMap from "@/app/data/queries";
import { AlignJustify, PencilIcon } from "lucide-react";
import { FaHamburger } from "react-icons/fa";

interface QueriesDrawerProps {
  usePredefinedQuery: (value: string) => void;
  displayText: boolean;
  setValue: (value: string) => void;
}

const QueriesDrawer: React.FC<QueriesDrawerProps> = ({
  usePredefinedQuery,
  displayText,
  setValue,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const drawerCloseRef = useRef<HTMLButtonElement>(null);

  const QueryOnclick = (value: string) => {
    usePredefinedQuery(value);
    setIsOpen(false); // Close the drawer
  };

  return (
    <>
      <Drawer open={isOpen} onOpenChange={setIsOpen} >
        <DrawerTrigger asChild>
          <Button aria-label="Available Tables" onClick={() => setIsOpen(true)}>
            {displayText ? "Available Tables" : ""}
            {displayText ? "" : <AlignJustify size={20}  />}
          </Button>
        </DrawerTrigger>
        <DrawerContent>
          <div className="mx-auto w-full max-w-sm">
            <DrawerHeader>
              <DrawerTitle>Available Queries</DrawerTitle>
              <DrawerDescription>Select a query to run.</DrawerDescription>
            </DrawerHeader>
            <div className="p-4 pb-0">
              <Accordion type="single" collapsible>
                {QueryMap.map((items, key) => (
                  <AccordionItem key={key} value={items.tableQuery}>
                    <AccordionTrigger className="flex justify-between items-center py-2 px-4">
                      <div className="flex items-center space-x-2">
                        <BsFillArrowRightCircleFill />
                        <span className="font-bold">{items.tableQuery}</span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className= "bg-neutral-100/20 p-1">
                      {items.tableFields.map((tablefieldData, index) => (
                        <div
                          key={index}
                          className="py-2 px-4 font-bold cursor-pointer rounded-md  hover:bg-neutral-200"
                          onClick={() => {
                            setValue(
                              "select " +
                              tablefieldData +
                              " from " +
                              items.tableQuery
                            );
                            QueryOnclick(
                              "select " +
                              tablefieldData +
                              " from " +
                              items.tableQuery
                            );
                          }}
                        >
                          {tablefieldData}
                        </div>
                      ))}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
            <DrawerFooter>
              <DrawerClose asChild>
                <Button variant="outline" ref={drawerCloseRef}>Close</Button>
              </DrawerClose>
            </DrawerFooter>
          </div>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default QueriesDrawer;
