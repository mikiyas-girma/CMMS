import SidebarWithHeader from "../components/sidebar/SidebarWithHeader";
import {
  Card,
  CardHeader,
  Heading,
  CardBody,
  Stack,
  Box,
  Text,
  StackDivider,
  Flex,
  Button,
  HStack,
  Spacer,
  FormControl,
  FormLabel,
  Input,
} from "@chakra-ui/react";
import { useToast } from "@chakra-ui/react";
import { MdReceipt, MdSend, MdOutlineCancel } from "react-icons/md";
import { useLocation } from "react-router-dom";
import { format } from "timeago.js";

import { useState, useRef, useEffect } from "react";
import { getUserAuthStatus } from "../utils/auth";
import apiInstance from "../utils/axios";

const Notification = () => {
  const location = useLocation();
  const { notifications } = location.state || {};

  const [selectedNotification, setSelectedNotification] = useState(null);
  const [isDetailVisible, setIsDetailVisible] = useState(false);
  const [showSendForm, setShowSendForm] = useState(false);
  const detailRef = useRef(null);
  const [readNotfication, setReadNotifications] = useState([]);

  const toast = useToast();
  const { userId } = getUserAuthStatus();

  const notification = [
    {
      user: { name: "John" },
      materialName: "Dangote Cement 50kg",
      quantity: 3,
      time: "10:30 AM",
    },
    {
      user: { name: "mikiyas" },
      materialName: "Steel Rods",
      quantity: 2,
      time: "11:15 AM",
    },
    {
      user: { name: "Nanati" },
      materialName: "Paint Buckets",
      quantity: 4,
      time: "12:00 PM",
    },
    {
      user: { name: "Biniam" },
      materialName: "Bricks",
      quantity: 6,
      time: "1:30 PM",
    },
    {
      user: { name: "Nanati" },
      materialName: "Plumbing Fixtures",
      quantity: 1,
      time: "2:45 PM",
    },
    {
      user: { name: "Bini" },
      materialName: "Wood Boards",
      quantity: 8,
      time: "3:20 PM",
    },
    {
      user: { name: "Jibril" },
      materialName: "Nails",
      quantity: 5,
      time: "4:00 PM",
    },
    {
      user: { name: "Nanati" },
      materialName: "Insulation",
      quantity: 3,
      time: "4:45 PM",
    },
    {
      user: { name: "Mikiyas" },
      materialName: "Tiles",
      quantity: 7,
      time: "5:15 PM",
    },
    {
      user: { name: "Jibril" },
      materialName: "Paint Cans",
      quantity: 2,
      time: "6:00 PM",
    },
  ];

  const handleNotificationClick = (notification) => {
    setSelectedNotification(notification);
    setIsDetailVisible(true);
    setShowSendForm(false);

    if (detailRef.current) {
      detailRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    if (isDetailVisible && detailRef.current) {
      detailRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [selectedNotification, isDetailVisible]);

  const handleSendNotificationClick = () => {
    setIsDetailVisible(false);
    setShowSendForm(true);
  };
  const handleSendFormSubmit = (e) => {
    e.preventDefault();
    toast({
      title: "Notification Sent",
      description: `Notification sent `,
      status: "success",
      duration: 3000,
      isClosable: true,
      position: "top-center",
    });
    setShowSendForm(false);
  };
  const markAsRead = async (notificationId) => {
    try {
      await apiInstance.patch(`/notifications/markAsRead`, {
        notificationId,
      });
    } catch (error) {
      console.error("Error marking notification as read:", error);
    }
  };

  const handleCombinedClick = (notification) => {
    handleNotificationClick(notification);
    markAsRead(notification._id);
  };

  if (notifications?.length === 0) {
    return <p className="text-gray-500 text-center py-4">No Notifications</p>;
  }

  return (
    <SidebarWithHeader>
      <Flex justifyContent="flex-start" gap={4}>
        <Card variant="outline">
          <CardHeader>
            <Heading size="md">Notifications</Heading>
          </CardHeader>
          <CardBody>
            <Stack divider={<StackDivider />} spacing={4}>
              {notifications?.map((notification, index) => (
                <Box
                  key={index}
                  p={2}
                  borderRadius="md"
                  onClick={() => handleCombinedClick(notification)}
                  // onClick={() => handleNotificationClick(notification);markAsread(notification._id)}
                  cursor={"pointer"}
                >
                  <Text>
                    <strong>{notification?.from}</strong> requested
                    <span>
                      {!notification?.readBy?.includes(userId) ? (
                        <strong>
                          {notification.text.length > 35
                            ? `${notification.text.slice(0, 35)}...`
                            : notification.text}
                        </strong>
                      ) : notification.text.length > 35 ? (
                        `${notification.text.slice(0, 35)}...`
                      ) : (
                        notification.text
                      )}
                    </span>
                    <strong>{notification.materialName}</strong> at{" "}
                    <strong>{format(notification.createdAt)}</strong>
                    <MdReceipt />
                  </Text>
                </Box>
              ))}
            </Stack>
          </CardBody>
        </Card>
        <Card
          display={isDetailVisible ? "block" : "none"}
          ref={detailRef}
          height="max-content"
        >
          {selectedNotification && (
            <CardBody>
              <HStack>
                <Text>
                  <strong>{selectedNotification.from}</strong> requested{" "}
                  <span>{selectedNotification.text}</span>{" "}
                  <strong>{selectedNotification.materialName}</strong>at{" "}
                  <strong>{format(selectedNotification.createdAt)}</strong>
                </Text>
                <Spacer />
                <Button onClick={() => setIsDetailVisible(false)}>Close</Button>
              </HStack>
            </CardBody>
          )}
        </Card>
      </Flex>
    </SidebarWithHeader>
  );
};

export default Notification;
