import { Connector } from "@web3-react/types";
import { useEffect, useState } from "react";
import {
  gnosisSafeConnection,
  injectedConnection,
  coinbaseWalletConnection,
  walletConnectConnection,
  networkConnection,
  ConnectionType,
} from ".";

export function useGetIsInjected(): boolean {
  const [injected, setisInjected] = useState(false);
  useEffect(() => {
    setisInjected(Boolean(window.ethereum));
  }, []);

  return injected;
}

export function useGetIsMetaMask(): boolean {
  const [isMetaMask, setIsMetaMask] = useState(false);

  useEffect(() => {
    //@ts-ignore
    setIsMetaMask(window.ethereum?.isMetaMask ?? false);
  }, []);

  return isMetaMask;
}

export function useGetIsCoinbaseWallet(): boolean {
  const [isCoinbaseWallet, setIsCoinbaseWallet] = useState(false);
  useEffect(() => {
    //@ts-ignore
    setIsCoinbaseWallet(window.ethereum?.isCoinbaseWallet ?? false);
  }, []);

  return isCoinbaseWallet;
}

const CONNECTIONS = [
  gnosisSafeConnection,
  injectedConnection,
  coinbaseWalletConnection,
  walletConnectConnection,
  networkConnection,
];
export function getConnection(c: Connector | ConnectionType) {
  if (c instanceof Connector) {
    const connection = CONNECTIONS.find(
      (connection) => connection.connector === c
    );
    if (!connection) {
      throw Error("unsupported connector");
    }
    return connection;
  } else {
    switch (c) {
      case ConnectionType.INJECTED:
        return injectedConnection;
      case ConnectionType.COINBASE_WALLET:
        return coinbaseWalletConnection;
      case ConnectionType.WALLET_CONNECT:
        return walletConnectConnection;
      case ConnectionType.NETWORK:
        return networkConnection;
      case ConnectionType.GNOSIS_SAFE:
        return gnosisSafeConnection;
      default:
        throw Error("invalid connector");
    }
  }
}

export function getConnectionName(
  connectionType: ConnectionType,
  isMetaMask?: boolean
) {
  switch (connectionType) {
    case ConnectionType.INJECTED:
      return isMetaMask ? "MetaMask" : "Browser Wallet";
    case ConnectionType.COINBASE_WALLET:
      return "Coinbase Wallet";
    case ConnectionType.WALLET_CONNECT:
      return "WalletConnect";
    case ConnectionType.NETWORK:
      return "Network";
    case ConnectionType.GNOSIS_SAFE:
      return "Gnosis Safe";
  }
}
