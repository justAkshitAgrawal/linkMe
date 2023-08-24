import Navbar from "@/components/Navbar";
import { signInWithPopup } from "firebase/auth";
import { provider, auth } from "../../firebase";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { FcGoogle } from "react-icons/fc";
import { useRecoilState } from "recoil";

import { userAtom } from "@/atoms/user";
import { authState } from "@/atoms/authState";
import { useRouter } from "next/router";

const Index = () => {
  const [user, setUser] = useRecoilState<any>(userAtom);
  const [authUser, setAuthUser] = useRecoilState<any>(authState);

  const router = useRouter();

  const handleLogin = () => {
    signInWithPopup(auth, provider)
      .then((data) => {
        setUser(data.user);
        setAuthUser(true);
        localStorage.setItem("user", JSON.stringify(data.user));
        localStorage.setItem("authUser", JSON.stringify(true));
        router.push("/dashboard");
      })
      .catch((error) => {});
  };

  return (
    <div className="h-screen bg-primary relative">
      <div className="px-20 py-14">
        <div>
          <Navbar />
        </div>
      </div>

      <div className="flex justify-center mt-20">
        <div>
          <Card className="w-[450px] ring">
            <CardHeader>
              <CardTitle className="text-3xl">Get Started</CardTitle>
              <CardDescription className="text-lg">
                Login to an existing account, or create a new one!
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div
                onClick={handleLogin}
                className="flex items-center space-x-2 border w-fit px-4 py-2 rounded-md bg-foreground text-white cursor-pointer"
              >
                <FcGoogle className="h-6 w-6" />
                <button className="">Continue With Google</button>
              </div>
            </CardContent>
            <CardFooter>
              <h1 className="text-sm">
                Currently, we only offer account creation and login using
                Google.
              </h1>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Index;
