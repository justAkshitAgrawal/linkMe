import React, { useEffect } from "react";
import { useRecoilState } from "recoil";
import { userAtom } from "@/atoms/user";
import { authState } from "@/atoms/authState";
interface Props {
  children: React.ReactNode;
}

const AuthManager = (props: Props) => {
  const [user, setUser] = useRecoilState<any>(userAtom);
  const [authUser, setAuthUser] = useRecoilState<any>(authState);

  useEffect(() => {
    const userLocal = localStorage.getItem("user");
    const authUserLocal = localStorage.getItem("authUser");

    if (userLocal) {
      setUser(JSON.parse(userLocal));
    }

    if (authUserLocal) {
      setAuthUser(JSON.parse(authUserLocal));
    }
  }, []);
  return <div>{props.children}</div>;
};

export default AuthManager;
