import { Flex } from "@chakra-ui/react";

const Footer = () => {
    return (
      <Flex bottom={0} as="footer" bg="gray.800" color="white" py={8}
        className="flex flex-col w-full justify-center items-center">
        © {new Date().getFullYear()} CMMS
      </Flex>
    );
};

export default Footer;
