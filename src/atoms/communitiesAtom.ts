import { Timestamp } from "firebase/firestore";
import { atom } from "recoil";

export interface Community {
  id: string;
  creatorId: string;
  numberOfMembers: number;
  privacyType: "public" | "restricted" | "private";
  createdAt?: Timestamp;
  imageURL?: string;
}

export interface CommunitySnippet {
  communityId: string;
  isModerator?: boolean;
  imageURL?: string;
}

interface CommmunityState {
  mySnippets: CommunitySnippet[];
  currentCommunity?: Community;
  snippetsFetched: boolean;
}

const defaultCommunityState: CommmunityState = {
  mySnippets: [],
  snippetsFetched: false,
};

export const communityState = atom<CommmunityState>({
  key: "communitiesState",
  default: defaultCommunityState,
});
