import React, { use, useEffect } from "react";
import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
} from "firebase/firestore"; // Import Firestore modules
import { auth, firestore } from "@/firebase";
import { onAuthStateChanged } from "firebase/auth"; // Import onAuthStateChanged
import useAuthStore from "@/stores/authStore";
import useUserStore from "@/stores/user";
import { useRouter } from "next/router";

import useProfileInfo from "@/stores/ProfileInfo";

interface Props {
  children: React.ReactNode;
}

const AuthManager = (props: Props) => {
  const { setLoggedIn, loggedIn } = useAuthStore();
  const { setUid, setName, setPhotoURL, setEmail, uid, username, setUsername } =
    useUserStore();
  const { setBio, setLinks } = useProfileInfo();
  const router = useRouter();
  const pathname = router.pathname;

  const setUserData = (user: any) => {
    setUid(user.uid);
    setName(user.displayName);
    setPhotoURL(user.photoURL);
    setEmail(user.email);
  };

  const fetchLinks = async (docRef: any) => {
    const linksCollectionRef = collection(docRef, "links");
    const querySnapshot = await getDocs(linksCollectionRef);
    const links: any = [];
    querySnapshot.forEach((doc) => {
      links.push({
        id: doc.id,
        ...doc.data(),
      });
    });
    return links;
  };

  const handleAuthenticatedUser = async (user: any) => {
    if (user && uid.length === 0) {
      const docRef = doc(firestore, "users", user.uid);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setUserData(user);
        setBio(docSnap.data()?.bio);
        setUsername(docSnap.data()?.username);
        const links = await fetchLinks(docRef);
        setLinks(links);
        if (docSnap.data()?.username) {
          if (pathname === "/onboarding") {
            router.push("/dashboard");
          }
        }
      } else {
        await setDoc(doc(firestore, "users", user.uid), {
          uid: user.uid,
          name: user.displayName,
          email: user.email,
          photoURL: user.photoURL,
        });
        setUserData(user);
      }
    } else {
    }
  };

  useEffect(() => {
    if (localStorage.getItem("authUser")) {
      setLoggedIn(true);
    }

    if (loggedIn !== true) {
      if (pathname === "/onboarding") {
        router.push("/");
      }
    }

    if (router.pathname === "/dashboard") {
      if (!localStorage.getItem("authUser")) {
        router.push("/");
      }
    }

    // onboarding route guard

    onAuthStateChanged(auth, handleAuthenticatedUser);
  }, []);

  return <div>{props.children}</div>;
};

export default AuthManager;
