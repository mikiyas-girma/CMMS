import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Box, Heading } from '@chakra-ui/react';

const data = {
    labels: ['2024-01-01', '2024-01-02', '2024-01-03', '2024-01-04', '2024-01-05'],
    datasets: [
        {
            label: 'Added Quantity',
            data: [12, 19, 3, 5, 2],
            backgroundColor: 'rgba(75, 192, 192, 0.6)',
        },
        {
            label: 'Withdrawn Quantity',
            data: [2, 3, 20, 5, 1],
            backgroundColor: 'rgba(255, 99, 132, 0.6)',
        },
    ],
};

const options = {
    responsive: true,
    plugins: {
        legend: {
            position: 'top',
        },
        title: {
            display: true,
            text: 'Material Additions and Withdrawals Over Time',
        },
    },
};

const MaterialAdditionsWithdrawalsChart = () => (
    <Box borderWidth="1px" borderRadius="lg" overflow="hidden" p={4} boxShadow="sm">
        <Heading size="md" mb={4}>Material Additions and Withdrawals</Heading>
        <Bar data={data} options={options} />
    </Box>
);

export default MaterialAdditionsWithdrawalsChart;
