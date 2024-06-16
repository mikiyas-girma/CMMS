import React, { useEffect, useState } from "react";
import SidebarWithHeader from "../components/sidebar/SidebarWithHeader";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
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
} from "@chakra-ui/react";
import apiInstance from "../utils/axios";
import { ScaleLoader } from "react-spinners";
import { useUser } from "../utils/UserContext";


const Profile = () => {
//   const [user, setUser] = useState("");
  const [error, setError] = useState("");
  const [Loading, setLoading] = useState(false);

  const { user } = useUser();

//   useEffect(() => {
//     const fetchUser = async () => {
//       try {
//         setLoading(true);
//         const res = await apiInstance.get("/users/me");
//         setLoading(false);
//         console.log("users res", res);
//         if (res?.data?.status === "success") {
//           setUser(res.data.data.user);
//         } else {
//           setError("Failed to fetch user");
//         }
//       } catch (error) {
//         setError(error.response?.data?.message || "Something went wrong");
//       }
//     };

//     fetchUser();
//   }, []);
  console.log("user here", user);
  return (
    <SidebarWithHeader>
      <Box >
      <Grid  marginLeft='50px'
         gridTemplateColumns={{ base: '1fr', md: '1fr 1fr', lg: '1fr .5fr 0.5fr'}}
         
         gap={5}
      >
        <GridItem colSpan={{ base: 1, md: 2, lg:2 }} bg=""  p={0} boxShadow="sm">
          <Card
            direction={{ base: "column", sm: "row" }}
            overflow="hidden"
            variant="outline"
          >
            <Image
              maxW={{ base: "100%", sm: "100px" }}
              marginLeft="30px"
              padding="15px"
              borderRadius="full"
              objectFit="cover"
              src={`http://127.0.0.1:3000/public/img/users/${user?.image}`}
              alt={user?.Fname}
            />

            <Stack>
              <CardBody>
                <Heading size="md">
                  {" "}
                  {Loading ? (
                    <ScaleLoader color="#36d7b7" size={5} />
                  ) : (
                    `${user?.Fname} ${user?.Lname}`
                  )}
                </Heading>

                <Text py="2">{user?.email}</Text>
              </CardBody>
            </Stack>
          </Card>
        </GridItem>
        <GridItem colSpan={{ base: 1, md: 2, lg:2 }} bg=""  p={0} boxShadow="sm">
          <Card>
            <CardBody>
              <CardFooter>
                <Text fontSize="20px" as="b">
                  Profile Information
                </Text>
              </CardFooter>
              <Text fontSize="17px">
                Full Name: {user?.Fname} {user?.Lname}
              </Text>
              <Text fontSize="17px">Email: {user?.email}</Text>
              <Text fontSize="17px">Country: Ethiopia</Text>
              <Text fontSize="17px">Mobile:{user?.phone}</Text>
            </CardBody>
          </Card>
        </GridItem>
        <GridItem colSpan={{ base: 1, md: 2, lg:2 }} bg=""  p={0} boxShadow="sm">
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
                <Input placeholder="Repeat New Password" />
                <br></br>
                <br></br>
                <Button colorScheme="blue" color="white">
                  Update Password
                </Button>
              </FormControl>
            </CardBody>
          </Card>
        </GridItem>
      </Grid>
      </Box>
    </SidebarWithHeader>
  );
};

export default Profile;
