import { useWeb3React } from "@web3-react/core";
import { Connector } from "@web3-react/types";
import React, { useCallback, useEffect, useState } from "react";
import { getConnection, getConnectionName } from "../connection/utils";
import useIsMobile from "../hooks/useIsMobile";
import usePrevious from "../hooks/usePrevious";
import { updateConnectionError } from "../state/connection/reducer";
import { useAppDispatch, useAppSelector } from "../state/store";
import { updateSelectedWallet } from "../state/user/reducer";
import { useConnectedWallets } from "../state/wallets/hooks";
import {
  CoinbaseWalletOption,
  OpenCoinbaseWalletOption,
} from "./CoinbaseWalletOption";
import {
  InjectedOption,
  InstallMetaMaskOption,
  MetaMaskOption,
} from "./InjectedOption";
import { WalletConnectOption } from "./WalletConnectOption";

const WALLET_VIEWS = {
  OPTIONS: "options",
  ACCOUNT: "account",
  PENDING: "pending",
};

const ConnectWallet = () => {
  const dispatch = useAppDispatch();
  const [isMetaMask, setIsMetaMask] = useState(false);
  const [isInjected, setIsInjected] = useState(false);
  const [isCoinbaseWallet, setIsCoinbaseWallet] = useState(false);
  const isMobile = useIsMobile();

  const isCoinbaseWalletBrowser = isMobile && isCoinbaseWallet;
  const isMetamaskBrowser = isMobile && isMetaMask;
  const isInjectedMobileBrowser = isCoinbaseWalletBrowser || isMetamaskBrowser;

  const { connector, account, chainId } = useWeb3React();
  const [walletSelect, setWalletSelect] = useState(false);

  const [walletView, setWalletView] = useState(WALLET_VIEWS.ACCOUNT);

  //closes wallet selection when a new wallet is connected
  const previousAccount = usePrevious(account);

  //keep track of all connected wallets
  // const [connectedWallets, addWalletToConnectedWallets] = useConnectedWallets();

  const [pendingConnector, setPendingConnector] = useState<
    Connector | undefined
  >();

  // get error for pending connector if exists
  const pendingError = useAppSelector((state) =>
    pendingConnector
      ? state.connection.errorByConnectionType[
          getConnection(pendingConnector).type
        ]
      : undefined
  );

  const tryActivation = useCallback(
    async (connector: Connector) => {
      const connectionType = getConnection(connector).type;

      try {
        setPendingConnector(connector);
        setWalletView(WALLET_VIEWS.PENDING);
        dispatch(updateConnectionError({ connectionType, error: undefined }));

        await connector.activate();

        dispatch(updateSelectedWallet({ wallet: connectionType }));
      } catch (error: any) {
        console.debug(`web3-react connection error: ${error}`);
        dispatch(
          updateConnectionError({ connectionType, error: error.message })
        );
      }
    },
    [dispatch]
  );

  useEffect(() => {
    if (account) {
      setWalletView(WALLET_VIEWS.ACCOUNT);
      setWalletSelect(false);
    }
  }, [account]);

  useEffect(() => {
    setIsInjected(Boolean(window.ethereum));
    //@ts-ignore
    setIsMetaMask(Boolean(window.ethereum?.isMetaMask ?? false));
    //@ts-ignore
    setIsCoinbaseWallet(window.ethereum?.isCoinbaseWallet ?? false);
  }, []);

  useEffect(() => {
    if (walletSelect) {
      setWalletView(account ? WALLET_VIEWS.ACCOUNT : WALLET_VIEWS.OPTIONS);
    }
  }, [account, walletSelect]);

  // clear pending connector eror and set pending connector to undefined
  // this assumes that a wallet has been sucessfully connected
  useEffect(() => {
    if (pendingConnector && walletView !== WALLET_VIEWS.PENDING) {
      updateConnectionError({
        connectionType: getConnection(pendingConnector).type,
        error: undefined,
      });
      setPendingConnector(undefined);
    }
  }, [pendingConnector, walletView]);

  let injectedOption;
  if (!isInjected) {
    if (!isMobile) {
      injectedOption = <InstallMetaMaskOption />;
    }
  } else if (!isCoinbaseWallet) {
    if (isMetaMask) {
      injectedOption = <MetaMaskOption tryActivation={tryActivation} />;
    } else {
      injectedOption = <InjectedOption tryActivation={tryActivation} />;
    }
  }

  let coinbaseWalletOption;
  if (isMobile && !isInjectedMobileBrowser) {
    coinbaseWalletOption = <OpenCoinbaseWalletOption />;
  } else if (!isMobile || isCoinbaseWalletBrowser) {
    coinbaseWalletOption = (
      <CoinbaseWalletOption tryActivation={tryActivation} />
    );
  }

  const walletConnectionOption =
    (!isInjectedMobileBrowser && (
      <WalletConnectOption tryActivation={tryActivation} />
    )) ??
    null;

  if (account && !walletSelect) {
    return <div>new wallet connected</div>;
  }

  if (walletView === WALLET_VIEWS.PENDING) {
    return (
      <div>
        <div>Connecting</div>
        {!!pendingError && pendingConnector && (
          <div>
            <div>unable to connect</div>
            <button onClick={() => tryActivation(pendingConnector)}>
              try again
            </button>
          </div>
        )}
      </div>
    );
  }

  return (
    <div>
      {injectedOption}
      {coinbaseWalletOption}
      {walletConnectionOption}
    </div>
  );
};

export default ConnectWallet;
