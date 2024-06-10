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
import { BeatLoader, PulseLoader } from "react-spinners";
import { generatereport } from "../utils/material";
<script src="../path/to/flowbite/dist/datepicker.js"></script>;
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
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const today = new Date().toISOString().split("T")[0];
  const [selectedOption, setSelectedOption] = useState("");
  const [backenderror, setBakendError] = useState("");
  const [Loading, setLoading] = useState("");
  const handleStartDateChange = (e) => {
    setStartDate(e.target.value);
  };

  const handleEndDateChange = (e) => {
    setEndDate(e.target.value);
  };

  const handleSelectChange = (e) => {
    setSelectedOption(e.target.value);
  };

  const handleGenerateReport = async () => {
    let url = "";
    if (selectedOption === "option1") {
      url = "addedmaterialreport";
    }
    if (selectedOption === "option2") {
      url = "removedmaterialreport";
    }

    setLoading(true);
    const response = await generatereport(url, startDate, endDate);
    console.log("report generated", response);
    setLoading(false);
    console.log("response", response);
    if (response?.error) {
      setBakendError(response?.error);
    }

    // if (response?.data?.status === "success") {
    //   Navigate("/materials");
    // }
  };
  //   console.log("dates", startDate, endDate);
  console.log("selected", selectedOption);
  return (
    <div>
      <SidebarWithHeader>
        <Text as="b">Generate Report</Text>
        <HStack
          spacing={{ base: 2, md: 4 }} // Adjust spacing based on screen size
          align="center" // Ensure items are centered
          wrap="wrap" // Allow items to wrap in smaller screens
        >
          <Select
            placeholder="Inventory Reports"
            width={{ base: "100%", sm: "auto" }}
            value={selectedOption}
            onChange={handleSelectChange}
          >
            <option value="option1">Added Material Report</option>
            <option value="option2">Withdrawn Material Report</option>
          </Select>

          <Input
            type="date"
            placeholder="select date start"
            max={today}
            value={startDate}
            onChange={handleStartDateChange}
            width={{ base: "100%", sm: "auto" }}
          />
          <Text mx={{ base: 2, md: 4 }}>to</Text>
          <Input
            type="date"
            placeholder="select date end"
            max={today}
            value={endDate}
            onChange={handleEndDateChange}
            width={{ base: "100%", sm: "auto" }}
          />
          <>
            {backenderror && (
              <p className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative w-full">
                {backenderror}
              </p>
            )}
            {!backenderror && (
              <div className="flex">
                <Button
                  onClick={handleGenerateReport}
                  colorScheme="teal"
                  variant="solid"
                  width={{ base: "100%", sm: "auto" }}
                  disabled={Loading}
                >
                  {Loading ? (
                    <PulseLoader color="#FFFFFF" />
                  ) : (
                    " Generate Report"
                  )}
                </Button>
              </div>
            )}
          </>
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
                  <Tr key={event.id}>
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
