import { auth } from "@/firebase/clientApp";
import { Button, Flex, Image } from "@chakra-ui/react";
import React from "react";
import { useSignInWithGoogle } from "react-firebase-hooks/auth";

const OAuthButtons: React.FC = () => {
  const [signInWithGoogle, user, loading, error] = useSignInWithGoogle(auth);

  return (
    <Flex width="100%" direction="column" mb={4}>
      <Button
        variant="oauth"
        height="36px"
        isLoading={loading}
        onClick={() => signInWithGoogle()}
      >
        <Image src="/images/googlelogo.png" height="20px" mr={4} />
        Continue with Google
      </Button>
    </Flex>
  );
};
export default OAuthButtons;
