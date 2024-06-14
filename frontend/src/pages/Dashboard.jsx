import { useLocation } from 'react-router';
import { Box, Grid, GridItem, Text } from '@chakra-ui/react';
import SidebarWithHeader from '../components/sidebar/SidebarWithHeader';
import LineChart from '../charts/graphs/LineChart';
import BarChart from '../charts/graphs/BarChart';
import InventoryOverview from '../components/materials/InventoryOverview';
import EmployeeOverview from '../components/employee/EmployeeOverview';
import RecentNotifications from '../components/notifications/RecentNotifications';
import MaterialAdditionsWithdrawalsChart from '../charts/graphs/MaterialAdditionsWithdrawalsChart';

const Dashboard = () => {
    const location = useLocation();
    return (
        <SidebarWithHeader>
            <Box p="4">
                <Grid
                    gridTemplateColumns={{ base: '1fr', md: '1fr 1fr', lg: '1fr .5fr 1fr' }}
                    templateRows={{ base: 'repeat(4, 1fr)', md: 'repeat(2, 1fr)' }}
                    gap={0}
                >
                    <GridItem colSpan={{ base: 1, md: 3, lg: 2 }} bg="" p={0} boxShadow="sm">
                        <InventoryOverview />
                    </GridItem>
                    <GridItem colSpan={{ base: 1, md: 3, lg: 1 }} boxShadow="sm" display="flex" justifyContent="center" alignItems="center">
                        <LineChart />
                    </GridItem>
                    <GridItem colSpan={{ base: 1, md: 3, lg: 1 }} bg="" px={4} boxShadow="sm">
                        <RecentNotifications />
                    </GridItem>
                    <GridItem colSpan={{ base: 1, md: 3, lg: 2 }} bg="" px={4} boxShadow="sm">
                        {/* <BarChart /> */}
                        <MaterialAdditionsWithdrawalsChart />
                    </GridItem>
                </Grid>
            </Box>
        </SidebarWithHeader>
    );
};

export default Dashboard;
