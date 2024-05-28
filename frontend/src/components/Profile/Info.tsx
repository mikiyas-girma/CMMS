import {
  Card,
  CardBody,
  CardFooter,
  FormControl,
  FormLabel,
  Input,
  Select,
  Text,
} from "@chakra-ui/react";
import React from "react";

const Info = () => {
  return (
    <div>
      <Card>
        <CardBody>
          <CardFooter>
            <Text fontSize="20px" as="b">
              Profile Information
            </Text>
          </CardFooter>
          <Text fontSize="17px" color="black">
            Full Name: Mikias Girma
          </Text>
          <Text fontSize="17px" color="black">
            Email: Mikias12@gmail.com
          </Text>
          <Text fontSize="17px" color="black">
            Country: Ethiopia
          </Text>
          <Text fontSize="17px" color="black">
            Birth Day: May 3, 1994
          </Text>
          <Text fontSize="17px" color="black">
            Mobile: +251921493682
          </Text>
          {/* <FormControl>
                <FormLabel>Birth day</FormLabel>
                    <Input type='email' />
                    <FormLabel>Contact</FormLabel>
                    <Input type='email' />
            <FormLabel>Country</FormLabel>
            <Select placeholder='Select country'>
                <option>United Arab Emirates</option>
                <option>Nigeria</option>
            </Select>
            </FormControl> */}
        </CardBody>
      </Card>
    </div>
  );
};

export default Info;
