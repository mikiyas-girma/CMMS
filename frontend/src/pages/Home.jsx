import { Box, Button, FormControl, FormLabel, Input, Stack, useColorMode} from "@chakra-ui/react";
import { Card, CardHeader, CardBody, CardFooter, Text } from '@chakra-ui/react'
import { Heading, Grid, GridItem, VStack } from '@chakra-ui/react'

export default function Home() {

  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <>
      {/* <div className="mt-5">
      <h1 className="text-center text-indigo-500 text-4xl font-bold">
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
      </div> */}
      <div className="flex justify-end" >
        <Button onClick={toggleColorMode}>
           {colorMode === "light" ? "Dark" : "Light"}
        </Button>

      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mx-5 px-8">
        <section className="col-span-2 py-12 sm:pb-16 lg:pb-20 xl:pb-24">
          <div className="px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
            <div className="relative">
              <div className="">
                <h1 className="text-center w-11/12 mt-6 text-2xl font-normal sm:mt-10 sm:text-3xl lg:text-4xl xl:text-5xl">
                  <span className="">
                  Streamlining Inventory Operation &
                  </span>Revolutionizing Resource Handling</h1>
                <p className="w-11/12 mt-4 text-xl font-normal sm:mt-8">
                  Streamlining Material Operation & Revolutionizing Resource Handling Amet minim mollit non deserunt ullamco est sit aliqua  dolor do amet sint.
                  Velit officia consequat duis enim velit mollit. Exercitation veniam consequat.</p>
                <div className="  relative inline-flex items-center justify-center mt-8 sm:mt-12 group">
                  <div className="absolute transition-all duration-200 rounded-full -inset-px bg-gradient-to-r from-cyan-500 to-purple-500 group-hover:shadow-lg group-hover:shadow-cyan-500/50"></div>
                  <a href="#" title="" className="relative inline-flex items-center justify-center px-8 py-3 text-base font-normal text-white bg-black border border-transparent rounded-full" role="button">
                    Get Started </a>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="content-center">
          <Box maxW="md" mx="auto" mt={8} p={6} borderWidth={1} borderRadius="md" boxShadow="md">
            <form>
              <Stack spacing={4}>
                <FormControl id="email">
                  <FormLabel>Username</FormLabel>
                  <Input type="email" />
                </FormControl>
                <FormControl id="password">
                  <FormLabel>Password</FormLabel>
                  <Input type="password" />
                </FormControl>
                <Button colorScheme="blue" type="submit">Login</Button>
              </Stack>
            </form>
          </Box>
        </section>
      </div>
      <h3 className="text-center font-bold font-serif text-2xl">Features</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 m-4">
      <Box maxW="md" mx="auto" borderWidth={1} borderRadius="md" boxShadow="md">
        <Card  className="h-60 ">
          <CardHeader>Card header here</CardHeader>
          <CardBody>
            <Text>View a summary of all your customers over the last month.</Text>
          </CardBody>
        </Card>
        </Box>
      <Box maxW="md" mx="auto" borderWidth={1} borderRadius="md" boxShadow="md">
        <Card  className="h-60 ">
          <CardHeader>Card header here</CardHeader>
          <CardBody>
            <Text>View a summary of all your customers over the last month.</Text>
          </CardBody>
        </Card>
        </Box>
      <Box maxW="md" mx="auto" borderWidth={1} borderRadius="md" boxShadow="md">
        <Card  className="h-60 ">
          <CardHeader>Card header here</CardHeader>
          <CardBody>
            <Text>View a summary of all your customers over the last month.</Text>
          </CardBody>
        </Card>
        </Box>
      </div>

    </>
  )
}
