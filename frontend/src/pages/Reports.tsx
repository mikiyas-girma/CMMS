import React, { useState } from "react";
import SidebarWithHeader from "../components/sidebar/SidebarWithHeader";
import { Button, HStack, Input, Select, Stack, Table, TableCaption, TableContainer, Tbody, Td, Text, Tfoot, Th, Thead, Tr } from "@chakra-ui/react";
import { BeatLoader } from "react-spinners";

const Reports = () => {
  const reportData = [
    {
      id: Math.floor(Math.random() * 10000),
      name: "Cement",
      quantity: "340 pcs",
      description:
        "The rusty swing creaked a melancholic ...",
    },
    {
      id: Math.floor(Math.random() * 10000),
      name: "Ceramic",
      quantity: "678 pcs",
      description:
        "Neon signs bled into the twilight, paint...",
    },
    {
      id: Math.floor(Math.random() * 10000),
      name: "Steel",
      quantity: "90 pcs",
      description:
        "The rusty swing creaked a melancholic tun...",
    },
    {
      id: Math.floor(Math.random() * 10000),
      name: "Pipes",
      quantity: "310 pcs",
      description:
        "whispering secrets of forgotten childhood la... ",
    },
    {
        id: Math.floor(Math.random() * 10000),
        name: "Windows",
        quantity: "909 pcs",
        description:
          "The abandoned library held its breath, its... ",
      },
      {
        id: Math.floor(Math.random() * 10000),
        name: "Bricks",
        quantity: "1100 pcs",
        description:
          "Its dusty shelves pregnant with untold sto.... ",
      },
  ];
    const [report, setReport] = useState(reportData)
  return (
    <div>
      <SidebarWithHeader>
        <Text padding="10px" marginLeft='50px' marginTop='50px' fontSize="27px" color="black">
          Generate Report
        </Text>
        <HStack padding="20px" marginLeft='20px' marginTop='30px'>
          <Select placeholder="Inventory Reports" width="200px">
            <option value="option1">Material Stock Report</option>
            <option value="option2">Material Usage Report</option>
            <option value="option3">Low Stock Report</option>
          </Select>
          <Stack spacing={3}>
            <Input focusBorderColor="lime" placeholder="Select Start Date" />
          </Stack>
          <Stack spacing={3}>
            <Input focusBorderColor="lime" placeholder="Select upto Date" />
          </Stack>
          <Button marginLeft="150px" colorScheme="blue">
            Generate Report
          </Button>
        </HStack>
        <div>
          <TableContainer marginTop='51px'>
            <Table variant="simple">
              <TableCaption><button>Back To Top</button></TableCaption>
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
                {report.map((event)=>(
                <Tr>
                  <Td>{event.id}</Td>
                  <Td>{event.name}</Td>
                  <Td isNumeric>{event.quantity}</Td>
                  <Td><button>{event.description}see more</button></Td>
                  <Td><Button>See Comments</Button></Td>
                </Tr>))}
               </Tbody> 
            </Table>
          </TableContainer>
        </div>
      </SidebarWithHeader>
    </div>
  );
};

export default Reports;
