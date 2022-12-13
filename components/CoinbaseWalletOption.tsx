import { Connector } from "@web3-react/types";
import { coinbaseWalletConnection, ConnectionType } from "../connection";
import { getConnectionName } from "../connection/utils";
import Option from "./Option";

const BASE_PROPS = {
  color: "#315CF5",
  icon: <div />,
  id: "coinbase-wallet",
};

export function OpenCoinbaseWalletOption() {
  const isActive = coinbaseWalletConnection.hooks.useIsActive();
  return (
    <Option
      id="coinbase"
      isActive={isActive}
      link="https://go.cb-w.com/mtUDhEZPy1"
      header="Open in Coinbase Wallet"
    />
  );
}

export function CoinbaseWalletOption({
  tryActivation,
}: {
  tryActivation: (connector: Connector) => void;
}) {
  const isActive = coinbaseWalletConnection.hooks.useIsActive();
  return (
    <Option
      id="coinbase"
      isActive={isActive}
      onClick={() => tryActivation(coinbaseWalletConnection.connector)}
      header={getConnectionName(ConnectionType.COINBASE_WALLET)}
    />
  );
}
