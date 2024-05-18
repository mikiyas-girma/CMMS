import { useLocation } from 'react-router';
import { Box, Grid, GridItem, Text } from '@chakra-ui/react';
import SidebarWithHeader from '../components/sidebar/SidebarWithHeader';
import LineChart from '../charts/graphs/LineChart';
import BarChart from '../charts/graphs/BarChart';

const Dashboard = () => {
    const location = useLocation();
    return (
        <SidebarWithHeader>
            <Box p="4" height="100vh">
                <Grid
                    height="100%"
                    gridTemplateColumns={'1fr .4fr 1fr'}
                    templateRows="repeat(2, 1fr)"
                    gap={4}
                >
                    <GridItem colSpan={2} bg="gray" p={4} boxShadow="lg">
                        <Text>Recent Activities</Text>
                    </GridItem>
                    <GridItem bg="" p={4} boxShadow="lg">
                        <Text>Chart</Text>
                        <LineChart />
                    </GridItem>
                    <GridItem colSpan={1} bg="blue.300" p={4} boxShadow="sm">
                        <Text>Chart 1</Text>
                    </GridItem>
                    <GridItem colSpan={2} bg="" p={4} boxShadow="sm">
                        <Text>Materials</Text>
                        <BarChart />
                    </GridItem>
                </Grid>
            </Box>
        </SidebarWithHeader>
    );
};

export default Dashboard;
