import { create } from "zustand";

type UserStore = {
  uid: string;
  name: string;
  photoURL: string;
  email: string;
  setUid: (uid: string) => void;
  setName: (name: string) => void;
  setPhotoURL: (photoURL: string) => void;
  setEmail: (email: string) => void;
};

const useUserStore = create<UserStore>((set) => ({
  uid: "",
  name: "",
  photoURL: "",
  email: "",
  setUid: (uid: string) => set({ uid }),
  setName: (name: string) => set({ name }),
  setPhotoURL: (photoURL: string) => set({ photoURL }),
  setEmail: (email: string) => set({ email }),
}));

export default useUserStore;
