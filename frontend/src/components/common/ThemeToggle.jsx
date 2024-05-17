import React from 'react';
import { IconButton, useColorMode, useColorModeValue, Box } from '@chakra-ui/react';
import { FaSun, FaMoon } from 'react-icons/fa';

const ThemeToggle = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const icon = useColorModeValue(<FaMoon />, <FaSun />);
  const bgColor = useColorModeValue('gray.100', 'gray.900');
  const color = useColorModeValue('black', 'white');

  return (
    <Box
      display="flex"
      justifyContent="flex-end"
      p={4}
      color={color}
    >
      <IconButton
        aria-label="Toggle theme"
        icon={icon}
        onClick={toggleColorMode}
        size="lg"
        isRound
        bg={useColorModeValue('gray.300', 'gray.700')}
        _hover={{
          bg: useColorModeValue('gray.400', 'gray.600'),
        }}
        color={useColorModeValue('black', 'white')}
      />
    </Box>
  );
};

export default ThemeToggle;
