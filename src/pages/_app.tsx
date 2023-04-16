import type { AppProps } from "next/app";
import "../styles/globals.css";
import { SessionProvider } from "next-auth/react";
import NavBar from "src/components/NavBar";
import { useState } from "react";

export type Coordinate = {
  latitude: number;
  longitude: number;
};

export default function App({ Component, pageProps }: AppProps) {
  // this is our universal state for location
  const [location, setLocation] = useState<Coordinate>({
    latitude: -71.088257,
    longitude: 42.340075,
  });

  return (
    <SessionProvider session={pageProps.session}>
      <NavBar />
      <Component {...pageProps} location={location} setLocation={setLocation} />
    </SessionProvider>
  );
}
