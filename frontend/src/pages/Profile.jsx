import React, { useState } from "react";
import SidebarWithHeader from "../components/sidebar/SidebarWithHeader";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  FormControl,
  FormLabel,
  Heading,
  Image,
  Input,
  Stack,
  Text,
  Grid,
  GridItem,
  Box,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
} from "@chakra-ui/react";
import { ScaleLoader } from "react-spinners";
import { useUser } from "../utils/UserContext";

const Profile = () => {
  const [loading, setLoading] = useState(false);
  const { user } = useUser();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleUpdateProfile = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const updatedUser = Object.fromEntries(formData.entries());
    setLoading(true);
    //  API call to update user profile
    console.log("Updating user profile with:", updatedUser);
    setTimeout(() => {
      setLoading(false);
      onClose(); // Close the modal after updating
      // Update user context or state here with the updated information
    }, 2000);
  };

  return (
    <SidebarWithHeader>
      <Box p={5}>
        <Grid templateColumns="repeat(3, 1fr)" gap={6}>
          <GridItem colSpan={[3, 3, 1]}>
            <Card>
              <CardHeader>
                <Image
                  borderRadius="full"
                  boxSize="150px"
                  src={`http://127.0.0.1:3000/public/img/users/${user?.image}`}
                  alt={user?.Fname}
                  mx="auto"
                />
              </CardHeader>
              <CardBody textAlign="center">
                <Heading size="lg">{`${user?.Fname} ${user?.Lname}`}</Heading>
                <Text>{user?.email}</Text>
                <Button mt={4} colorScheme="blue" onClick={onOpen}>
                  Edit Profile
                </Button>
              </CardBody>
            </Card>
          </GridItem>
          <GridItem colSpan={[3, 3, 2]}>
            <Card>
              <CardBody>
                <Heading size="md">Profile Information</Heading>
                <Text mt={4}>Full Name: {user?.Fname} {user?.Lname}</Text>
                <Text>Email: {user?.email}</Text>
                <Text>Country: Ethiopia</Text>
                <Text>Mobile: {user?.phone}</Text>
              </CardBody>
            </Card>
          </GridItem>
        </Grid>

        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Update Profile</ModalHeader>
            <ModalCloseButton />
            <form onSubmit={handleUpdateProfile}>
              <ModalBody pb={6}>
                <FormControl>
                  <FormLabel>First Name</FormLabel>
                  <Input name="Fname" defaultValue={user?.Fname} required />
                </FormControl>
                <FormControl mt={4}>
                  <FormLabel>Last Name</FormLabel>
                  <Input name="Lname" defaultValue={user?.Lname} required />
                </FormControl>
                <FormControl mt={4}>
                  <FormLabel>Email</FormLabel>
                  <Input name="email" type="email" defaultValue={user?.email} required />
                </FormControl>
                <FormControl mt={4}>
                  <FormLabel>Phone</FormLabel>
                  <Input name="phone" defaultValue={user?.phone} required />
                </FormControl>
              </ModalBody>
              <ModalFooter>
                <Button colorScheme="blue" mr={3} type="submit" isLoading={loading}>
                  Save
                </Button>
                <Button onClick={onClose}>Cancel</Button>
              </ModalFooter>
            </form>
          </ModalContent>
        </Modal>
      </Box>
    </SidebarWithHeader>
  );
};

export default Profile;
