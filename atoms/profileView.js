import { atom } from "recoil";

const profileViewAtom = atom({
  key: "profileViewAtom",
  default: {
    bio: "",
    links: [],
  },
});

export { profileViewAtom };
