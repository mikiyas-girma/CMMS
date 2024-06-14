import * as React from 'react';
import {
    chakra,
    Container,
    Stack,
    HStack,
    Text,
    useColorModeValue,
    Button,
    Image,
    Skeleton,
    Box,
    Link,
    Icon
} from '@chakra-ui/react';
// Here we have used react-icons package for the icons
import { GoChevronRight } from 'react-icons/go';
import { MdBolt } from 'react-icons/md';
import { useColorMode } from '@chakra-ui/color-mode';
import SignIn from '../components/forms/SignIn';
import Features from '../components/common/Features';
import {useRef } from 'react';


export default function Home() {

    const signInRef = useRef(null);

    const focusSignIn = () => {
        if (signInRef.current) {
            signInRef.current.focus();
        }
    }

    const { colorMode, toggleColorMode } = useColorMode();

    return (
        <>
            <Container maxW="7xl" px={{ base: 6, md: 3 }} py={10}>
                <Stack direction={{ base: 'column', md: 'row' }} justifyContent="center" alignItems="center">
                    <Stack direction="column" spacing={2} justifyContent="center" maxW="480px">
                        <chakra.h1 fontSize={{ base: '3xl', sm: '2rem', md: '2.3rem', lg: '2.7rem' }}
                            lineHeight={1} fontWeight="bold" textAlign={{ base: 'left', md: 'left' }}>
                            Manage your inventory operation with<br />
                            <chakra.span color="teal">Best CMMS</chakra.span>
                        </chakra.h1>
                        <Text
                            fontSize={{ base: '1.2rem', md: '1.3rem', lg: '1.5rem' }}
                            textAlign={{ base: 'left', md: 'left' }}
                            lineHeight="1.375"
                            fontWeight="400"
                            color="gray.500"
                        >
                            Streamline material operation and revolutionize resource handling with our powerful CMMS.
                        </Text>
                        <HStack
                            spacing={{ base: 0, sm: 2 }}
                            mb={{ base: '3rem !important', sm: 0 }}
                            flexWrap="wrap"
                        >
                            <Link onClick={focusSignIn}>
                                <chakra.button
                                    w={{ base: '100%', sm: 'auto' }}
                                    h={12}
                                    px={6}
                                    color="white"
                                    size="lg"
                                    rounded="md"
                                    mb={{ base: 2, sm: 0 }}
                                    zIndex={5}
                                    lineHeight={1}
                                    bgGradient="linear(to-l, #0ea5e9,#2563eb)"
                                    _hover={{ bgGradient: 'linear(to-l, #0ea5e9,#2563eb)', opacity: 0.9 }}
                                >
                                    <chakra.span>Get IN</chakra.span>
                                    <Icon as={MdBolt} h={4} w={4} ml={1} />
                                </chakra.button>
                            </Link>
                        </HStack>
                    </Stack>
                    <Stack direction="column" spacing={6} px={4} justifyContent="right">
                        <SignIn ref={signInRef} />

                    </Stack>
                </Stack>
            </Container>
            <Features />

        </>
    )
}
