import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { firestore } from "@/firebase";
import useUserStore from "@/stores/user";
import React, { useState } from "react";
import { collection, query, where, getDocs } from "firebase/firestore";
import { ImSpinner8 } from "react-icons/im";
import { AiFillCheckCircle, AiOutlineStop } from "react-icons/ai";
import { Button } from "@/components/ui/button";
import { doc, updateDoc } from "firebase/firestore";
import { useRouter } from "next/router";
import Head from "next/head";

const Index = () => {
  const { name, setName, username, setUsername, uid } = useUserStore();
  const [usernameExists, setUsernameExists] = useState(true);
  const [loading, setLoading] = useState(false);
  const [available, setAvailable] = useState(false);
  const [usernameError, setUsernameError] = useState(false);
  const router = useRouter();

  const isUsernameValid = (username: string) => {
    const regex = /^(?=[a-zA-Z])(?!^\d)(?!.*-$)[a-zA-Z0-9_-]{1,15}(?<![0-9])$/;
    if (regex.test(username)) {
      setUsernameError(false);
      return true;
    } else {
      setUsernameError(true);
      return false;
    }
  };

  const handleUsernameCheck = async () => {
    setUsernameExists(true);
    if (username?.trim() !== "") {
      setLoading(true);
      try {
        const q = query(
          collection(firestore, "users"),
          where("username", "==", username)
        );
        const querySnapshot = await getDocs(q);
        if (querySnapshot.size > 0) {
          setUsernameExists(true);
          setLoading(false);
          setAvailable(false);
        } else {
          setUsernameExists(false);
          setLoading(false);
          setAvailable(true);
        }
      } catch (error) {}
    }
  };

  const handleOnbaording = async () => {
    if (name?.trim() !== "" && username?.trim() !== "") {
      try {
        const docRef = doc(firestore, "users", uid);
        await updateDoc(docRef, {
          name: name,
          username: username,
        });
        router.push("/dashboard");
      } catch (error) {}
    }
  };

  return (
    <div className="h-screen bg-primary relative flex pt-28  justify-center">
      <Head>
        <title>Onboarding | Link.Me</title>
      </Head>
      <Card className="h-fit ring max-sm:w-[85vw]">
        <CardHeader>
          <CardTitle className=" text-3xl">Onboarding</CardTitle>
          <CardDescription>
            This is a one time process. Please enter your details carefully!
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Label>Name:</Label>
          <Input
            type="text"
            placeholder="Your Name"
            value={name || ""}
            onChange={(e) => setName(e.target.value)}
            max={30}
          />

          <div className="p-3"></div>

          <Label>Username:</Label>
          <div className="relative">
            <Input
              type="text"
              maxLength={15}
              placeholder="Enter a preferred username..."
              onBlur={handleUsernameCheck}
              disabled={loading}
              value={username || ""}
              onChange={(e) => {
                setAvailable(false);
                const inputValue = e.target.value;
                isUsernameValid(inputValue);
                setUsername(inputValue);
              }}
            />

            {!loading && (
              <div className="right-2 top-[50%] -translate-y-[50%] absolute">
                {usernameExists && <AiOutlineStop className="text-red-500" />}
                {!usernameExists && usernameError && (
                  <p className="text-red-500 text-xs mt-1">Invalid username</p>
                )}
                {!usernameError && available && (
                  <AiFillCheckCircle className="text-green-500" />
                )}
              </div>
            )}
          </div>
          {/* {usernameError && (
            <p className="text-red-500 text-xs ml-2 mt-1">Invalid username</p>
          )} */}
        </CardContent>
        <CardFooter className="">
          <div className="flex flex-col">
            <p className="text-xs">{`Your username is unique and can't be changed afterwards.`}</p>
            <p className="text-xs">{`Your username can contain -, _, 0 - 9. It can only end with an alphabet`}</p>

            <Button
              className="w-fit mt-5"
              disabled={
                loading ||
                usernameExists ||
                usernameError ||
                available === false ||
                username === "" ||
                name === ""
              }
              onClick={handleOnbaording}
            >
              Continue
            </Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Index;
