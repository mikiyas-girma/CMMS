import React, { useRef, useState } from "react";
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
  IconButton,
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
import { AddIcon, EditIcon } from "@chakra-ui/icons";
import { HiOutlinePencil } from "react-icons/hi2";
import { PulseLoader } from "react-spinners";

import { ScaleLoader } from "react-spinners";
import { useUser } from "../utils/UserContext";
import { updateProfile } from "../utils/auth";
import { fetchUser } from "../redux/Slice/userSlice";
import { useDispatch } from "react-redux";
import { handleBlurEmail,
         handleBlurName,
         handleBlurPhone
 } from "../utils/validateLogin";


const Profile = () => {
  const [loading, setLoading] = useState(false);
  const { user } = useUser();
  const dispatch = useDispatch();
  const [editedUser, setEditteduser] = useState(user);
  const [email, setEmail] = useState(editedUser.email);
  const [emailError, setEmailError] = useState("");
  const [Fname, setFname] = useState(editedUser.Fname);
  const [Lname, setLname] = useState(editedUser.Lname);
  const [FnameError, setFNameError] = useState("");
  const [LnameError, setLNameError] = useState("");
  const [phone, setPhone] = useState(editedUser.phone);
  const [phoneError, setPhoneError] = useState("");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [preview, setPreview] = useState(null);
  const inputRef = useRef();
  const [upLoading, setUploading] = useState(false);
  const [back, setBackError] = useState("");
  // const handleUpdateProfile = async (event) => {
  //   event.preventDefault();
  //   const formData = new FormData(event.target);
  //   const updatedUser = Object.fromEntries(formData.entries());
  //   setLoading(true);
  //   //  API call to update user profile
  //   console.log("Updating user profile with:", updatedUser);
  //   setTimeout(() => {
  //     setLoading(false);
  //     onClose(); // Close the modal after updating
  //     // Update user context or state here with the updated information
  //   }, 2000);
  // };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setEditteduser({
      ...editedUser,
      image: e.target.files[0],
    });
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);

      // Assuming you have some method to update the image on the server
      // updateImageOnServer(file);
    }
  };

    const hasValidationErrors = () => {
        return FnameError || LnameError || emailError || phoneError;
    };

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    setUploading(true);
    const response = await updateProfile(editedUser);
    setUploading(false);
    if (response?.error) {
      setBackError(response?.error);
    }
    if (response?.data?.status === "success") {
      await dispatch(fetchUser());
    }
    onClose();
  };
  console.log("updatedUser", editedUser);

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
                <Text mt={4}>
                  Full Name: {user?.Fname} {user?.Lname}
                </Text>
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
                <FormControl className="relative">
                  <Image
                    borderRadius="full"
                    boxSize="150px"
                    src={
                      preview ||
                      `http://127.0.0.1:3000/public/img/users/${user?.image}`
                    }
                    alt={user?.Fname}
                    mx="auto"
                  />
                  <label
                    htmlFor="imageUpload"
                    className="absolute  bottom-5 right-14 mr-14 cursor-pointer z-10"
                  >
                    <span className="flex justify-center items-center bg-slate-300 p-1/2 px-1 rounded-md">
                      <HiOutlinePencil size={15} />
                      <p className="text-sm">Edit</p>
                    </span>
                  </label>
                  <input
                    id="imageUpload"
                    type="file"
                    ref={inputRef}
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => handleImageChange(e)}
                  />
                </FormControl>
                <FormControl>
                  <FormLabel>First Name</FormLabel>
                  <Input
                    name="Fname"
                    defaultValue={user?.Fname}
                    required
                    onChange={(e) =>
                      setEditteduser({
                        ...editedUser,
                        Fname: e.target.value,
                      })
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
                    name="Lname"
                    defaultValue={user?.Lname}
                    required
                    onChange={(e) =>
                      setEditteduser({
                        ...editedUser,
                        Lname: e.target.value,
                      })
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
                    name="email"
                    type="email"
                    defaultValue={user?.email}
                    required
                    onChange={(e) =>
                      setEditteduser({
                        ...editedUser,
                        email: e.target.value,
                      })
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
                    name="phone"
                    defaultValue={user?.phone}
                    required
                    onChange={(e) => {
                        console.log("phone in now", e.target.value);
                      setEditteduser({
                        ...editedUser,
                        phone: e.target.value,
                      })
                    }}
                    onBlur={(e) => handleBlurPhone(e, setPhoneError)}
                  />
                </FormControl>
                {phoneError && (
                    <p className="text-red-700 p-2 rounded w-full">{phoneError}</p>
                )}
              </ModalBody>
              <ModalFooter>
                <div>
                  {back && (
                    <p className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative w-full">
                      {back}
                    </p>
                  )}
                  {!back && (
                    <>
                      <Button
                        colorScheme="blue"
                        mr={3}
                        type="submit"
                        isDisabled={hasValidationErrors() || upLoading}
                      >
                        {upLoading ? <PulseLoader color="#FFFFFF" /> : "Update"}
                      </Button>
                    </>
                  )}
                </div>
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
