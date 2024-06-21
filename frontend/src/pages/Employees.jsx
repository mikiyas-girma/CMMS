import React, { useEffect, useRef, useState, Suspense } from "react";
import { Badge } from "@chakra-ui/react";
import { EditIcon } from "@chakra-ui/icons";

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
  useBreakpointValue,
} from "@chakra-ui/react";

import SidebarWithHeader from "../components/sidebar/SidebarWithHeader";
import { getUserAuthStatus } from "../utils/auth";
import { fetchUsers } from "../redux/Slice/userSlice";

import FormSubmitted from "./FormSubmitted";
import apiInstance from "../utils/axios";
import { useDispatch, useSelector } from "react-redux";
const EditUserModal = React.lazy(() =>
  import("../components/employee/EditUserModal")
);
import { handleBlurEmail,
         handleBlurName,
         handleBlurPhone,
         validateEmail,
         validateName,
         validateLName,
         validatePhone
 } from "../utils/validateLogin";

const Employees = () => {
  const [edit, setEdit] = useState({});
  const [isOpen, setIsOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [Fname, setFname] = useState("");
  const [Lname, setLname] = useState("");
  const [FnameError, setFNameError] = useState("");
  const [LnameError, setLNameError] = useState("");
  const [phone, setPhone] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const onOpen = () => setIsOpen(true);
  const onClose = () => setIsOpen(false);
  const isMediumScreen = useBreakpointValue({ base: false, md: true });
  const tableMaxWidth = useBreakpointValue({
    base: "auto",
    md: "calc(100vw - 250px)",
  });

  const { role } = getUserAuthStatus();
  const [submittedData, setSubmittedData] = useState(null);
  // const [userData, setUserData] = useState([]);
  const [error, setError] = useState("");
  // const [numberofuser, setNumberofUsers] = useState("");
  const [selectedUserForEdit, setSelectedUserForEdit] = useState(null);
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchUserData = async () => {
      let url = "";
      if (role === "admin") {
        url = "/storeOwner";
      } else if (role === "storeOwner") {
        url = "/employee";
      }

      if (url) {
        await dispatch(fetchUsers(url));
      } else {
        setError("Error Occured during Fetching Users");
      }
    };

    fetchUserData();
  }, [role]);
  const { userData, numberofuser } = useSelector((state) => state.user);

  const hasValidationErrors = () => {
    return FnameError || LnameError || emailError || phoneError;
    };

  const handleSubmit = (e) => {
    e.preventDefault();

    let hasError = false;

    if (!validateName(edit.Fname)) {
        setFNameError("Name should be atleast 2 characters");
        hasError = true;
    } else {
        setFNameError("");
    }

    if (!validateLName(edit.Lname)) {
        console.log("edit.Lname", edit.Lname);
        setLNameError("Name should be atleast 2 characters");
        hasError = true;
    } else {
        setLNameError("");
    }

    if (!validateEmail(edit.email)) {
        setEmailError("Please enter valid email");
        hasError = true;
    } else {
        setEmailError("");
    }

    if (!validatePhone(edit.phone)) {
        setPhoneError("valid format: 09XXXXXXXX or 07XXXXXXXX");
        hasError = true;
    } else {
        setPhoneError("");
    }

    if (!hasError) {

        setSubmittedData(edit);
        onClose();
    
        console.log("formData", edit);
        return <FormSubmitted data={edit} />;
    }

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

  const handleEditClick = (user) => {
    setSelectedUserForEdit(user);
    setIsEditModalOpen(true);
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
                      onBlur={(e) => handleBlurName(e, setFNameError)}
                    />
                  </FormControl>

                  {FnameError && (
                  <p className="text-red-700 p-2 rounded w-full">{FnameError}</p>
                )}
                  <FormControl mt={4}>
                    <FormLabel>Last Name</FormLabel>
                    <Input
                      id="lastname"
                      placeholder="Enter last name"
                      value={edit.Lname}
                      onChange={(e) =>
                        setEdit({ ...edit, Lname: e.target.value })
                      }
                      onBlur={(e) => handleBlurName(e, setLNameError)}
                    />
                  </FormControl>
                    {LnameError && (
                    <p className="text-red-700 p-2 rounded w-full">{LnameError}</p>
                    )}
                  <FormControl mt={4}>
                    <FormLabel>Email</FormLabel>
                    <Input
                      id="email"
                      placeholder="Enter employee's email"
                      value={edit.email}
                      onChange={(e) =>
                        setEdit({ ...edit, email: e.target.value })
                      }
                      onBlur={(e) => handleBlurEmail(e, setEmailError)}
                    />
                  </FormControl>
                    {emailError && (
                    <p className="text-red-700 p-2 rounded w-full">{emailError}</p>
                    )}
                  <FormControl mt={4}>
                    <FormLabel>Phone</FormLabel>
                    <Input
                      id="phone"
                      placeholder="Enter employee's phone"
                      value={edit.phone}
                      onChange={(e) =>
                        setEdit({ ...edit, phone: e.target.value })
                      }
                      onBlur={(e) => handleBlurPhone(e, setPhoneError)}
                    />
                  </FormControl>
                    {phoneError && (
                    <p className="text-red-700 p-2 rounded w-full">{phoneError}</p>
                    )}
                </form>
              </ModalBody>
              <ModalFooter>
                <Button
                    colorScheme="blue"
                    mr={3} 
                    onClick={handleSubmit}
                    isDisabled={hasValidationErrors()}
                >
                  {edit.id ? "Update" : "Add"}
                </Button>
                <Button onClick={onClose}>Cancel</Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
        </Box>

        <Box overflowX="auto" maxWidth={tableMaxWidth}>
          <Table>
            <Thead>
              <Tr>
                <Th>ID</Th>
                <Th>Full Name </Th>
                {isMediumScreen && <Th>Email</Th>}

                {isMediumScreen && <Th>Phone</Th>}
                <Th>Status</Th>
                <Th></Th>
              </Tr>
            </Thead>
            <Tbody>
              {userData?.map((user, i) => (
                <Tr key={user._id}>
                  <Td>{i + 1}</Td>
                  <Td>
                    {user.Fname} {user.Lname}
                  </Td>
                  {isMediumScreen && <Td>{user.email}</Td>}
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

      <Suspense fallback={<div>Loading...</div>}>
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
        )}
      </Suspense>
    </SidebarWithHeader>
  );
};

export default Employees;
