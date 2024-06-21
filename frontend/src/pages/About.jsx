import { Box, Button, Card, CardBody, CardFooter, CardHeader, Grid, GridItem, HStack, Heading, Image, Stack, StackDivider, Text } from "@chakra-ui/react";
import SidebarWithHeader from "../components/sidebar/SidebarWithHeader";

const About = () => {
    return (
        <SidebarWithHeader>
        <div><br /><br />
            <Text fontSize='30px' color='blueblack' as='b' marginLeft='440px' marginTop='40px'  >About Us</Text><br />
            <Text noOfLines={[1, 2, 3]} textAlign='center'>Welcome to our Construction and Material Store Management System, your one-stop solution for streamlining your construction business operations. We've developed this comprehensive platform to address the unique challenges faced by construction companies and material suppliers in today's fast-paced industry.</Text><br />
            <Text fontSize='20px' color='blueblack' as='b' marginLeft='450px' marginTop='40px'  >Our Mission</Text><br />
            <Text noOfLines={[1, 2, 3]} textAlign='center'>Our mission is to empower construction professionals and material providers with the tools and insights they need to optimize their workflows, increase efficiency, and drive business growth. By combining cutting-edge technology, industry expertise, and a deep understanding of the construction ecosystem, we strive to revolutionize the way you manage your construction and material operations.</Text><br />
            <Text fontSize='20px' color='blueblack' as='b' marginLeft='450px' marginTop='40px'  >Key Features</Text><br />
            <Text noOfLines={[1, 2, 3]} textAlign='center'> Our Construction and Material Store Management System offers a wide range of features designed to meet the diverse needs of our customers:</Text><br />
              <HStack marginLeft='100px' marginRight='100px' marginBottom='50px' >
                 <Card  marginLeft='100px' >
                    <CardBody  marginTop='20px'>
                        <Stack divider={<StackDivider />} spacing='10' >
                        <Box>
                            <Heading size='xs' textTransform='uppercase'>
                            Inventory Management
                            </Heading>
                            <Text pt='2' fontSize='sm'>
                            Effortlessly track and manage your inventory of construction materials, equipment, and supplies, ensuring you always have the right products on hand when you need them.
                            </Text>
                        </Box>
                        <Box>
                            <Heading size='xs' textTransform='uppercase'>
                            Project Tracking
                            </Heading>
                            <Text pt='2' fontSize='sm'>
                            Monitor the progress of your ongoing construction projects, keep your team informed, and make data-driven decisions to ensure timely completion and profitability.
                            </Text>
                        </Box>
                        <Box marginBottom='20px'>
                            <Heading size='xs' textTransform='uppercase'>
                            Procurement and Ordering
                            </Heading>
                            <Text pt='2' fontSize='sm'>
                            Simplify the procurement process by integrating supplier catalogs, automating order placement, and streamlining invoice management.
                            </Text>
                        </Box>
                        </Stack>
                    </CardBody>
                </Card>
                <Card marginRight='100px' gap='300px'>
                        <CardBody gap='10px'marginTop='20px'>
                            <Stack divider={<StackDivider />} spacing='10' columnGap='3'>
                            <Box>
                                <Heading size='xs' textTransform='uppercase'>
                                Financial Reporting
                                </Heading>
                                <Text pt='2' fontSize='sm'>
                                Gain real-time insights into your financial performance, with comprehensive reports and analytics to help you make informed business decisions.                                </Text>
                            </Box>
                            <Box>
                                <Heading size='xs' textTransform='uppercase'>
                                Workforce Management
                                </Heading>
                                <Text pt='2' fontSize='sm'>
                                Efficiently schedule and coordinate your team's activities, track their productivity, and ensure optimal resource utilization across your construction projects.                                </Text>
                            </Box>
                            <Box marginBottom='20px'>
                                <Heading size='xs' textTransform='uppercase'>
                                Customizable Dashboards
                                </Heading>
                                <Text pt='2' fontSize='sm'>
                                Tailor the user experience to your specific needs, with customizable dashboards and reporting tools that provide a clear, at-a-glance view of your business operations.                                </Text>
                            </Box>
                            </Stack>
                        </CardBody>
                    </Card>
                </HStack>       
            <Text fontSize='20px' color='blueblack' as='b' marginLeft='380px'    > Our Commitment to Excellence</Text><br /><br />
            <Text noOfLines={[1, 2, 3]} marginLeft='20px' >At the core of our Construction and Material Store Management System is a relentless commitment to excellence. We've assembled a team of industry experts, software engineers, and customer service professionals who are dedicated to delivering exceptional solutions and providing unparalleled support to our clients.</Text>
            <Text noOfLines={[1, 2, 3]} marginLeft='20px'>We understand the unique challenges faced by construction companies and material suppliers, and we've designed our system to address those challenges head-on. By continuously innovating and adapting to the evolving needs of the industry, we strive to be the trusted partner in your construction and material management journey.</Text>
            <Text noOfLines={[1, 2, 3]} marginLeft='20px'>We invite you to explore the capabilities of our Construction and Material Store Management System and discover how it can transform your business. Contact us today to learn more and schedule a personalized demonstration.</Text>
       <br /><br />          
    </div>    
    </SidebarWithHeader>
        );
};

export default About;
