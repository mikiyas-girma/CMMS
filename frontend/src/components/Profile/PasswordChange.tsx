import {
  Button,
  Card,
  CardBody,
  CardHeader,
  FormControl,
  FormLabel,
  Input,
  Select,
  Text,
} from "@chakra-ui/react";
import React from "react";

const PasswordChange = () => {
  return (
    <div>
      <Card>
        <CardBody>
          <CardHeader>
            <Text fontSize="20px" as="b">
              Change Password
            </Text>
          </CardHeader>
          <FormControl isRequired>
            <FormLabel>Current Password</FormLabel>
            <Input placeholder="Current Password" />
            <FormLabel>New Password</FormLabel>
            <Input placeholder="New Password" />
            <FormLabel>Repeat New Password</FormLabel>
            <Input placeholder="Repeat New Password" /><br></br><br></br>
            <Button colorScheme='blue' color='white'>Update Password</Button>
          </FormControl>
        </CardBody>
      </Card>
    </div>
  );
};

export default PasswordChange;
