import React, { useEffect, useRef, useState } from "react";
import { Badge } from "@chakra-ui/react";
import { DeleteIcon, EditIcon } from "@chakra-ui/icons";

import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  Text,
  Tfoot,
  Box,
  Heading,
  HStack,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useBreakpointValue
} from "@chakra-ui/react";

import SidebarWithHeader from "../components/sidebar/SidebarWithHeader";
import { getUserAuthStatus } from "../utils/auth";

import FormSubmitted from "./FormSubmitted";
import apiInstance from "../utils/axios";
import EditUserModal from "../components/employee/EditUserModal"


const Employees = () => {
  // const [employData, setEmployData] = useState(EmployeesData);
  const [edit, setEdit] = useState({});
  const [isOpen, setIsOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const onOpen = () => setIsOpen(true);
  const onClose = () => setIsOpen(false);
  const isMediumScreen = useBreakpointValue({ base: false, md: true });
  const tableMaxWidth = useBreakpointValue({ base: 'auto', md: 'calc(100vw - 250px)' });
  // const [edit, setEdit] = useState({
  //   email: "",
  //   Fname: "",
  //   Lname: "",
  //   phone: "",
  // });
  const { role } = getUserAuthStatus();
  const [submittedData, setSubmittedData] = useState(null);
  const [userData, setUserData] = useState([]);
  const [error, setError] = useState("");
  const [numberofuser, setNumberofUsers] = useState("");
  const [selectedUserForEdit, setSelectedUserForEdit] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        let url = "";

        if (role === "admin") {
          url = "/storeOwner";
        } else if (role === "storeOwner") {
          url = "/employee";
        }

        if (url) {
          const response = await apiInstance.get(`/users/${url}`);
          console.log("response", response);
          setUserData(response?.data?.data?.users);
          setNumberofUsers(response?.data?.results);
        } else {
          setError("Invalid role");
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
        setError("Failed to fetch user data");
      }
    };

    fetchUserData();
  }, [role]);

  const handleSubmit = (e) => {
    onClose();
    e.preventDefault();
    setSubmittedData(edit);

    console.log("formData", edit);
    return <FormSubmitted data={edit} />;
  };

  const handleDelete = (id) => {
    const selectedUser = employData.filter((e) => e.id !== id);
    console.log(selectedUser);
    setEmployData(selectedUser);
  };
  const handleEdit = (id) => {
    // setEmployData(employData.filter((e) => e.id !== id))
    const selectedUser = employData.find((e) => e.id === id);
    console.log(selectedUser);
    setEdit(selectedUser);
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
  // if (error) {
  //   return (
  //     <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
  //       <strong className="font-bold">Error!</strong>
  //       <span className="block sm:inline">{error}</span>
  //     </div>
  //   );
  // }

  const handleEditClick = (user) => {
    setSelectedUserForEdit(user);
    setIsEditModalOpen(true);
  }

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
            {role === "admin" && "Add  StoreOwner"}
            {role === "storeOwner" && "Add Employee"}
          </Button>
        </HStack>
        <Box
          borderWidth="0px"
          borderRadius="lg"
          overflow="hidden"
          p={4}
          boxShadow="sm"
        >
          <Heading size="md" mb={4} marginLeft="26px">
            {role === "admin" && "StoreOwner Management"}
            {role === "storeOwner" && "Employee Management"}
          </Heading>
          <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>
                {" "}
                {role === "admin" && "Add New StoreOwner"}
                {role === "storeOwner" && "Add New Employee"}
              </ModalHeader>
              <ModalBody>
                <form onSubmit={handleSubmit}>
                  <FormControl>
                    <FormLabel>First Name</FormLabel>
                    <Input
                      id="firstname"
                      placeholder="Enter first name"
                      value={edit.Fname}
                      onChange={(e) =>
                        setEdit({ ...edit, Fname: e.target.value })
                      }
                    />
                  </FormControl>
                  <FormControl mt={4}>
                    <FormLabel>Last Name</FormLabel>
                    <Input
                      id="lastname"
                      placeholder="Enter last name"
                      value={edit.Lname}
                      onChange={(e) =>
                        setEdit({ ...edit, Lname: e.target.value })
                      }
                    />
                  </FormControl>
                  <FormControl mt={4}>
                    <FormLabel>Email</FormLabel>
                    <Input
                      id="email"
                      placeholder="Enter employee's email"
                      value={edit.email}
                      onChange={(e) =>
                        setEdit({ ...edit, email: e.target.value })
                      }
                    />
                  </FormControl>
                  <FormControl mt={4}>
                    <FormLabel>Phone</FormLabel>
                    <Input
                      id="phone"
                      placeholder="Enter employee's phone"
                      value={edit.phone}
                      onChange={(e) =>
                        setEdit({ ...edit, phone: e.target.value })
                      }
                    />
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

        <Box
            overflowX='auto'
            maxWidth={tableMaxWidth}
        >
        <Table
        >
          <Thead>
            <Tr>
              <Th>ID</Th>
              <Th>First Name </Th>
              {isMediumScreen && <Th>Last Name </Th>}
              {/* <Th>Role</Th> */}
              {isMediumScreen && <Th>Email</Th>}

              <Th>Status</Th>
              {isMediumScreen && <Th>Phone</Th>}
              <Th></Th>
            </Tr>
          </Thead>
          <Tbody>
            {userData?.map((user, i) => (
              <Tr key={user._id}>
                <Td maxWidth={'max-content'}>{i}</Td>
                <Td>{user.Fname}</Td>
                {isMediumScreen && <Td>{user.Lname}</Td>}
                {/* <Td>{user.role}</Td> */}
                {isMediumScreen && <Td>{user.email}</Td>}
                <Td>{user.status}</Td>
                {isMediumScreen && <Td>{user.phone}</Td>}
                <Td>
                  <Badge
                    colorScheme={user.status === "active" ? "green" : "red"}
                  >
                    {user.status}
                  </Badge>
                </Td>
                <Td>
                    <EditIcon
                        colorScheme="blue"
                        color="blue.500"
                        onClick={() => handleEditClick(user)}
                    />
                </Td>
              </Tr>
            ))}
          <Tr>
            <Td colSpan={isMediumScreen ? 7 : 4}>
              {numberofuser} of {role === "admin" && " StoreOwner"}
              {role === "storeOwner" && " Employee"}
            </Td>
            <Td>( {numberofuser} )</Td>
          </Tr>
          </Tbody>
        </Table>
        </Box>
      </Box>

      {selectedUserForEdit && (
        <EditUserModal
        user={selectedUserForEdit}
        isOpen={isEditModalOpen}
        onClose={() => {
            setIsEditModalOpen(false);
            setSelectedUserForEdit(null);
        }}
        onSave={(updatedUser) => {
            setUserData((prev) =>
            prev.map((user) =>
                user._id === updatedUser._id ? updatedUser : user
            )
            );
            setSelectedUserForEdit(null);
        }}
        />
      )
        }

    </SidebarWithHeader>
  );
};

export default Employees;
