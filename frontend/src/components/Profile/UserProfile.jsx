import React, { useEffect, useState } from "react";
import { Avatar, HStack, VStack, Text, Box } from "@chakra-ui/react";
import { FiChevronDown } from "react-icons/fi";

export const UserProfile = React.memo(({ user, role, capitalize }) => {
  const [imageUrl, setImageUrl] = useState("");

  useEffect(() => {
    if (user && user.image) {
      const newImageUrl = `http://127.0.0.1:3000/public/img/users/${user.image}`;
      setImageUrl(newImageUrl);
    }
  }, [user?.image]);

  if (!user) {
    return <div>Loading user profile...</div>; // Handle loading state
  }

  return (
    <HStack>
      <Avatar size={"sm"} src={imageUrl} />
      <VStack
        display={{ base: "none", md: "flex" }}
        alignItems="flex-start"
        spacing="1px"
        ml="2"
      >
        <Text fontSize="sm">
          {user.Fname} {user.Lname}
        </Text>
        <Text fontSize="xs" color="gray.600">
          {capitalize(role)}
        </Text>
      </VStack>
      <Box display={{ base: "none", md: "flex" }}>
        <FiChevronDown />
      </Box>
    </HStack>
  );
});
