import React from 'react';
import { Link } from 'react-router-dom';
import { Box, Heading, Grid, GridItem, useColorMode } from '@chakra-ui/react';
import { Button } from '@chakra-ui/react';

const Dashboard = () => {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <div style={{ height: '100vh' }}>
      <Button onClick={toggleColorMode}>
        Toggle {colorMode === "light" ? "Dark" : "Light"} Mode
      </Button>
      <Link to="/">Go to Homepage</Link>
    
      <Box p={4}>
        <Heading as="h1" size="xl" mb={4}>
          Chakra Purity Dashboard
        </Heading>
        <Grid templateColumns="repeat(3, 1fr)" gap={4}>
          <GridItem bg="gray.200" p={4} borderRadius="md">
            {/* Add your first dashboard component here */}
          </GridItem>
          <GridItem bg="gray.200" p={4} borderRadius="md">
            {/* Add your second dashboard component here */}
          </GridItem>
          <GridItem bg="gray.200" p={4} borderRadius="md">
            {/* Add your third dashboard component here */}
          </GridItem>
        </Grid>
      </Box>
    </div>
  );
};

export default Dashboard;
