import { Box, Grid, GridItem } from '@chakra-ui/react';
import { Text } from '@chakra-ui/react';


const Dashboard = () => {
  return (
    <div className='h-screen'>
      <Grid
        height={'100%'}
        gridTemplateColumns={'.2fr .8fr'}
        templateRows='repeat(2, 1fr)'
        gap={2}
      >
        <GridItem rowSpan={2} colSpan={1} bg={'gray.50'} >
          <div className=''>
            <Text color={'tomato'}>CMMS Dashboard</Text>
            <Box bg='tomato' w='100%'
                p={4} color='white'
            >
              <Text>Dashboard</Text>
              <Text>Materials</Text>
              <Text>Employees</Text>
              <Text>Profile</Text>
              <Text>Reports</Text>
              <Text>Settings</Text>
            </Box>
          </div>
        </GridItem>
        <GridItem rowSpan={2} colSpan={1} bg='gray.50'>
          <Grid
            height={'100%'}
            templateColumns='repeat(3, 1fr)'
            templateRows='repeat(2, 1fr)'
            gap={2}
          >
            <GridItem colSpan={2} bg='green.300'>
              <Text>Recent Activities</Text>
            </GridItem>
            <GridItem colSpan={1} bg='cyan.200'>
              <Text>Chart</Text>
            </GridItem>
            <GridItem colSpan={1} bg='blue.300'>
              <Text>chart 1</Text>
            </GridItem>
            <GridItem colSpan={2} bg='teal.600'>
              <Text>Materials</Text>
            </GridItem>
          </Grid>
        </GridItem>
      </Grid>
    </div>
  );
}

export default Dashboard;
