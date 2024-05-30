import { useState } from "react";
import {
  Container,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Button,
  Heading,
  useColorModeValue,
  VStack,
  Center,
  InputGroup,
  InputRightElement,
  Checkbox,
  Link,
  Flex,
} from "@chakra-ui/react";
import { login } from "../../utils/login";

const SignIn = () => {
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);
  const [loading, setloading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("data", email, password);
    setloading(true);
    // const response = await login({ email, password });
    // console.log(response);
  };

  return (
    <Flex p={8} flex={1} align="center">
      <Stack spacing={4}>
        <Stack align="center">
          <Heading fontSize="2xl">Sign in to your account</Heading>
        </Stack>
        <VStack
          as="form"
          spacing={8}
          boxSize={{ base: "xs", sm: "sm", md: "sm" }}
          h="max-content !important"
          bg={useColorModeValue("white", "gray.700")}
          rounded="lg"
          boxShadow="lg"
          p={{ base: 5, sm: 10 }}
          onSubmit={handleSubmit}
        >
          <VStack spacing={4} w="100%">
            <FormControl id="username">
              <FormLabel>username</FormLabel>
              <Input
                rounded="md"
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </FormControl>
            <FormControl id="password">
              <FormLabel>Password</FormLabel>
              <Input
                rounded="md"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </FormControl>
          </VStack>
          <VStack w="100%">
            <Stack direction="row" justifyContent="space-between" w="100%">
              <Checkbox colorScheme="green" size="md">
                Remember me
              </Checkbox>
              <Link fontSize={{ base: "md", sm: "md" }}>Forgot password?</Link>
            </Stack>
            <Button
              bgGradient="linear(to-l, #0ea5e9,#2563eb)"
              _hover={{
                bgGradient: "linear(to-l, #0ea5e9,#2562eb)",
                opacity: 0.8,
              }}
              color="white"
              rounded="md"
              w="100%"
              type="submit"
            >
              Sign in
            </Button>
          </VStack>
        </VStack>
      </Stack>
    </Flex>
  );
};

export default SignIn;
