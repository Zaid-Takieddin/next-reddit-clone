import { Flex, Icon } from "@chakra-ui/react";
import { BsArrowUpRightCircle, BsChatDots } from "react-icons/bs";
import { GrAdd } from "react-icons/gr";
import {
  IoFilterCircleOutline,
  IoNotificationsOutline,
  IoVideocamOutline,
} from "react-icons/io5";
import React from "react";

const Icons: React.FC = () => {
  return (
    <Flex align="center" flexGrow={1}>
      <Flex
        align="center"
        display={{ base: "none", md: "flex" }}
        borderRight="1px solid"
        borderColor="gray.200"
      >
        <Flex
          mx={1.5}
          padding={1}
          cursor="pointer"
          borderRadius={4}
          _hover={{ bg: "gray.200" }}
        >
          <Icon as={BsArrowUpRightCircle} fontSize={22} />
        </Flex>
        <Flex
          mx={1.5}
          padding={1}
          cursor="pointer"
          borderRadius={4}
          _hover={{ bg: "gray.200" }}
        >
          <Icon as={IoFilterCircleOutline} fontSize={23} />
        </Flex>
        <Flex
          mx={1.5}
          padding={1}
          cursor="pointer"
          borderRadius={4}
          _hover={{ bg: "gray.200" }}
        >
          <Icon as={IoVideocamOutline} fontSize={23} />
        </Flex>
      </Flex>
      <>
        <Flex
          mx={1.5}
          padding={1}
          cursor="pointer"
          borderRadius={4}
          _hover={{ bg: "gray.200" }}
        >
          <Icon as={BsChatDots} fontSize={22} />
        </Flex>
        <Flex
          mx={1.5}
          padding={1}
          cursor="pointer"
          borderRadius={4}
          _hover={{ bg: "gray.200" }}
        >
          <Icon as={IoNotificationsOutline} fontSize={22} />
        </Flex>
        <Flex
          mx={1.5}
          padding={1}
          cursor="pointer"
          borderRadius={4}
          _hover={{ bg: "gray.200" }}
          display={{ base: "none", md: "flex" }}
        >
          <Icon as={GrAdd} fontSize={22} />
        </Flex>
      </>
    </Flex>
  );
};
export default Icons;
