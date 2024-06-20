// src/components/sidebar/SidebarWithHeader.jsx
import { io } from "socket.io-client";

import { deleteCookies, getUserAuthStatus } from "../../utils/auth";
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
import { useContext, useEffect, useRef, useState } from "react";
import apiInstance from "../../utils/axios";
import { ScaleLoader } from "react-spinners";
import { Spinner } from "@chakra-ui/react";
import { useMemo } from "react";
import { useUser } from "../../utils/UserContext";
import { UserProfile } from "../Profile/UserProfile";
import {
  getAllNotifications,
  getNotViewedNotifications,
} from "../../utils/notification";

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
      //   bg={useColorModeValue("gray.50", "gray.900")}
      bg={useColorModeValue("#fcfcfc", "gray.900")}
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
  const socket = useRef();
  const [onlineUsers, setOnlineUsers] = useState([]);
  const { role, userId } = getUserAuthStatus();
  const [error, setError] = useState("");
  const [Loading, setLoading] = useState(false);

  const { user, loading, resetUser } = useUser();
  const [notifications, setNotifications] = useState([]);
  const [recentnotifications, setRecentNotifications] = useState([]);
  const [NotVnotifications, setNotVNotifications] = useState([]);

  const [notiloading, setNotiloading] = useState(false);
  const [backendError, setBackendError] = useState(null);
  const [notviloading, setNotViloading] = useState(false);
  const [NbackendError, setNBackendError] = useState(null);
  const [notViewedLength, setnotViewedLength] = useState("");

  useEffect(() => {
    socket.current = io("http://localhost:3000");
    socket.current.emit("addUser", userId);
    socket.current.on("getUsers", (users) => {
      setOnlineUsers(users);
    });
    socket.current.on("newNotification", (data) => {
      setNotifications((prevNotifications) => [...prevNotifications, data]);
      setRecentNotifications((prevRecentNotifications) => [
        ...prevRecentNotifications,
        data,
      ]);
    });
    return () => {
      socket.current.disconnect();
    };
  }, [userId]);
  console.log("notificationsSocket", notifications);

  console.log("OnlineUseers", onlineUsers);
  //   const [user, setUser] = useState("");

  useEffect(() => {
    const getrecentNotification = async () => {
      setNotiloading(true);
      try {
        const response = await getAllNotifications(userId);
        setNotiloading(false);
        setNotifications(response?.data?.data?.notifications);

        if (response?.error) {
          setBackendError(response?.error);
        }
      } catch (error) {
        setNotiloading(false);
        setBackendError(error.message || "Something went wrong");
        console.error("Error fetching Notification", error);
      }
    };

    getrecentNotification();
  }, [userId]); // Empty dependency array ensures this runs only once

  useEffect(() => {
    const getunviewedNotification = async () => {
      setNotViloading(true);
      try {
        const response = await getNotViewedNotifications(userId);

        setNotViloading(false);
        setNotVNotifications(response?.data?.data?.notifications);
        setnotViewedLength(response?.data?.results);
        if (response?.error) {
          setNBackendError(response?.error);
        }
      } catch (error) {
        setNotViloading(false);
        setBackendError(error.message || "Something went wrong");
        console.error("Error fetching Notification", error);
      }
    };

    getunviewedNotification();
  }, [userId]); // Empty dependency array ensures this runs only once
  console.log(("notViewedLength", notViewedLength));

  console.log("NotViwednotifications", NotVnotifications);

  const navigate = useNavigate();
  const markAsViewed = async () => {
    const notificationIds = NotVnotifications.map(
      (notification) => notification._id
    );

    console.log("notificationIds", notificationIds);
    try {
      if (NotVnotifications.length > 0) {
        await apiInstance.patch("/notifications/markAsViewed", {
          userId,
          notificationIds,
        });
      }
      setRecentNotifications([]);
      setNotVNotifications([]);

      // console.log("Notifications marked as viewed:", response.data);
    } catch (error) {
      console.error("Error marking notifications as viewed:", error);
    }
  };
  console.log("NotView", NotVnotifications);
  const handleSignOut = async () => {
    try {
      // console.log("signing out this cookies jwt:", Cookies.get("jwt"));
      // Cookies.remove("jwt");
      // console.log("signing out this cookies jwt:", Cookies.get("jwt"));
      await deleteCookies("jwt");
      Cookies.remove("jwt");

      resetUser();
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
        <div className="relative" onClick={markAsViewed}>
          <IconButton
            size="lg"
            variant="ghost"
            aria-label="open menu"
            icon={<FiBell />}
            onClick={() =>
              navigate("/notification", { state: { notifications } })
            }
          />
          {(recentnotifications?.length > 0 || notViewedLength > 0) &&
            role !== "admin" && (
              <div className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                {recentnotifications?.length + notViewedLength}
              </div>
            )}
        </div>

        <Flex alignItems={"center"}>
          <Menu>
            <MenuButton
              py={2}
              transition="all 0.3s"
              _focus={{ boxShadow: "none" }}
            >
              {loading ? (
                <Spinner size="sm" />
              ) : (
                <UserProfile
                  user={user}
                  role={role}
                  capitalize={capitalize}
                  resetUser={resetUser}
                />
              )}
            </MenuButton>
            <MenuList
              bg={useColorModeValue("gray.50", "gray.900")}
              borderColor={useColorModeValue("gray.200", "gray.700")}
            >
              <MenuItem as={Link} to="/profile">
                Profile
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
