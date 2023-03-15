import { Community } from "@/atoms/communitiesAtom";
import {
  Box,
  Flex,
  Text,
  Icon,
  Stack,
  Divider,
  Button,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import React from "react";
import { HiOutlineDotsHorizontal } from "react-icons/hi";
import { RiCakeLine } from "react-icons/ri";
import moment from "moment";
import Link from "next/link";

type AboutProps = {
  communityData: Community;
};

const About: React.FC<AboutProps> = ({ communityData }) => {
  const router = useRouter();
  return (
    <Box position="sticky" top="14px">
      <Flex
        align="center"
        justify="space-between"
        borderRadius="4px 4px 0px 0px"
        bg="blue.400"
        color="white"
        p={3}
      >
        <Text fontSize="10pt" fontWeight={700}>
          About Community
        </Text>
        <Icon as={HiOutlineDotsHorizontal} />
      </Flex>
      <Flex direction="column" p={3} bg="white" borderRadius="0px 0px 4px 4px">
        <Stack>
          <Flex width="100%" p={2} fontSize="10pt" fontWeight={700}>
            <Flex direction="column" flexGrow={1}>
              <Text>{communityData.numberOfMembers.toLocaleString()}</Text>
              <Text>Members</Text>
            </Flex>
            <Flex direction="column" flexGrow={1}>
              <Text>1</Text>
              <Text>Online</Text>
            </Flex>
          </Flex>
          <Divider />
          <Flex
            align="center"
            width="100%"
            p={1}
            fontWeight={500}
            fontSize="10pt"
          >
            <Icon as={RiCakeLine} fontSize={18} mr={2} />
            {communityData.createdAt && (
              <Text>
                Created{" "}
                {moment(new Date(communityData.createdAt.seconds)).format(
                  "MMM DD, YYYY"
                )}
              </Text>
            )}
          </Flex>
          <Link href={`/r/${router.query.communityId}/submit`}>
            <Button mt={3} height="30px" width="100%">
              Create Post
            </Button>
          </Link>
        </Stack>
      </Flex>
    </Box>
  );
};
export default About;