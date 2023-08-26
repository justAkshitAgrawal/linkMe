import { create } from "zustand";

type UserStore = {
  uid: string;
  name: string | null;
  photoURL: string | null;
  email?: string | null;
  username?: string | null;
  setUid: (uid: string) => void;
  setName: (name: string | null) => void;
  setPhotoURL: (photoURL: string | null) => void;
  setEmail: (email: string | null) => void;
  setUsername: (username: string | null) => void;
};

const useUserStore = create<UserStore>((set) => ({
  uid: "",
  name: "",
  photoURL: "",
  email: "",
  username: "",
  setUid: (uid: string) => set({ uid }),
  setName: (name: string | null) => set({ name }),
  setPhotoURL: (photoURL: string | null) => set({ photoURL }),
  setEmail: (email: string | null) => set({ email }),
  setUsername: (username: string | null) => set({ username }),
}));

export default useUserStore;
