import Navbar from "@/components/Navbar";
import { signInWithPopup } from "firebase/auth";
import { provider, auth, firestore } from "../../firebase";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { FcGoogle } from "react-icons/fc";
import { collection, getDocs, getDoc, doc } from "firebase/firestore";
import { useRouter } from "next/router";
import useUserStore from "@/stores/user";
import useAuthStore from "@/stores/authStore";

const Index = () => {
  const router = useRouter();
  const { uid, setUid } = useUserStore();
  const { setLoggedIn } = useAuthStore();

  const handleLogin = async () => {
    await signInWithPopup(auth, provider)
      .then((data) => {
        localStorage.setItem("user", JSON.stringify(data.user));
        localStorage.setItem("authUser", JSON.stringify(true));
        setUid(data.user.uid);
        console.log(data.user.uid);
        setLoggedIn(true);
      })
      .catch((error) => {
        console.log(error);
      });
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
