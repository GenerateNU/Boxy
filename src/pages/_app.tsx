import type { AppProps } from "next/app";
import "../styles/globals.css";
import { SessionProvider } from "next-auth/react";
import { useSession, signIn, signOut } from "next-auth/react";
import NavBar from "src/components/NavBar";
import { useEffect } from "react";
import Utils from "@/utils";
import { useRouter } from "next/router";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <SessionProvider session={pageProps.session}>
      <NavBar />
      <UserRedirectWrapper></UserRedirectWrapper>
      <Component {...pageProps} />
    </SessionProvider>
  );
}

function UserRedirectWrapper() {
  const session = useSession();
  const router = useRouter();

  useEffect(() => {
    if (session.status === "authenticated") {
      fetch("/api/user")
        .then((response) => response.json())
        .then((data) => {
          const { exists, verified } = data;

          if (exists && verified) {
            // do nothing
          } else if (exists && !verified) {
            router.push("http://localhost:3000/user/verify");
          } else if (!exists && !verified) {
            console.log(exists, verified);
            router.push("http://localhost:3000/user/register");
          }
        });
    }
  }, [session]);

  return <div></div>;
}
