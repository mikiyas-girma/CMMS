import React, { useState, useEffect } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  FormControl,
  FormLabel,
  Input,
} from "@chakra-ui/react";
import { blockUser, updateUser } from "../../utils/auth";
import { PulseLoader } from "react-spinners";
import { Navigate } from "react-router-dom";
import { updatePassword } from "../../../../backend/Controller/authController";

const EditUserModal = ({ user, isOpen, onClose, onSave }) => {
  const [editedUser, setEditedUser] = useState(user);
  const [Loading, setLoading] = useState("");
  const [backenderror, setBakendError] = useState("");
  const [loading, setloading] = useState("");
  const [backerror, setBackError] = useState("");

  useEffect(() => {
    setEditedUser(user); // Update the state when the user prop changes
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedUser((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    let url = "";
    if (user.role === "storeOwner") {
      url = `users/storeOwner/${user._id}`;
    } else if (user.role === "employee") {
      url = `users/employee/${user._id}`;
    }
    setloading(true);
    const response = await updateUser(url, editedUser);
    setloading(false);
    console.log("response", response);
    if (response?.error) {
      setBackError(response?.error);
    }
    if (response?.data?.status === "success") {
      onClose();
    }
    // onSave(editedUser);
    onClose();
  };
  const handleButtonClick = async () => {
    let url = "";
    if (user.status === "active") {
      url = `block/${user._id}`;
    } else if (user.status === "inactive") {
      url = `unblock/${user._id}`;
    }
    setLoading(true);
    const response = await blockUser(url, user);
    setLoading(false);
    console.log("response", response);
    if (response?.error) {
      setBakendError(response?.error);
    }
    if (response?.data?.status === "success") {
      onClose();
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Edit User</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={2}>
          <FormControl>
            <FormLabel>First Name</FormLabel>
            <Input
              value={editedUser.Fname}
              name="Fname"
              onChange={handleChange}
            />
          </FormControl>

          <FormControl mt={1}>
            <FormLabel>Last Name</FormLabel>
            <Input
              value={editedUser.Lname}
              name="Lname"
              onChange={handleChange}
            />
          </FormControl>

          <FormControl mt={1}>
            <FormLabel>Email</FormLabel>
            <Input
              value={editedUser.email}
              name="email"
              onChange={handleChange}
            />
          </FormControl>

          <FormControl mt={1}>
            <FormLabel>Role</FormLabel>
            <Input
              value={editedUser.role}
              name="role"
              onChange={handleChange}
            />
          </FormControl>

          <FormControl mt={1}>
            <FormLabel>Phone</FormLabel>
            <Input
              value={editedUser.phone}
              name="phone"
              onChange={handleChange}
            />
          </FormControl>
        </ModalBody>

        <ModalFooter display="flex" justifyContent="space-between">
          {backenderror && (
            <p className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative w-full">
              {backenderror}
            </p>
          )}
          {!backenderror && (
            <Button
              onClick={handleButtonClick}
              colorScheme="red"
              mr={3}
              disabled={Loading}
            >
              {Loading ? (
                <PulseLoader color="#FFFFFF" />
              ) : user.status === "active" ? (
                "Block"
              ) : (
                "UnBlock"
              )}
            </Button>
          )}

          <div>
            <Button colorScheme="blue" mr={3} onClick={handleSubmit}>
              Save
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </div>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default EditUserModal;
