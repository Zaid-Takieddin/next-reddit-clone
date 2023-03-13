import { ChevronDownIcon } from "@chakra-ui/icons";
import {
  Flex,
  Menu,
  MenuButton,
  Icon,
  MenuList,
  MenuItem,
  MenuDivider,
  Text,
} from "@chakra-ui/react";
import { signOut, User } from "firebase/auth";
import React from "react";
import { FaRedditSquare } from "react-icons/fa";
import { VscAccount } from "react-icons/vsc";
import { CgProfile } from "react-icons/cg";
import { MdOutlineLogout, MdOutlineLogin } from "react-icons/md";
import { auth } from "@/firebase/clientApp";
import { useResetRecoilState, useSetRecoilState } from "recoil";
import { authModalState } from "@/atoms/authModalAtom";
import { IoSparkles } from "react-icons/io5";
import { communityState } from "@/atoms/communitiesAtom";

type UserMenuProps = {
  user?: User | null;
};

const UserMenu: React.FC<UserMenuProps> = ({ user }) => {
  const resetCommunityState = useResetRecoilState(communityState);
  const setAuthModalState = useSetRecoilState(authModalState);

  const logout = async () => {
    await signOut(auth);
    resetCommunityState();
  };

  return (
    <Menu>
      <MenuButton
        cursor="pointer"
        px={1}
        borderRadius={4}
        _hover={{ outline: "1px solid", outlineColor: "gray.200" }}
      >
        <Flex align="center">
          {user ? (
            <>
              <Icon as={FaRedditSquare} mr={1} color="gray.300" fontSize={24} />
              <Flex
                direction="column"
                display={{ base: "none", lg: "flex" }}
                fontSize="8pt"
                align="self-start"
                mr={8}
              >
                <Text fontWeight={700}>
                  {user?.displayName || user?.email?.split("@")[0]}
                </Text>
                <Flex align="center">
                  <Icon as={IoSparkles} color="brand.100" mr={1} />
                  <Text color="gray.400">1 Karma</Text>
                </Flex>
              </Flex>
            </>
          ) : (
            <Icon as={VscAccount} mr={1} color="gray.300" fontSize={24} />
          )}
          <ChevronDownIcon />
        </Flex>
      </MenuButton>
      <MenuList>
        {user ? (
          <>
            <MenuItem
              fontSize="10pt"
              fontWeight={700}
              _hover={{ bg: "blue.500", color: "white" }}
            >
              <Flex align="center">
                <Icon as={CgProfile} fontSize={20} mr={2} />
                Profile
              </Flex>
            </MenuItem>
            <MenuDivider />
            <MenuItem
              fontSize="10pt"
              fontWeight={700}
              _hover={{ bg: "blue.500", color: "white" }}
              onClick={logout}
            >
              <Flex align="center">
                <Icon as={MdOutlineLogout} fontSize={20} mr={2} />
                Log Out
              </Flex>
            </MenuItem>
          </>
        ) : (
          <MenuItem
            fontSize="10pt"
            fontWeight={700}
            _hover={{ bg: "blue.500", color: "white" }}
            onClick={() => setAuthModalState({ open: true, view: "login" })}
          >
            <Flex align="center">
              <Icon as={MdOutlineLogin} fontSize={20} mr={2} />
              Log In / Sign Up
            </Flex>
          </MenuItem>
        )}
      </MenuList>
    </Menu>
  );
};
export default UserMenu;
