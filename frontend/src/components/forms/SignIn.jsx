import { useState } from "react";
import { useNavigate } from "react-router-dom";

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
import {
    validateEmail,
    validatePassword,
    handleBlurEmail,
    handleBlurPassword,
} from "../../utils/validateLogin";

import { login } from "../../utils/auth";
import { PulseLoader } from "react-spinners";
import { useUser } from "../../utils/UserContext";


const SignIn = () => {
    const navigate = useNavigate();

    const [show, setShow] = useState(false);
    const handleClick = () => setShow(!show);
    const [loading, setloading] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [emailError, setEmailError] = useState("");
    const [backenderror, setBakendError] = useState("");
    // const [frontVidationerror, setFrontError] = useState("");

    const [passwordError, setPasswordError] = useState("");

    const handleSignIn = (e) => {
        e.preventDefault();

        const emailError = validateEmail(email) ? "" : "Please enter valid email";
        const passwordError = validatePassword(password)
            ? ""
            : "Password should be > 5 characters";

        setEmailError(emailError);
        setPasswordError(passwordError);

        if (emailError || passwordError) {
            setTimeout(() => {
                setEmailError("");
                setPasswordError("");
            }, 100);
            return;
        }
    };

    let response = {};

    const { triggerLoginAttempt } = useUser();

    const handleSubmit = async (e) => {
        e.preventDefault();
        // console.log("da", email, password);
        // if (!validateLogin(email, password)) {
        //   setFrontError("Please enter valid email and password");
        //   return;
        // }
        setloading(true);
        response = await login(email, password);
        setloading(false);

        if (response?.data?.user) {
            triggerLoginAttempt();

            if (response?.data?.user?.role === "admin") {
                navigate("/dashboard");
            }
            if (response?.error) {
                setBakendError(response?.error);
                setTimeout(() => {
                    setBakendError("");
                }, 1500);
            }
            // if storeOwner redirecting to /employees

            if (response?.data?.user?.role === "employee") {
                navigate("/dashboard");
            } else if (response?.data?.user?.role === "storeOwner") {
                navigate("/users");
            }
        }

        // console.log(("error", error));
        setEmail("");
        setPassword("");
    };
    // navigate("/dashboard");

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
                    bg={useColorModeValue("rgba(255,235,245,.2)", "gray.700")}
                    rounded="lg"
                    boxShadow="lg"
                    p={{ base: 5, sm: 10 }}
                    onSubmit={handleSubmit}
                >
                    <VStack spacing={4} w="100%">
                        <FormControl id="username">
                            <FormLabel>Email</FormLabel>
                            <Input
                                rounded="md"
                                type="text"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                onBlur={(e) => handleBlurEmail(e, setEmailError)}
                            />
                            {emailError && (
                                <p className="mt-2 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative w-full">
                                    {emailError}
                                </p>
                            )}
                        </FormControl>
                        <FormControl id="password">
                            <FormLabel>Password</FormLabel>
                            <Input
                                rounded="md"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                onBlur={(e) => handleBlurPassword(e, setPasswordError)}
                            />
                        </FormControl>
                        {passwordError && (
                            <p className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative w-full">
                                {passwordError}
                            </p>
                        )}
                        {backenderror && (
                            <p className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative w-full">
                                {backenderror}
                            </p>
                        )}
                    </VStack>
                    <VStack w="100%">
                        <Stack direction="row" justifyContent="space-between" w="100%">
                            {/* <Checkbox colorScheme="green" size="md">
                Remember me
              </Checkbox> */}
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
                            disabled={loading}
                        >
                            {loading ? <PulseLoader color="#FFFFFF" /> : "Sign in"}
                        </Button>
                    </VStack>
                </VStack>
            </Stack>
        </Flex>
    );
};

export default SignIn;
