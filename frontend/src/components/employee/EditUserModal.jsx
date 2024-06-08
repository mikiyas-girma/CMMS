import React, { useState, useEffect } from 'react';
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
} from '@chakra-ui/react';

const EditUserModal = ({ user, isOpen, onClose, onSave }) => {
  const [editedUser, setEditedUser] = useState(user);

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

  const handleSubmit = () => {
    onSave(editedUser);
    onClose();
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
            <Input value={editedUser.Fname} name="Fname" onChange={handleChange} />
          </FormControl>

          <FormControl mt={1}>
            <FormLabel>Last Name</FormLabel>
            <Input value={editedUser.Lname} name="Lname" onChange={handleChange} />
          </FormControl>

          <FormControl mt={1}>
            <FormLabel>Email</FormLabel>
            <Input value={editedUser.email} name="email" onChange={handleChange} />
          </FormControl>

          <FormControl mt={1}>
            <FormLabel>Role</FormLabel>
            <Input value={editedUser.role} name="role" onChange={handleChange} />
          </FormControl>

          <FormControl mt={1}>
            <FormLabel>Phone</FormLabel>
            <Input value={editedUser.phone} name="phone" onChange={handleChange} />
          </FormControl>

          <FormControl mt={1}>
            <FormLabel>Status</FormLabel>
            <Input value={editedUser.status} name="status" onChange={handleChange} />
          </FormControl>
        </ModalBody>

        <ModalFooter display='flex' justifyContent='space-between'>
          <Button colorScheme="red" mr={3}>
            {user.status == 'active' ? 'Block' : 'UnBlock'}
          </Button>
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
