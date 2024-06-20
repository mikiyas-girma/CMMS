import React, { useState } from 'react';
import {
  Box,
  Button,
  Container,
  FormControl,
  FormLabel,
  Input,
  useToast,
  VStack,
} from '@chakra-ui/react';
import SidebarWithHeader from '../sidebar/SidebarWithHeader';

const UpdatePassword = () => {
  const [showForm, setShowForm] = useState(false);
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const toast = useToast();

  const handleUpdatePassword = (e) => {
    e.preventDefault();
    // Add your logic to update the password here.
    // This is just a placeholder logic.
    if (newPassword !== confirmNewPassword) {
      toast({
        title: 'Error',
        position: 'top',
        description: "New passwords don't match.",
        status: 'error',
        duration: 9000,
        isClosable: true,
      });
      return;
    }
    // Assume success
    toast({
      title: 'Password Updated',
      position: 'top',
      description: 'Your password has been successfully updated.',
      status: 'success',
      duration: 9000,
      isClosable: true,
    });
    // Reset form and hide it
    setShowForm(false);
    setOldPassword('');
    setNewPassword('');
    setConfirmNewPassword('');
  };

  return (
    <SidebarWithHeader>
    <Container>
    <Box p={4}>
      <Button ml={0} colorScheme="blue" onClick={() => setShowForm(!showForm)}>
        Update Password
      </Button>
      {showForm && (
        <form onSubmit={handleUpdatePassword}>
          <VStack spacing={4} mt={4} width='100%'>
            <FormControl isRequired>
              <FormLabel>Old Password</FormLabel>
              <Input type="password" value={oldPassword} onChange={(e) => setOldPassword(e.target.value)} />
            </FormControl>
            <FormControl isRequired>
              <FormLabel>New Password</FormLabel>
              <Input type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
            </FormControl>
            <FormControl isRequired>
              <FormLabel>Confirm New Password</FormLabel>
              <Input type="password" value={confirmNewPassword} onChange={(e) => setConfirmNewPassword(e.target.value)} />
            </FormControl>
            <Button type="submit" colorScheme="teal">Submit</Button>
          </VStack>
        </form>
      )}
    </Box>
    </Container>
    </SidebarWithHeader>
  );
};

export default UpdatePassword;
