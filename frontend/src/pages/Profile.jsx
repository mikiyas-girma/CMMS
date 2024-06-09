import React from 'react'
import SidebarWithHeader from '../components/sidebar/SidebarWithHeader'
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
    GridItem
} from "@chakra-ui/react";

const Profile = () => {
    return (

        <SidebarWithHeader>

            <Grid
                marginLeft='100px'
                padding='0px'
                h='200px'
                templateRows='repeat(2, 1fr)'
                templateColumns='repeat(5, 2fr)'
                gap={4}
            >
                <GridItem colSpan={4}  >
                    <Card
                        direction={{ base: "column", sm: "row" }}
                        overflow="hidden"
                        variant="outline"
                    >
                        <Image
                            maxW={{ base: "100%", sm: "100px" }}
                            marginLeft='30px'
                            padding='15px'
                            borderRadius='full'
                            objectFit="cover"
                            src='https://imgur.com/ijpmXRn.jpg'
                            alt="Caffe Latte"
                        />

                        <Stack>
                            <CardBody>
                                <Heading size="md">Mikias Girma</Heading>

                                <Text py="2">Mikias12@gmain.com</Text>
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
                                Full Name: Mikias Girma
                            </Text>
                            <Text fontSize="17px">
                                Email: Mikias12@gmail.com
                            </Text>
                            <Text fontSize="17px">
                                Country: Ethiopia
                            </Text>
                            <Text fontSize="17px">
                                Mobile: +251921493682
                            </Text>
                        </CardBody>
                    </Card>
                </GridItem>
                <GridItem colSpan={2}  >
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
                </GridItem>
            </Grid>

        </SidebarWithHeader>


    )
}

export default Profile
