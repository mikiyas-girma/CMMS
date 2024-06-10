// src/components/sidebar/SidebarWithHeader.jsx

import { getUserAuthStatus } from "../../utils/auth";
import {
  IconButton,
  Avatar,
  Box,
  CloseButton,
  Flex,
  HStack,
  VStack,
  Icon,
  useColorModeValue,
  Text,
  Drawer,
  DrawerContent,
  useDisclosure,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
} from "@chakra-ui/react";
import {
  FiTrendingUp,
  FiSettings,
  FiMenu,
  FiBell,
  FiChevronDown,
} from "react-icons/fi";
import Cookies from "js-cookie";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { MdDashboard } from "react-icons/md";
import { HiUsers } from "react-icons/hi2";
import { ImProfile } from "react-icons/im";
import { BiSolidReport } from "react-icons/bi";
import { capitalize } from "../../utils/capitalize";
import { useEffect, useState } from "react";
import apiInstance from "../../utils/axios";

const SidebarContent = ({ onClose, ...rest }) => {
  let LinkItems = [
    { name: "Dashboard", icon: MdDashboard, id: 1, to: "/dashboard" },
    { name: "Materials", icon: FiTrendingUp, id: 2, to: "/materials" },
    { name: "Employees", icon: HiUsers, id: 3, to: "/users" },
    { name: "Reports", icon: BiSolidReport, id: 4, to: "/reports" },
    { name: "Settings", icon: FiSettings, id: 5, to: "/settings" },
  ];
  const { role } = getUserAuthStatus();
  if (role === "admin") {
    LinkItems = LinkItems.filter(
      (link) => link.name !== "Materials" && link.name !== "Reports"
    );

    LinkItems = LinkItems.map((item) => {
      if (item.id === 3) {
        return { ...item, name: "StoreOwners" };
      }
      return item;
    });

    console.log("Linkitems: ", LinkItems);
  }
  if (role === "employee") {
    LinkItems = LinkItems.filter((link) => link.id !== 3);
    console.log("Linkitems: ", LinkItems);
  }
  if (role === "storeOwner") {
    // LinkItems = LinkItems.map((item) => {
    //   if (item.id === 3) {
    //     return { ...item, name: "Employees" };
    //   }
    //   return item;
    // });
    console.log("Linkitems: ", LinkItems);
  }

  return (
    <Box
      transition="3s ease"
      bg={useColorModeValue("gray.50", "gray.900")}
      borderRight="1px"
      borderRightColor={useColorModeValue("gray.200", "gray.700")}
      w={{ base: "full", md: 60 }}
      pos="fixed"
      h="full"
      {...rest}
    >
      <Flex h="20" alignItems="center" mx="8" justifyContent="space-between">
        <Link to="/">
          <Text fontSize="2xl" fontFamily="monospace" fontWeight="bold">
            CMMS
          </Text>
        </Link>
        <CloseButton display={{ base: "flex", md: "none" }} onClick={onClose} />
      </Flex>
      {LinkItems.map((link) => (
        <Link key={link.name} to={link.to}>
          {<NavItem icon={link.icon}>{link.name}</NavItem>}
        </Link>
      ))}
    </Box>
  );
};

const NavItem = ({ icon, children, ...rest }) => {
  return (
    <Box
      as="span"
      href="#"
      style={{ textDecoration: "none" }}
      _focus={{ boxShadow: "none" }}
    >
      <Flex
        align="center"
        p="4"
        mx="4"
        borderRadius="lg"
        role="group"
        cursor="pointer"
        _hover={{
          bg: "cyan.400",
          color: "white",
        }}
        {...rest}
      >
        {icon && (
          <Icon
            mr="4"
            fontSize="16"
            _groupHover={{
              color: "white",
            }}
            as={icon}
          />
        )}
        {children}
      </Flex>
    </Box>
  );
};

const MobileNav = ({ onOpen, ...rest }) => {
  const { role } = getUserAuthStatus();

  const [user, setUser] = useState("");
  const [error, setError] = useState("");
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await apiInstance.get("/users/me");
        console.log("users res", res);
        if (res?.data?.status === "success") {
          setUser(res.data.data.user);
        } else {
          setError("Failed to fetch user");
        }
      } catch (error) {
        setError(error.response?.data?.message || "Something went wrong");
      }
    };

    fetchUser();
  }, []);

  const navigate = useNavigate();

  const handleSignOut = () => {
    try {
      Cookies.remove("jwt");
      navigate("/");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };
  return (
    <Flex
      ml={{ base: 0, md: 60 }}
      px={{ base: 4, md: 4 }}
      height="20"
      alignItems="center"
      bg={useColorModeValue("gray.50", "gray.900")}
      borderBottomWidth="1px"
      borderBottomColor={useColorModeValue("gray.200", "gray.700")}
      justifyContent={{ base: "space-between", md: "flex-end" }}
      {...rest}
    >
      <IconButton
        display={{ base: "flex", md: "none" }}
        onClick={onOpen}
        variant="outline"
        aria-label="open menu"
        icon={<FiMenu />}
      />

      <Text
        display={{ base: "flex", md: "none" }}
        fontSize="2xl"
        fontFamily="monospace"
        fontWeight="bold"
      >
        CMMS
      </Text>

      <HStack spacing={{ base: "0", md: "6" }}>
        <IconButton
          size="lg"
          variant="ghost"
          aria-label="open menu"
          icon={<FiBell />}
          onClick={() => navigate("/notification")}
        />
        <Flex alignItems={"center"}>
          <Menu>
            <MenuButton
              py={2}
              transition="all 0.3s"
              _focus={{ boxShadow: "none" }}
            >
              <HStack>
                <Avatar size={"sm"} src={user.image} />
                <VStack
                  display={{ base: "none", md: "flex" }}
                  alignItems="flex-start"
                  spacing="1px"
                  ml="2"
                >
                  <Text fontSize="sm">{user.Fname + " " + user.Lname}</Text>
                  <Text fontSize="xs" color="gray.600">
                    {capitalize(role)}
                  </Text>
                </VStack>
                <Box display={{ base: "none", md: "flex" }}>
                  <FiChevronDown />
                </Box>
              </HStack>
            </MenuButton>
            <MenuList
              bg={useColorModeValue("gray.50", "gray.900")}
              borderColor={useColorModeValue("gray.200", "gray.700")}
            >
              <MenuItem>
                <Link to="/profile">Profile</Link>{" "}
              </MenuItem>
              <MenuItem>Settings</MenuItem>
              <MenuDivider />
              <MenuItem onClick={handleSignOut}>Sign out</MenuItem>
            </MenuList>
          </Menu>
        </Flex>
      </HStack>
    </Flex>
  );
};

const SidebarWithHeader = ({ children }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box minH="100vh" bg={useColorModeValue("gray.90")}>
      <SidebarContent
        onClose={onClose}
        display={{ base: "none", md: "block" }}
      />
      <Drawer
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        returnFocusOnClose={false}
        onOverlayClick={onClose}
        size="full"
      >
        <DrawerContent>
          <SidebarContent onClose={onClose} />
        </DrawerContent>
      </Drawer>
      <MobileNav onOpen={onOpen} />
      <Box ml={{ base: 0, md: 60 }} p="2">
        {children}
      </Box>
    </Box>
  );
};

export default SidebarWithHeader;
