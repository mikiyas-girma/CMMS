// src/components/dashboard/InventoryOverview.jsx
import React from 'react';
import {
    Box,
    Heading,
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    Icon,
} from '@chakra-ui/react';
import { FaExclamationTriangle } from 'react-icons/fa';

const inventoryData = [
    { name: 'Cement', category: 'Building Materials', quantity: 50 },
    { name: 'Bricks', category: 'Building Materials', quantity: 150 },
    { name: 'Steel Rods', category: 'Construction', quantity: 20 },
    { name: 'Paint', category: 'Finishing', quantity: 80 },
];

const InventoryOverview = () => {
    return (
        <Box
            borderWidth="1px"
            borderRadius="lg"
            overflow="hidden"
            p={4}
            boxShadow="sm"
        >
            <Heading size="md" mb={4}>Real-Time Inventory Overview</Heading>
            <Table variant="simple">
                <Thead>
                    <Tr>
                        <Th>Material Name</Th>
                        <Th>Category</Th>
                        <Th>Quantity</Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {inventoryData.map((material, index) => (
                        <Tr key={index}>
                            <Td>{material.name}</Td>
                            <Td>{material.category}</Td>
                            <Td>
                                {material.quantity < 30 ? (
                                    <Box color="red.500" display="flex" alignItems="center">
                                        <Icon as={FaExclamationTriangle} mr={2} />
                                        {material.quantity}
                                    </Box>
                                ) : (
                                    material.quantity
                                )}
                            </Td>
                        </Tr>
                    ))}
                </Tbody>
            </Table>
        </Box>
    );
};

export default InventoryOverview;
