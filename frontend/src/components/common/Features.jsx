import { Container, Box, chakra, Text, Icon, SimpleGrid } from '@chakra-ui/react';
// Here we have used react-icons package for the icons
import { MdConstruction } from "react-icons/md";
import { HiBell, HiViewBoards } from "react-icons/hi";
import { ImStatsBars } from "react-icons/im";
import { BiDesktop } from "react-icons/bi";



const features = [
  {
    heading: 'Real-time inventory tracking',
    content:' Our system provides up-to-the-minute updates on material quantities and availability, so you can make informed decisions in real-time.',
    icon: MdConstruction
  },
  {
    heading: 'Notification Capability',
    content: `Our system alerts you whenever material quantities fall below preset thresholds,\
                ensuring you can replenish stock in time and maintain smooth operations.`,

    icon: HiBell
  },
  {
    heading: 'Powerful Analytics',
    content: `Make data-driven decisions to optimize your material management processes and\
                improve overall efficiency.`,
    icon: ImStatsBars
  },
  {
    heading: 'Intuitive User Interfaces',
    content: 'Experience a seamless and user-friendly interface designed to simplify your material management tasks. ',
    icon: BiDesktop
  }
];

const Features = () => {
  return (
    <Container maxW="6xl" p={{ base: 5, md: 10 }}>
      <chakra.h3 fontSize="4xl" fontWeight="bold" mb={3} textAlign="center">
        Features
      </chakra.h3>
      <SimpleGrid columns={{ base: 1, md: 2 }} placeItems="center" spacing={16} mt={12} mb={4}>
        {features.map((feature, index) => (
          <Box key={index} textAlign="center">
            <Icon as={feature.icon} w={10} h={10} color="blue.400" />
            <chakra.h3 fontWeight="semibold" fontSize="2xl">
              {feature.heading}
            </chakra.h3>
            <Text fontSize="md">{feature.content}</Text>
          </Box>
        ))}
      </SimpleGrid>
    </Container>
  );
};

export default Features;
