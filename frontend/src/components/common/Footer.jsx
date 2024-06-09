import { Flex } from "@chakra-ui/react";

const Footer = () => {
    return (
      <Flex bottom={0}  as="footer" py={8}
        className="flex flex-col w-full justify-center items-center">
        © {new Date().getFullYear()} CMMS
      </Flex>
    );
};

export default Footer;
