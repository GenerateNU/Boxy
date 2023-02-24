import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";
import { useSession, signIn, signOut } from "next-auth/react"

export default function App({
  Component,
  pageProps
}: AppProps) {
  return (
    <SessionProvider session={pageProps.session}>
      <Component {...pageProps} />
      <button onClick={() => signIn()}>click here to login</button>
    </SessionProvider>
  );
}
