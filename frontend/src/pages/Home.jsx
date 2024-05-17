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

export default function Home() {

    const { colorMode, toggleColorMode } = useColorMode();

    return (
        <>
            {/* <div className="mt-5">
      <h1 className="text-center text-indigo-500 t</Container>ext-4xl font-bold">
      Construction Material && Machinery Management System
      </h1>
      </div>
      <div>
      <h3 className="text-left text-indigo-700 text-xl font-bold">Streamlining Material Operation and Revolutionizing Resource Handling</h3>
      </div>
      <div>
      <div>
      <h4>Say goodbye to manual inventory tracking and hello to seamless material management.</h4>
      <ul>
        <li>Real-time inventory tracking</li>
        <li>Intuitive user interfaces</li>
        <li>Powerful analytics for informed decision-making</li>
        <li>Enhance productivity</li>
      </ul>
      </div>
        <Button onClick={toggleColorMode}>
          Toggle {colorMode === "light" ? "Dark" : "Light"} Mode
        </Button>
      </div> */}
            <Container maxW="6xl" px={{ base: 6, md: 3 }} py={0}>
                <Stack direction={{ base: 'column', md: 'row' }} justifyContent="center" alignItems="center">
                    <Stack direction="column" spacing={6} justifyContent="center" maxW="480px">
                        <chakra.h1 fontSize="5xl" lineHeight={1} fontWeight="bold" textAlign="left">
                            Build products faster <br />
                            <chakra.span color="teal">in ChakraUI</chakra.span>
                        </chakra.h1>
                        <Text
                            fontSize="1.2rem"
                            textAlign="left"
                            lineHeight="1.375"
                            fontWeight="400"
                            color="gray.500"
                        >
                            TemplatesKart provides the best ChakraUI templates. Focus on your business, not on the
                            boilerplate.
                        </Text>
                        <HStack
                            spacing={{ base: 0, sm: 2 }}
                            mb={{ base: '3rem !important', sm: 0 }}
                            flexWrap="wrap"
                        >
                            <Link href='/dashboard'>
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
                                    <chakra.span>Get  Dashboard </chakra.span>
                                    <Icon as={MdBolt} h={4} w={4} ml={1} />
                                </chakra.button>
                            </Link>
                        </HStack>
                    </Stack>
                    <Stack direction="column" spacing={6} px={4} justifyContent="center" maxW="450px">
                        <SignIn />

                    </Stack>
                </Stack>
            </Container>
            <Features />

        </>
    )
}
