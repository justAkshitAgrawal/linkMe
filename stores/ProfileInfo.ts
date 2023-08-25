import { create } from "zustand";

type ProfileInfo = {
  name: string;
  bio: string;
  setName: (name: string) => void;
  setBio: (bio: string) => void;
};

const useProfileInfo = create<ProfileInfo>((set) => ({
  name: "",
  bio: "",
  setName: (name) => set({ name }),
  setBio: (bio) => set({ bio }),
  clearBio: () => set({ bio: "" }),
}));

export default useProfileInfo;
