import type { AppProps } from "next/app";
import "../styles/globals.css";
import { SessionProvider } from "next-auth/react";
import { useSession, signIn, signOut } from "next-auth/react";
import NavBar from "src/components/NavBar";
import { useEffect, useState } from "react";
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
  const [verified, setVerified] = useState(false);
  const [exists, setExists] = useState(false);

  useEffect(() => {
    if (session.status === "authenticated") {
      fetch("/api/user")
        .then((response) => response.json())
        .then((data) => {
          const { exists, verified } = data;
          setExists(exists);
          setVerified(verified);

          if (exists && verified) {
            // do nothing
            alert("user is verified");
          } else if (exists && !verified) {
            router.push("http://localhost:3000/user/verify");
          } else if (!exists && !verified) {
            console.log(exists, verified);
            router.push("http://localhost:3000/user/register");
          }
        });
    }
  }, [session, exists, verified]);

  return <div></div>;
}
