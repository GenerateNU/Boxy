import type { AppProps } from "next/app";
import "../styles/globals.css";
import { SessionProvider } from "next-auth/react";
import { useSession, signIn, signOut } from "next-auth/react";
import { store } from '../../app/store'
import { Provider } from 'react-redux'
import NavBar from "src/components/NavBar";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <SessionProvider session={pageProps.session}>
        <NavBar />
        <Component {...pageProps} />
      </SessionProvider>
    </Provider>
  );
}
