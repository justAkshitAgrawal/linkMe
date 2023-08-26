import { create } from "zustand";

type Link = {
  id: string;
  title: string;
  url: string;
  iconID: number;
};

type ProfileInfo = {
  name: string;
  bio: string;
  links: Object[];
  setName: (name: string) => void;
  setBio: (bio: string) => void;
  setLinks: (links: Object[]) => void;
  addLink: (link: Link) => void;
  deleteLink: (index: number) => void;
};

const useProfileInfo = create<ProfileInfo>((set) => ({
  name: "",
  bio: "",
  links: [],
  setName: (name) => set({ name }),
  setBio: (bio) => set({ bio }),
  clearBio: () => set({ bio: "" }),
  setLinks: (links) => set({ links }),
  addLink: (link) => set((state) => ({ links: [...state.links, link] })),
  // delete link by id
  deleteLink: (id) =>
    set((state) => ({
      links: state.links.filter((link: any) => link?.id !== id),
    })),
}));

export default useProfileInfo;
