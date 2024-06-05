import React, { useRef, useState } from "react";
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
} from "@chakra-ui/react";
import SidebarWithHeader from "../components/sidebar/SidebarWithHeader";
import { getUserAuthStatus } from "../utils/login";
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

const Employees = () => {
  const [employData, setEmployData] = useState(EmployeesData);
  const [edit, setEdit] = useState({});
  const { role } = getUserAuthStatus();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (edit.id) {
      const date = new Date();
      const updatedEdit = employData.map((e) =>
        e.id === edit.id
          ? {
              id: edit.id,
              name: edit.name,
              role: edit.role,
              status: edit.status,
              date: `${date.toLocaleTimeString()} ${date.toLocaleDateString()}`,
            }
          : e
      );

      setEmployData(updatedEdit);
      setEdit({});
    } else {
      const date = new Date();
      const Employes = {
        id: Math.floor(Math.random() * 1000),
        name: e.target.name.value,
        role: e.target.role.value,
        status: "Inactive",
        date: `${date.toLocaleTimeString()} ${date.toLocaleDateString()}`,
      };

      console.log(Employes);
      setEmployData([...employData, Employes]);
      setEdit({});
    }
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

  return (
    <SidebarWithHeader>
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
        <section>
          <form onSubmit={handleSubmit}>
            <FormControl
              padding="20px 20px"
              marginLeft="10px"
              className="flex items-center  flex-col"
            >
              <div className="flex items-center gap-6">
                <div>
                  <FormLabel htmlFor="email">Email</FormLabel>
                  <Input
                    width="300px"
                    type="text"
                    name="email"
                    id="email"
                    value={edit.email}
                    onChange={(e) =>
                      setEdit({ ...edit, email: e.target.value })
                    }
                  />

                  <FormLabel htmlFor="name">First Name</FormLabel>
                  <Input
                    width="300px"
                    type="text"
                    name="Fname"
                    id="name"
                    value={edit.Fname}
                    onChange={(e) =>
                      setEdit({ ...edit, Fname: e.target.value })
                    }
                  />
                </div>
                <br></br>
                <div>
                  <FormLabel htmlFor="role">Last Name</FormLabel>
                  <Input
                    width="300px"
                    type="text"
                    name="role"
                    id="role"
                    value={edit.Lname}
                    onChange={(e) =>
                      setEdit({ ...edit, Lname: e.target.value })
                    }
                  />
                  <br></br>
                  <FormLabel htmlFor="phone">Phone</FormLabel>
                  <Input
                    width="300px"
                    type="text"
                    name="phone"
                    id="phone"
                    value={edit.phone}
                    onChange={(e) =>
                      setEdit({ ...edit, phone: e.target.value })
                    }
                  />
                </div>
              </div>
              <br></br>
              <Button
                marginTop="20px"
                colorScheme="blue"
                color="white"
                variant="solid"
                type="submit"
              >
                {edit.id ? "Update" : "Register StoreOwner"}
              </Button>
            </FormControl>
          </form>
        </section>

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
