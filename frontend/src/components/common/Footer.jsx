import { Flex } from "@chakra-ui/react";

const Footer = () => {
    return (
      <Flex as="footer" justifyContent="center" alignItems="center" bg="gray.800" color="white" py={8}>
      {/* Footer content */}
      © {new Date().getFullYear()} CMMS
    </Flex>
    );
};

export default Footer;
