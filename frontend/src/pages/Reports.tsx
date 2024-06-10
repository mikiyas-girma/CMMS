import React, { useState } from "react";
import SidebarWithHeader from "../components/sidebar/SidebarWithHeader";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {
  Button,
  HStack,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
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
  useDisclosure,
} from "@chakra-ui/react";
import { BeatLoader } from "react-spinners";


const Reports = () => {
  const [show, setShow] = useState(false);
  const handleChange = (date) => setSelectedDate(date);
  const [selectedDate, setSelectedDate] = useState(null);
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

          <Stack date-rangepicker className="flex items-center" marginLeft='290px' >
            <h3>Select Date: <DatePicker
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Select date start"
              selected={selectedDate}
              onChange={handleChange}
              maxDate={new Date()}
              dateFormat="dd/MM/yyyy"
              isClearable
              showYearDropdown
              scrollableMonthYearDropdown
            
            ></DatePicker></h3>
            
          </Stack>


          <Button marginLeft="10px" colorScheme="blue" fontWeight="bold">
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
