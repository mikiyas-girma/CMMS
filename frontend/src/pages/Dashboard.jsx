import { useLocation } from 'react-router';
import { Box, Grid, GridItem, Text } from '@chakra-ui/react';
import SidebarWithHeader from '../components/sidebar/SidebarWithHeader';
import LineChart from '../charts/graphs/LineChart';
import BarChart from '../charts/graphs/BarChart';
import InventoryOverview from '../components/materials/InventoryOverview';
import EmployeeOverview from '../components/employee/EmployeeOverview';
import RecentNotifications from '../components/notifications/RecentNotifications';

const Dashboard = () => {
    const location = useLocation();
    return (
        <SidebarWithHeader>
            <Box p="4">
                <Grid
                    gridTemplateColumns={'1fr .4fr 1fr'}
                    templateRows="repeat(2, 1fr)"
                    gap={0}
                >
                    <GridItem colSpan={2} bg="" p={0} boxShadow="sm">
                        <InventoryOverview />
                    </GridItem>
                    <GridItem bg="" px={4} boxShadow="sm">
                        <Text>Chart</Text>
                        <LineChart />
                    </GridItem>
                    <GridItem colSpan={1} bg="" px={4} boxShadow="sm">
                        {/* <EmployeeOverview /> */}
                        <RecentNotifications />
                    </GridItem>
                    <GridItem colSpan={2} bg="" px={4} boxShadow="sm">
                        <Text>Materials</Text>
                        <BarChart />
                    </GridItem>
                </Grid>
            </Box>
        </SidebarWithHeader>
    );
};

export default Dashboard;
