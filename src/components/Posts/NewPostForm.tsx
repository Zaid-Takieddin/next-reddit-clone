import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Flex,
  Icon,
} from "@chakra-ui/react";
import React from "react";
import { BsLink45Deg, BsMic } from "react-icons/bs";
import { IoDocumentText, IoImageOutline } from "react-icons/io5";
import { BiPoll } from "react-icons/bi";
import Item from "./TabItem";
import TextInputs from "./PostForm/TextInputs";
import ImageUpload from "./PostForm/ImageUpload";
import { Post } from "@/atoms/postsAtom";
import { useRouter } from "next/router";
import { User } from "firebase/auth";
import {
  addDoc,
  collection,
  serverTimestamp,
  Timestamp,
  updateDoc,
} from "firebase/firestore";
import { firestore, storage } from "@/firebase/clientApp";
import { getDownloadURL, ref, uploadString } from "firebase/storage";

const formTabs: TabItem[] = [
  {
    title: "Post",
    icon: IoDocumentText,
  },
  {
    title: "Images & Video",
    icon: IoImageOutline,
  },
  {
    title: "Link",
    icon: BsLink45Deg,
  },
  {
    title: "Poll",
    icon: BiPoll,
  },
  {
    title: "Talk",
    icon: BsMic,
  },
];

export type TabItem = {
  title: string;
  icon: typeof Icon.arguments;
};

type NewPostFormProps = {
  user: User;
};

const NewPostForm: React.FC<NewPostFormProps> = ({ user }) => {
  const router = useRouter();
  const [selectedTab, setSelectedTab] = React.useState(formTabs[0].title);
  const [textInputs, setTextInputs] = React.useState({
    title: "",
    body: "",
  });
  const [selectedFile, setSelectedFile] = React.useState<string>();
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(false);

  const handleCreatePost = async () => {
    const { communityId } = router.query;

    const newPost: Post = {
      communityId: communityId as string,
      creatorId: user.uid,
      creatorDisplayName: user.email!.split("@")[0],
      title: textInputs.title,
      body: textInputs.body,
      numberOfComments: 0,
      voteStatus: 0,
      createdAt: serverTimestamp() as Timestamp,
    };

    setLoading(true);

    try {
      const postDocRef = await addDoc(collection(firestore, "posts"), newPost);

      if (selectedFile) {
        const imageRef = ref(storage, `posts/${postDocRef.id}/image`);
        await uploadString(imageRef, selectedFile, "data_url");
        const downloadURL = await getDownloadURL(imageRef);

        await updateDoc(postDocRef, {
          imageURL: downloadURL,
        });
      }
      router.back();
    } catch (error: any) {
      console.log("handleCreatePost error", error.message);
      setError(true);
    }

    setLoading(false);
  };

  const onTextChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const {
      target: { name, value },
    } = event;
    setTextInputs((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const onSelectImage = (event: React.ChangeEvent<HTMLInputElement>) => {
    const reader = new FileReader();
    if (event.target.files?.[0]) {
      reader.readAsDataURL(event.target.files[0]);
    }

    reader.onload = (readerEvent) => {
      if (readerEvent.target?.result) {
        setSelectedFile(readerEvent.target.result as string);
      }
    };
  };

  return (
    <Flex direction="column" bg="white" borderRadius={4} mt={2}>
      <Flex width="100%">
        {formTabs.map((item) => (
          <Item
            key={item.title}
            item={item}
            selected={item.title === selectedTab}
            setSelectedTab={setSelectedTab}
          />
        ))}
      </Flex>
      <Flex p={4}>
        {selectedTab === "Post" && (
          <TextInputs
            textInputs={textInputs}
            handleCreatePost={handleCreatePost}
            loading={loading}
            onChange={onTextChange}
          />
        )}
        {selectedTab === "Images & Video" && (
          <ImageUpload
            selectedFile={selectedFile}
            onSelectImage={onSelectImage}
            setSelectedFile={setSelectedFile}
            setSelectedTab={setSelectedTab}
          />
        )}
      </Flex>
      {error && (
        <Alert status="error">
          <AlertIcon />
          <AlertTitle>Error creating post</AlertTitle>
        </Alert>
      )}
    </Flex>
  );
};
export default NewPostForm;
