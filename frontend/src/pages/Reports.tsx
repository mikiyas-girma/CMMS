import React, { useState } from "react";
import SidebarWithHeader from "../components/sidebar/SidebarWithHeader";
import {
  Button,
  HStack,
  Input,
  Select,
  Stack,
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
  Text,
  Tfoot,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { BeatLoader } from "react-spinners";
<script src="../path/to/flowbite/dist/datepicker.js"></script>
const Reports = () => {
  const reportData = [
    {
      id: Math.floor(Math.random() * 10000),
      name: "Cement",
      quantity: "340 pcs",
      description: "The rusty swing creaked a melancholic ...",
    },
    {
      id: Math.floor(Math.random() * 10000),
      name: "Ceramic",
      quantity: "678 pcs",
      description: "Neon signs bled into the twilight, paint...",
    },
    {
      id: Math.floor(Math.random() * 10000),
      name: "Steel",
      quantity: "90 pcs",
      description: "The rusty swing creaked a melancholic tun...",
    },
    {
      id: Math.floor(Math.random() * 10000),
      name: "Pipes",
      quantity: "310 pcs",
      description: "whispering secrets of forgotten childhood la... ",
    },
    {
      id: Math.floor(Math.random() * 10000),
      name: "Windows",
      quantity: "909 pcs",
      description: "The abandoned library held its breath, its... ",
    },
    {
      id: Math.floor(Math.random() * 10000),
      name: "Bricks",
      quantity: "1100 pcs",
      description: "Its dusty shelves pregnant with untold sto.... ",
    },
  ];
  const [report, setReport] = useState(reportData);
  return (
    <div>
      <SidebarWithHeader>
        <Text padding="10px" marginLeft="50px" fontSize="27px" as="b">
          Generate Report
        </Text>
        <HStack padding="20px" marginLeft="20px" marginTop="30px">
          <Select placeholder="Inventory Reports" width="200px">
            <option value="option1">Material Stock Report</option>
            <option value="option2">Material Usage Report</option>
            <option value="option3">Low Stock Report</option>
          </Select>

          <div date-rangepicker className="flex items-center">
            <div className="relative">
              <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                <svg
                  className="w-4 h-4 text-gray-500 dark:text-gray-400"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z" />
                </svg>
              </div>
              <input
                name="start"
                type="text"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Select date start"
              />
            </div>
            <span className="mx-4 text-gray-500">to</span>
            <div className="relative">
              <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                <svg
                  className="w-4 h-4 text-gray-500 dark:text-gray-400"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z" />
                </svg>
              </div>
              <input
                name="end"
                type="text"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Select date end"
              />
            </div>
          </div>

          <Button marginLeft="150px" colorScheme="blue" fontWeight="bold">
            Generate Report
          </Button>
        </HStack>
        <div>
          <TableContainer marginTop="50px">
            <Table variant="simple">
              <TableCaption>
                <button>Back To Top</button>
              </TableCaption>
              <Thead>
                <Tr>
                  <Th>ID</Th>
                  <Th>Item</Th>
                  <Th isNumeric>Quantity</Th>
                  <Th>Description</Th>
                  <Th></Th>
                </Tr>
              </Thead>
              <Tbody>
                {report.map((event) => (
                  <Tr>
                    <Td>{event.id}</Td>
                    <Td>{event.name}</Td>
                    <Td isNumeric>{event.quantity}</Td>
                    <Td>
                      <button>{event.description}see more</button>
                    </Td>
                    <Td>
                      <Button>See Comments</Button>
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </TableContainer>
        </div>
      </SidebarWithHeader>
    </div>
  );
};

export default Reports;
