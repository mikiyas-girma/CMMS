// src/components/dashboard/RecentNotifications.jsx
import React from 'react';
import {
    Box,
    Heading,
    List,
    ListItem,
    Text,
    Badge,
    VStack,
} from '@chakra-ui/react';

const notifications = [
    { id: 1, message: 'Material A is below threshold', timestamp: '2024-05-18 10:30', source: 'System' },
    { id: 2, message: 'New material B added', timestamp: '2024-05-18 11:00', source: 'Admin' },
    { id: 3, message: 'Material C quantity updated', timestamp: '2024-05-18 11:15', source: 'Store Owner' },
];

const RecentNotifications = () => {
    return (
        <Box
            borderWidth="1px"
            borderRadius="lg"
            overflow="hidden"
            p={4}
            boxShadow="sm"
            maxH="400px"
            overflowY="auto"
        >
            <Heading size="md" mb={4}>Recent Notifications</Heading>
            <VStack spacing={3} align="stretch">
                {notifications.map((notification) => (
                    <Box key={notification.id} p={3} borderWidth="1px" borderRadius="md">
                        <Text fontWeight="bold">{notification.message}</Text>
                        <Text fontSize="sm" color="gray.500">{notification.timestamp}</Text>
                        <Badge colorScheme="blue" mt={2}>{notification.source}</Badge>
                    </Box>
                ))}
            </VStack>
        </Box>
    );
};

export default RecentNotifications;
