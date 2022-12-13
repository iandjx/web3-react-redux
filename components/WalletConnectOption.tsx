import { Connector } from "@web3-react/types";
import { walletConnectConnection, ConnectionType } from "../connection";
import { getConnectionName } from "../connection/utils";

import Option from "./Option";

export function WalletConnectOption({
  tryActivation,
}: {
  tryActivation: (connector: Connector) => void;
}) {
  const isActive = walletConnectConnection.hooks.useIsActive();
  return (
    <Option
      id="wallet-connect"
      isActive={isActive}
      onClick={() => tryActivation(walletConnectConnection.connector)}
      header={getConnectionName(ConnectionType.WALLET_CONNECT)}
    />
  );
}
