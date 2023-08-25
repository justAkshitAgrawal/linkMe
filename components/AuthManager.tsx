import React, { useEffect } from "react";
import { doc, getDoc, setDoc } from "firebase/firestore"; // Import Firestore modules
import { auth, firestore } from "@/firebase";
import { onAuthStateChanged } from "firebase/auth"; // Import onAuthStateChanged

interface Props {
  children: React.ReactNode;
}

const AuthManager = (props: Props) => {
  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        const docRef = doc(firestore, "users", user.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          console.log("Document data:", docSnap.data());
        } else {
          console.log("No such document!");
          await setDoc(doc(firestore, "users", user.uid), {
            uid: user.uid,
            name: user.displayName,
            email: user.email,
            photoURL: user.photoURL,
          });
        }
      } else {
        console.log("No user is signed in.");
      }
    });
  }, []);

  return <div>{props.children}</div>;
};

export default AuthManager;
