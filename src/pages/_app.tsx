import type { AppProps } from "next/app";
import "../styles/globals.css";
import { SessionProvider } from "next-auth/react";
import NavBar from "src/components/NavBar";
import { useState } from "react";

export type Coordinate = {
  latitude: number;
  longitude: number;
};

export const defaultCoordindates = {
  latitude: -71.088257,
  longitude: 42.340075,
};

export default function App({ Component, pageProps }: AppProps) {
  return (
    <SessionProvider session={pageProps.session}>
      <NavBar />
      <Component {...pageProps} />
    </SessionProvider>
  );
}
