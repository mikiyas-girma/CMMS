import React, { useEffect, useState } from "react";
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
  const [reports, setReport] = useState([]);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const today = new Date().toISOString().split("T")[0];
  const [selectedOption, setSelectedOption] = useState("option1");
  const [backenderror, setBakendError] = useState("");
  const [Loading, setLoading] = useState("");
  const [cache, setCache] = useState({ reports: [], timestamp: 0 });

  const fetchInitialReport = async () => {
    const currentTime = new Date().getTime();

    if (currentTime - cache.timestamp > 1800000) {
      const past30Days = new Date();
      past30Days.setDate(past30Days.getDate() - 30);
      const formattedStartDate = past30Days.toISOString().split("T")[0];
      setStartDate(formattedStartDate);
      setEndDate(today);
      const url = "addedmaterialreport"; // Default option for initial load
      setLoading(true);
      const { data } = await generatereport(url, formattedStartDate, today);
      setLoading(false);
      console.log("report generated", data);
      setReport(data?.data?.report || []);
      if (data?.error) {
        setBakendError(data?.error);
      }
      setCache({ reports: data?.data?.report, timestamp: currentTime });
    } else {
      setReport(cache.reports);
    }
  };

  useEffect(() => {
    fetchInitialReport();
  }, []);

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
    const { data } = await generatereport(url, startDate, endDate);
    console.log("report generated", data);
    setLoading(false);
    console.log("response", data);
    setReport(data?.data?.report);

    if (data?.error) {
      setBakendError(data?.error);
    }
  };

  return (
    <SidebarWithHeader>
      <Text as="b">Generate Report</Text>
      <HStack
        spacing={{ base: 2, md: 4 }} // Adjust spacing based on screen size
        align="center" // Ensure items are centered
        wrap="wrap" // Allow items to wrap in smaller screens
      >
        <Select
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
              {startDate <= endDate && (
                <Button
                  colorScheme="teal"
                  variant="solid"
                  width={{ base: "100%", sm: "auto" }}
                  disabled={Loading}
                >
                  Generate Report
                </Button>
              )}
            </div>
          )}
        </>
      </HStack>
      <TableContainer marginTop="50px" maxWidth={{ base: "100%", md: "90%" }}>
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>ID</Th>
              <Th>Image</Th>
              <Th>Name</Th>
              <Th>Category</Th>
              <Th isNumeric>Quantity</Th>
            </Tr>
          </Thead>
          <Tbody>
            {reports?.map((report, i) => (
              <Tr key={report.material}>
                <Td>{i + 1}</Td>
                <Td className="w-32 h-20">
                  <img
                    src={`http://127.0.0.1:3000/public/img/materials/${report.image}`}
                    alt={report.name}
                    className="w-1/2 h-full object-cover"
                  />
                </Td>
                <Td>{report.name}</Td>
                <Td>{report.category}</Td>

                <Td isNumeric>{report.totalQuantity}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </SidebarWithHeader>
  );
};

export default Reports;
