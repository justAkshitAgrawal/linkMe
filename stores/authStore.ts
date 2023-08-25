import { create } from "zustand";

type AuthStore = {
  loggedIn: boolean;
  setLoggedIn: (loggedIn: boolean) => void;
};

const useAuthStore = create<AuthStore>((set) => ({
  loggedIn: false,
  setLoggedIn: (loggedIn) => set({ loggedIn }),
}));

export default useAuthStore;
