import { Flex } from "@chakra-ui/react";

const Footer = () => {
    return (
      <Flex as="footer" bg="gray.800" color="white" py={8}
        className="flex flex-col w-full justify-center items-center mt-7">
        © {new Date().getFullYear()} CMMS
      </Flex>
    );
};

export default Footer;
