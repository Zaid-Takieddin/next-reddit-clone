import useDirectory from "@/hooks/useDirectory";
import { ChevronDownIcon } from "@chakra-ui/icons";
import {
  Flex,
  Icon,
  Image,
  Menu,
  MenuButton,
  MenuList,
  Text,
} from "@chakra-ui/react";
import React from "react";
import { TiHome } from "react-icons/ti";
import Communities from "./Communities";

const Directory: React.FC = () => {
  const { directoryState, toggleMenuOpen } = useDirectory();

  return (
    <Menu isOpen={directoryState.isOpen}>
      <MenuButton
        cursor="pointer"
        px={1}
        borderRadius={4}
        _hover={{ outline: "1px solid", outlineColor: "gray.200" }}
        onClick={() => toggleMenuOpen()}
      >
        <Flex
          align="center"
          justify="space-between"
          width={{ base: "auto", lg: "200px" }}
        >
          <Flex align="center">
            {directoryState.selectedMenuItem.imageURL ? (
              <Image
                src={directoryState.selectedMenuItem.imageURL}
                borderRadius="full"
                boxSize="24px"
                mr={{ base: 1, md: 2 }}
              />
            ) : (
              <Icon
                as={directoryState.selectedMenuItem.icon}
                color={directoryState.selectedMenuItem.iconColor}
                mr={{ base: 1, md: 2 }}
                fontSize={24}
              />
            )}

            <Flex
              direction="column"
              display={{ base: "none", lg: "flex" }}
              mr={1}
            >
              <Text fontWeight={600} fontSize="10pt">
                {directoryState.selectedMenuItem.displayText}
              </Text>
            </Flex>
          </Flex>
          <ChevronDownIcon />
        </Flex>
      </MenuButton>
      <MenuList zIndex={10}>
        <Communities />
      </MenuList>
    </Menu>
  );
};
export default Directory;
