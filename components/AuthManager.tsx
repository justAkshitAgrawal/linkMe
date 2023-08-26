import React, { useEffect } from "react";
import { doc, getDoc, setDoc } from "firebase/firestore"; // Import Firestore modules
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
  const { setLoggedIn } = useAuthStore();
  const { setUid, setName, setPhotoURL, setEmail, uid } = useUserStore();
  const { setBio } = useProfileInfo();
  const router = useRouter();
  const pathname = router.pathname;
  console.log(pathname);

  console.log(uid);

  useEffect(() => {
    if (localStorage.getItem("authUser")) {
      setLoggedIn(true);
    }

    // dashboard route guard
    if (router.pathname === "/dashboard") {
      if (!localStorage.getItem("authUser") || !uid) {
        router.push("/");
      }
    }

    const setUserData = (user: any) => {
      setUid(user.uid);
      setName(user.displayName);
      setPhotoURL(user.photoURL);
      setEmail(user.email);
    };

    onAuthStateChanged(auth, async (user) => {
      if (user && uid.length === 0) {
        const docRef = doc(firestore, "users", user.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setUserData(user);
          setBio(docSnap.data()?.bio);
          if (pathname !== "/") {
            router.push("/dashboard");
          }
        } else {
          console.log("No such document!");
          await setDoc(doc(firestore, "users", user.uid), {
            uid: user.uid,
            name: user.displayName,
            email: user.email,
            photoURL: user.photoURL,
          });
          setUserData(user);
          router.push("/onboarding");
        }
      } else {
        console.log("No user is signed in.");
      }
    });
  }, []);

  return <div>{props.children}</div>;
};

export default AuthManager;
