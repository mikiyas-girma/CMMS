import React, { useRef, useState } from "react";
import { Badge } from "@chakra-ui/react";
import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import {
    Button, FormControl, FormLabel, Input, Table,
    Tbody, Td, Th, Thead, Tr, Text, Tfoot, Box, Heading,
    HStack, Modal, ModalOverlay, ModalContent, ModalHeader,
    ModalBody, ModalFooter

} from "@chakra-ui/react";

import SidebarWithHeader from "../components/sidebar/SidebarWithHeader";
import { getUserAuthStatus } from "../utils/auth";
const EmployeesData = [
    {
        id: Math.floor(Math.random() * 1000),
        name: "Biniam",
        role: "Store-Keeper",
        status: "Inactive",
        date: "10:09:45 AM5/12/2024",
    },
    {
        id: Math.floor(Math.random() * 1000),
        name: "Mikias",
        role: "Store-keeper",
        status: "Active",
        date: "09:55:45 PM5/26/2024",
    },
    {
        id: Math.floor(Math.random() * 1000),
        name: "Nani",
        role: "Store-Owner",
        status: "Active",
        date: "05:21:45 AM5/29/2024",
    },
    {
        id: Math.floor(Math.random() * 1000),
        name: "Jibrel",
        role: "Admin",
        status: "Inactive",
        date: "02:26:45 AM5/06/2024",
    },
];
import FormSubmitted from "./FormSubmitted";
const Employees = () => {
    const [employData, setEmployData] = useState(EmployeesData);
    const [edit, setEdit] = useState({});
    const [isOpen, setIsOpen] = useState(false);
    const onOpen = () => setIsOpen(true);
    const onClose = () => setIsOpen(false);
    // const [edit, setEdit] = useState({
    //   email: "",
    //   Fname: "",
    //   Lname: "",
    //   phone: "",
    // });
    const { role } = getUserAuthStatus();
    const [submittedData, setSubmittedData] = useState(null);

    const handleSubmit = (e) => {
        onClose();
        e.preventDefault();
        setSubmittedData(edit);
        
        console.log("formData", edit);
        return <FormSubmitted data={edit} />;
    };

    const handleDelete = (id) => {
        const selected = employData.filter((e) => e.id !== id);
        console.log(selected);
        setEmployData(selected);
    };
    const handleEdit = (id) => {
        // setEmployData(employData.filter((e) => e.id !== id))
        const selected = employData.find((e) => e.id === id);
        console.log(selected);
        setEdit(selected);
    };
    const onCancel = () => {
        setSubmittedData(null);
        setEdit({
            email: "",
            Fname: "",
            Lname: "",
            phone: "",
        });
        console.log("edit", edit);
    };
    const onClear = () => {
        setSubmittedData(null);
        setEdit({
            email: "",
            Fname: "",
            Lname: "",
            phone: "",
        });
        console.log("edit", edit);
    };

    return (
        <SidebarWithHeader>
            {submittedData && (
                <div className="overflow-hidden">
                    <FormSubmitted
                        data={submittedData}
                        onCancel={onCancel}
                        onClear={onClear}
                    />
                </div>
            )}

            <Box
                borderWidth="0px"
                borderRadius="lg"
                overflow="hidden"
                p={4}
                boxShadow="sm"
            >
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
                                <form onSubmit={handleSubmit}>
                                    <FormControl>
                                        <FormLabel>First Name</FormLabel>
                                        <Input
                                            id="firstname"
                                            placeholder="Enter first name"
                                            value={edit.Fname}
                                            onChange={(e) => setEdit({ ...edit, Fname: e.target.value })} />
                                    </FormControl>
                                    <FormControl mt={4}>
                                        <FormLabel>Last Name</FormLabel>
                                        <Input
                                            id="lastname"
                                            placeholder="Enter last name"
                                            value={edit.Lname} onChange={(e) => setEdit({ ...edit, Lname: e.target.value })} />
                                    </FormControl>
                                    <FormControl mt={4}>
                                        <FormLabel>Email</FormLabel>
                                        <Input
                                            id="email"
                                            placeholder="Enter employee's email"
                                            value={edit.email} onChange={(e) => setEdit({ ...edit, email: e.target.value })} />
                                    </FormControl>
                                    <FormControl mt={4}>
                                        <FormLabel>Phone</FormLabel>
                                        <Input
                                            id="phone"
                                            placeholder="Enter employee's phone"
                                            value={edit.phone} onChange={(e) => setEdit({ ...edit, phone: e.target.value })} />
                                    </FormControl>
                                </form>
                            </ModalBody>
                            <ModalFooter>
                                <Button colorScheme="blue" mr={3} onClick={handleSubmit}>
                                    {edit.id ? "Update" : "Add"}
                                </Button>
                                <Button onClick={onClose}>Cancel</Button>
                            </ModalFooter>
                        </ModalContent>
                    </Modal>
                </Box>

                <Table variant="simple">
                    <Thead>
                        <Tr>
                            <Th>ID</Th>
                            <Th>Employee Name </Th>
                            <Th>Role</Th>
                            <Th>Date</Th>
                            <Th>Status</Th>
                            <Th></Th>
                            <Th></Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {employData.map((event) => (
                            <Tr key={event.id}>
                                <Td>{event.id}</Td>
                                <Td>{event.name}</Td>
                                <Td>{event.role}</Td>
                                <Td>{event.date}</Td>
                                <Td>
                                    <Badge
                                        colorScheme={event.status === "Active" ? "green" : "red"}
                                    >
                                        {event.status}
                                    </Badge>
                                </Td>
                                <Td>
                                    <EditIcon
                                        colorScheme="blue"
                                        color="blue.500"
                                        variant="solid"
                                        cursor="pointer"
                                        onClick={() => handleEdit(event.id)}
                                    >
                                        Edit
                                    </EditIcon>
                                </Td>
                                <Td>
                                    <DeleteIcon
                                        colorScheme="red"
                                        color="red.500"
                                        variant="solid"
                                        cursor="pointer"
                                        onClick={() => handleDelete(event.id)}
                                    >
                                        Delete
                                    </DeleteIcon>
                                </Td>
                            </Tr>
                        ))}
                    </Tbody>
                    <Tfoot>
                        <Td># of Employee </Td>
                        <Td>( {employData.length} )</Td>
                    </Tfoot>
                </Table>
            </Box>
        </SidebarWithHeader>
    );
};

export default Employees;
