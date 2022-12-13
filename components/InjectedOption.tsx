import { Connector } from "@web3-react/types";
import { injectedConnection, ConnectionType } from "../connection";
import { getConnectionName } from "../connection/utils";
import Option from "./Option";

export function InstallMetaMaskOption() {
  return (
    <Option
      id="install-metamask"
      header={<div>Install MetaMask</div>}
      link="https://metamask.io/"
    />
  );
}

export function MetaMaskOption({
  tryActivation,
}: {
  tryActivation: (connector: Connector) => void;
}) {
  const isActive = injectedConnection.hooks.useIsActive();
  return (
    <Option
      id="metamask"
      isActive={isActive}
      header={getConnectionName(ConnectionType.INJECTED, true)}
      onClick={() => tryActivation(injectedConnection.connector)}
    />
  );
}

export function InjectedOption({
  tryActivation,
}: {
  tryActivation: (connector: Connector) => void;
}) {
  const isActive = injectedConnection.hooks.useIsActive();
  return (
    <Option
      id="injected"
      isActive={isActive}
      header={getConnectionName(ConnectionType.INJECTED, false)}
      onClick={() => tryActivation(injectedConnection.connector)}
    />
  );
}
