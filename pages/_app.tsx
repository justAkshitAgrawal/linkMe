import "@/styles/globals.css";
import { AnimatePresence } from "framer-motion";
import type { AppProps } from "next/app";
// Combine your reducers here

import AuthManager from "@/components/AuthManager";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AnimatePresence>
      <AuthManager>
        <Component {...pageProps} />
      </AuthManager>
    </AnimatePresence>
  );
}
