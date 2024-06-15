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
      <Grid
        marginLeft="100px"
        padding="0px"
        h="200px"
        templateRows="repeat(2, 1fr)"
        templateColumns="repeat(5, 2fr)"
        gap={4}
      >
        <GridItem colSpan={4}>
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
        <GridItem colSpan={2}>
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
        <GridItem colSpan={2}>
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
    </SidebarWithHeader>
  );
};

export default Profile;
