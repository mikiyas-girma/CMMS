// src/components/dashboard/EmployeeManagementOverview.jsx
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
    Badge,
    IconButton,
} from '@chakra-ui/react';
import { FaEdit, FaTrash } from 'react-icons/fa';

const employeeData = [
    { id: 1, name: 'John Doe', role: 'Manager', status: 'Active' },
    { id: 2, name: 'Jane Smith', role: 'Worker', status: 'Active' },
    { id: 3, name: 'Alice Johnson', role: 'Technician', status: 'Inactive' },
];

const EmployeeOverview = () => {
    return (
        <Box
            borderWidth="1px"
            borderRadius="lg"
            overflow="hidden"
            p={4}
            boxShadow="sm"
        >
            <Heading size="md" mb={4}>Employee Management Overview</Heading>
            <Table variant="simple">
                <Thead>
                    <Tr>
                        <Th>Name</Th>
                        <Th>Role</Th>
                        <Th>Status</Th>
                        <Th>Actions</Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {employeeData.map((employee) => (
                        <Tr key={employee.id}>
                            <Td>{employee.name}</Td>
                            <Td>{employee.role}</Td>
                            <Td>
                                <Badge colorScheme={employee.status === 'Active' ? 'green' : 'red'}>
                                    {employee.status}
                                </Badge>
                            </Td>
                            <Td>
                                <IconButton
                                    aria-label="Edit employee"
                                    icon={<FaEdit />}
                                    size="sm"
                                    mr={2}
                                />
                                <IconButton
                                    aria-label="Delete employee"
                                    icon={<FaTrash />}
                                    size="sm"
                                />
                            </Td>
                        </Tr>
                    ))}
                </Tbody>
            </Table>
        </Box>
    );
};

export default EmployeeOverview;
