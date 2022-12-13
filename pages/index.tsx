import { useWeb3React } from "@web3-react/core";
import Head from "next/head";
import Image from "next/image";
import { useEffect, useState } from "react";
import ConnectWallet from "../components/ConnectWallet";
import styles from "../styles/Home.module.css";

import { getAddress } from "@ethersproject/address";
import { AddressZero } from "@ethersproject/constants";
import { Contract } from "@ethersproject/contracts";
import type { JsonRpcProvider, JsonRpcSigner } from "@ethersproject/providers";
import ABI from "../abi/wavax.json";

export default function Home() {
  const { account, provider } = useWeb3React();
  const [contract, setContract] = useState();

  useEffect(() => {
    // const c = new Contract()c;
    if (provider) {
      const c = getContract(
        "0xB31f66AA3C1e785363F0875A1B74E27b85FD66c7",
        ABI,
        provider,
        account
      );
      console.log(c);
      c.decimals().then((res) => console.log(res));
      c.approve("0xC5cA2d966F46717be040B19C05B3Ba99cC25D621", 200)
        .then((res) => console.log(res))
        .catch((err) => console.log(err));
    }
  }, [account, provider]);

  return (
    <div className="text-lg underline">
      <ConnectWallet />
      Account {account}
    </div>
  );
}
// account is not optional
function getSigner(provider: JsonRpcProvider, account: string): JsonRpcSigner {
  return provider.getSigner(account).connectUnchecked();
}

// account is optional
function getProviderOrSigner(
  provider: JsonRpcProvider,
  account?: string
): JsonRpcProvider | JsonRpcSigner {
  return account ? getSigner(provider, account) : provider;
}

// account is optional
export function getContract(
  address: string,
  ABI: any,
  provider: JsonRpcProvider,
  account?: string
): Contract {
  if (!isAddress(address) || address === AddressZero) {
    throw Error(`Invalid 'address' parameter '${address}'.`);
  }

  return new Contract(
    address,
    ABI,
    getProviderOrSigner(provider, account) as any
  );
}

// returns the checksummed address if the address is valid, otherwise returns false
export function isAddress(value: any): string | false {
  try {
    // Alphabetical letters must be made lowercase for getAddress to work.
    // See documentation here: https://docs.ethers.io/v5/api/utils/address/
    return getAddress(value.toLowerCase());
  } catch {
    return false;
  }
}
