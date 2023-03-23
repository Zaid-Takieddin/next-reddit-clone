import { IconType } from "react-icons/lib";
import { TiHome } from "react-icons/ti";
import { atom } from "recoil";

export type DirectoryMenuItem = {
  displayText: string;
  link: string;
  icon: IconType;
  iconColor: string;
  imageURL?: string;
};

interface DirectoryMenuState {
  isOpen: boolean;
  selectedMenuItem: DirectoryMenuItem;
}

export const defalutMenuItem: DirectoryMenuItem = {
  displayText: "Home",
  link: "/",
  icon: TiHome,
  iconColor: "black",
};

export const defalutMenuState: DirectoryMenuState = {
  isOpen: false,
  selectedMenuItem: defalutMenuItem,
};

export const directoryMenuState = atom<DirectoryMenuState>({
  key: "directoryMenuState",
  default: defalutMenuState,
});
