import "../styles/globals.css";
import type { AppProps } from "next/app";
import Web3Provider from "../components/Web3Provider";
import { Provider } from "react-redux";
import { store } from "../state/store";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <Web3Provider>
        <Component {...pageProps} />
      </Web3Provider>
    </Provider>
  );
}
