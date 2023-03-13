import PageContent from "@/components/Layout/PageContent";
import NewPostForm from "@/components/Posts/NewPostForm";
import { Box, Text } from "@chakra-ui/react";
import React from "react";

const SubmitPostPage: React.FC = () => {
  return (
    <PageContent>
      <>
        <Box py="14px" borderBottom="1px solid white">
          <Text fontWeight={600}>Create a Post</Text>
        </Box>
        <NewPostForm />
      </>
      <>{/* <About /> */}</>
    </PageContent>
  );
};
export default SubmitPostPage;
