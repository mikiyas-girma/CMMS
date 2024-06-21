import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import { Box, Heading, Spinner } from "@chakra-ui/react";
import { getAddeAndREmovedMaterialReport } from "../../utils/material";

const MaterialAdditionsWithdrawalsChart = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getAddeAndREmovedMaterialReport();
        setIsLoading(false);
        if (response?.data?.data?.report) {
          setData(response.data.data.report);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  console.log("fetchedDataBar", data);

  // Function to accumulate monthly quantities based on category
  const getMonthlyQuantities = (changeType) => {
    const quantities = Array(12).fill(null); // Initialize quantities array for all months with null

    data?.forEach((item) => {
      if (item.changeType === changeType) {
        const monthIndex = new Date(`${item.year}-${item.month}-01`).getMonth();
        if (monthIndex !== -1) {
          quantities[monthIndex] =
            (quantities[monthIndex] || 0) + item.totalQuantity;
        }
      }
    });

    // Get the current month index (0-11)
    const currentMonth = new Date().getMonth();

    // Set future months to null
    for (let i = currentMonth + 1; i < 12; i++) {
      quantities[i] = null;
    }
    console.log("quantities", quantities);
    return quantities;
  };

  // Check if data is still loading
  if (isLoading) {
    return <Spinner size="xl" />;
  }

  // Retrieve accumulated quantities for added and withdrawn materials
  const withdrawnMaterial = getMonthlyQuantities("withdraw");
  const addedMaterial = getMonthlyQuantities("add");

  const barData = {
    labels: [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ],
    datasets: [
      {
        label: "Added Quantity",
        data: addedMaterial,
        backgroundColor: "rgba(75, 192, 192, 0.6)",
      },
      {
        label: "Withdrawn Quantity",
        data: withdrawnMaterial,
        backgroundColor: "rgba(255, 99, 132, 0.6)",
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Material Additions and Withdrawals Over Time",
      },
    },
  };

  return (
    <Box
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      p={4}
      boxShadow="sm"
    >
      <Heading size="md" mb={4}>
        Material Additions and Withdrawals
      </Heading>
      <Bar data={barData} options={options} />
    </Box>
  );
};

export default MaterialAdditionsWithdrawalsChart;
