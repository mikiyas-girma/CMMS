// src/pages/Dashboard.jsx
import { Box, Grid, GridItem, Text } from '@chakra-ui/react';
import SidebarWithHeader from '../components/sidebar/SidebarWithHeader';

const Dashboard = () => {
    return (
        <SidebarWithHeader>
            <Box p="4" height="100vh">
                <Grid
                    height="100%"
                    gridTemplateColumns={'1fr .4fr 1fr'} 
                    templateRows="repeat(2, 1fr)"
                    gap={4}
                >
                    <GridItem colSpan={2} bg="green.300" p={4}>
                        <Text>Recent Activities</Text>
                    </GridItem>
                    <GridItem bg="cyan.200" p={4}>
                        <Text>Chart</Text>
                    </GridItem>
                    <GridItem colSpan={1} bg="blue.300" p={4}>
                        <Text>Chart 1</Text>
                    </GridItem>
                    <GridItem colSpan={2} bg="teal.600" p={4}>
                        <Text>Materials</Text>
                    </GridItem>
                </Grid>
            </Box>
        </SidebarWithHeader>
    );
};

export default Dashboard;
