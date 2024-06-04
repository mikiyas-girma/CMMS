import React, { useRef, useState } from 'react'
import { Badge } from '@chakra-ui/react';
import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import { Button, FormControl, FormLabel, Input, Table, Tbody, Td, Th, Thead, Tr, Text, Tfoot, Box, Heading } from '@chakra-ui/react';
import SidebarWithHeader from '../components/sidebar/SidebarWithHeader';
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    HStack,
} from "@chakra-ui/react";



const EmployeesData = [
    {
        id: 1,
        first_name: 'Mikias',
        last_name: 'Girma',
        email: 'mikiyasgirmaet@gmail.com',
        role: 'Employee',
        status: 'Active'
    },
    {
        id: 2,
        first_name: 'Jibril',
        last_name: 'Arbicho',
        email: 'JibrilArbicho@gmail.com',
        role: 'Employee',
        status: 'Active'
    },
    {
        id: 3,
        first_name: 'Biniam',
        last_name: 'Batu',
        email: 'Biniambatu@gmail.com',
        role: 'Employee',
        status: 'Active'
    },
    {
        id: 4,
        first_name: 'Nanati',
        last_name: 'Mengistu',
        email: 'nanatimengistu@gmail.com',
        role: 'Employee',
        status: 'Active'
    },
]




const Employees = () => {
    const [employData, setEmployData] = useState(EmployeesData);
    const [edit, setEdit] = useState({})

    const handleSubmit = (e) => {
        e.preventDefault();

        if (edit.id) {
            const date = new Date()
            const updatedEdit = employData.map((e) => (
                e.id === edit.id ? { id: edit.id, first_name: edit.first_name, last_name: edit.last_name, role: edit.role, status: edit.status } : e
            ))
            setEmployData(updatedEdit)
            setEdit({})
        } else {

            const Employes = {
                id: Math.floor(Math.random() * 1000),
                first_name: e.target.firstname.value,
                last_name: e.target.lastname.value,
                role: e.target.role.value,
                status: 'Active'
            }
            console.log(Employes)
            setEmployData([...employData, Employes])
            setEdit({})
        }
    }

    const handleDelete = (id) => {
        const selected = employData.filter((e) => e.id !== id)
        console.log(selected)
        setEmployData(selected)
    }
    const handleEdit = (id) => {
        // setEmployData(employData.filter((e) => e.id !== id))
        const selected = employData.find((e) => e.id === id)
        console.log(selected)
        setEdit(selected)
    }


    const [isOpen, setIsOpen] = useState(false);
    const onOpen = () => {
        setIsOpen(true);
    };

    const onClose = () => {
        setIsOpen(false);
    };

    const addNewEmployee = () => {
        const newEmployee = {
            id: EmployeesData.length + 1,
            first_name: document.getElementById("firstname").value,
            last_name: document.getElementById("lastname").value,
            email: document.getElementById("email").value,
            role: document.getElementById("role").value
        };
        EmployeesData.push(newEmployee);
        setEmployData(EmployeesData);
        setIsOpen(false);
    };

    return (
        <SidebarWithHeader>
            <HStack justify="end" mt={4} px={4}>
                <Button onClick={onOpen} colorScheme="blue">
                    Add Employee
                </Button>
            </HStack>
                <Box borderWidth="0px" borderRadius="lg" overflow="hidden" p={4} boxShadow="sm">
                    <Heading size="md" mb={4} marginLeft='26px'>Employee Management</Heading>
                    <Modal isOpen={isOpen} onClose={onClose}>
                        <ModalOverlay />
                        <ModalContent>
                            <ModalHeader>Add New Employee</ModalHeader>
                            <ModalBody>
                                <FormControl>
                                    <FormLabel>First Name</FormLabel>
                                    <Input id="firstname" placeholder="Enter first name" />
                                </FormControl>
                                <FormControl mt={4}>
                                    <FormLabel>Last Name</FormLabel>
                                    <Input id="lastname" placeholder="Enter last name" />
                                </FormControl>
                                <FormControl mt={4}>
                                    <FormLabel>Email</FormLabel>
                                    <Input id="email" placeholder="Enter employee's email" />
                                </FormControl>
                                <FormControl mt={4}>
                                    <FormLabel>Role</FormLabel>
                                    <Input id="role" placeholder="Enter employee's role" />
                                </FormControl>
                            </ModalBody>
                            <ModalFooter>
                                <Button colorScheme="blue" mr={3} onClick={addNewEmployee}>
                                    Add
                                </Button>
                                <Button onClick={onClose}>Cancel</Button>
                            </ModalFooter>
                        </ModalContent>
                    </Modal>

                    <Table variant="simple">
                        <Thead>
                            <Tr >
                                <Th>ID</Th>
                                <Th>First Name </Th>
                                <Th>Last Name </Th>
                                <Th>Role</Th>
                                <Th>Status</Th>
                                <Th></Th>
                                <Th></Th>
                            </Tr>
                        </Thead>
                        <Tbody >
                            {employData.map((event) => (
                                <Tr key={event.id}>
                                    <Td>{event.id}</Td>
                                    <Td>{event.first_name}</Td>
                                    <Td>{event.last_name}</Td>
                                    <Td>{event.role}</Td>
                                    <Td>
                                        <Badge colorScheme={event.status === 'Active' ? 'green' : 'red'}>
                                            {event.status}
                                        </Badge>
                                    </Td>

                                    <Td><EditIcon colorScheme='blue' color='blue.500' variant='solid' cursor='pointer' onClick={() => handleEdit(event.id)}>Edit</EditIcon></Td>
                                    <Td><DeleteIcon colorScheme='red' color='red.500' variant='solid' cursor='pointer' onClick={() => handleDelete(event.id)}>Delete</DeleteIcon></Td>
                                </Tr>))}
                        </Tbody>
                        <Tfoot>
                            <Td># of Employee </Td>
                            <Td>( {employData.length} )</Td>
                        </Tfoot>
                    </Table>

                </Box>

        </SidebarWithHeader>
    )
}

export default Employees
