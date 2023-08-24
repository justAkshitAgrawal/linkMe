import "@/styles/globals.css";
import { AnimatePresence } from "framer-motion";
import type { AppProps } from "next/app";
import { RecoilRoot } from "recoil";

import AuthManager from "@/components/AuthManager";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <RecoilRoot>
      <AnimatePresence>
        <AuthManager>
          <Component {...pageProps} />
        </AuthManager>
      </AnimatePresence>
    </RecoilRoot>
  );
}
