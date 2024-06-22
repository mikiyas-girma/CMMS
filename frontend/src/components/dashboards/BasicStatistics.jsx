import React, { useEffect, useState } from "react";
import { Pie } from "react-chartjs-2";
import {
  Box,
  SimpleGrid,
  Stat,
  StatLabel,
  StatNumber,
  useColorModeValue,
} from "@chakra-ui/react";
import { getStoreOnwerStats } from "../../utils/auth";

export default function BasicStatistics() {
  const [Data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const response = await getStoreOnwerStats();
      if (response) {
        setData(response.data.data.stats);
      }
    };
    fetchData();
  }, []);

  if (!Data) {
    return <p>Loading...</p>;
  }

  const pieData = {
    labels: ["Active Store Owners", "Inactive Store Owners"],
    datasets: [
      {
        label: "Store Owners",
        data: [Data.totalActiveStoreOwners, Data.totalInactiveStoreOwners],
        backgroundColor: ["rgba(75, 192, 192, 0.6)", "rgba(255, 99, 132, 0.6)"],
        borderColor: ["rgba(75, 192, 192, 1)", "rgba(255, 99, 132, 1)"],
        borderWidth: 1,
      },
    ],
  };

  const pieOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Store Owners Status",
      },
    },
  };

  return (
    <Box maxW="7xl" mx={"auto"} pt={5} px={{ base: 2, sm: 12, md: 17 }}>
      <SimpleGrid columns={{ base: 1, md: 3 }} spacing={{ base: 5, lg: 8 }}>
        <Stat
          px={{ base: 4, md: 8 }}
          py={"5"}
          shadow={"xl"}
          border={"1px solid"}
          borderColor={useColorModeValue("gray.800", "gray.500")}
          bg={useColorModeValue("blue.100", "blue.700")}
          rounded={"lg"}
        >
          <StatLabel fontWeight={"medium"} isTruncated>
            Total Store Owners
          </StatLabel>
          <StatNumber fontSize={"2xl"} fontWeight={"medium"}>
            {Data.totalStoreOwners}
          </StatNumber>
        </Stat>
        <Stat
          px={{ base: 4, md: 8 }}
          py={"5"}
          shadow={"xl"}
          border={"1px solid"}
          borderColor={useColorModeValue("gray.800", "gray.500")}
          bg={useColorModeValue("green.100", "green.700")}
          rounded={"lg"}
        >
          <StatLabel fontWeight={"medium"} isTruncated>
            Active Store Owners
          </StatLabel>
          <StatNumber fontSize={"2xl"} fontWeight={"medium"}>
            {Data.totalActiveStoreOwners}
          </StatNumber>
        </Stat>
        <Stat
          px={{ base: 4, md: 8 }}
          py={"5"}
          shadow={"xl"}
          border={"1px solid"}
          borderColor={useColorModeValue("gray.800", "gray.500")}
          bg={useColorModeValue("red.100", "red.700")}
          rounded={"lg"}
        >
          <StatLabel fontWeight={"medium"} isTruncated>
            Blocked Store Owners
          </StatLabel>
          <StatNumber fontSize={"2xl"} fontWeight={"medium"}>
            {Data.totalInactiveStoreOwners}
          </StatNumber>
        </Stat>
      </SimpleGrid>
      <Box mt={10} display="flex" justifyContent="center">
        <Box width="400px" height="400px">
          <Pie data={pieData} options={pieOptions} />
        </Box>
      </Box>
    </Box>
  );
}
