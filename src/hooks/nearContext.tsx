import React, {
  useState,
  ReactElement,
  useContext,
  useEffect,
  useMemo,
  useCallback,
} from "react";
import { keyStores, WalletConnection, connect } from "near-api-js";
import { setNearConnection } from "@near-eth/client";
import config from "nearConfig";
import { default_network } from "../constants";

export interface INearConfig {
  networkId: string;
  keyStore: any;
  nodeUrl: string;
  walletUrl: string;
  helperUrl: string;
  explorerUrl: string;
}

type onChainProvider = {
  walletAccountId: string | null;
  signInNear: () => void;
  signOutNear: () => void;
  nearConnection: any;
};

export const nearConfig = {
  networkId: config[default_network].nearNetworkId,
  keyStore: new keyStores.BrowserLocalStorageKeyStore(),
  nodeUrl: config[default_network].nearNodeUrl,
  helperUrl: config[default_network].nearHelperUrl,
  walletUrl: config[default_network].nearWalletUrl,
  explorerUrl: config[default_network].nearExplorerUrl,
};

export type NearContextData = {
  onChainProvider: onChainProvider;
} | null;

const NearContext = React.createContext<NearContextData>(null);

export const useNearContext = () => {
  const nearContext = useContext(NearContext);
  if (!nearContext) {
    throw new Error(
      "useNearContext() can only be used inside of <NearContextProvider />, " +
        "please declare it at a higher level."
    );
  }
  const { onChainProvider } = nearContext;
  return useMemo(() => {
    return { ...onChainProvider };
  }, [onChainProvider]);
};

export const NearContextProvider: React.FC<{ children: ReactElement }> = ({
  children,
}) => {
  const [walletAccountId, setWalletAccountId] = useState<boolean>(false);
  const [nearConnection, setNearConnectionData] = useState<any>(null);

  const connectNear = async (): Promise<any> => {
    const keyStore = new keyStores.BrowserLocalStorageKeyStore();
    const near = await connect(
      //@ts-ignore
      Object.assign({ deps: { keyStore } }, nearConfig)
    );
    const nearConnection: any = new WalletConnection(near, null);
    const walletAccountId = nearConnection.getAccountId();
    setWalletAccountId(walletAccountId);
    setNearConnection(nearConnection);
    setNearConnectionData(nearConnection);
  };

  const signInNear = useCallback(async () => {
    nearConnection.requestSignIn();
  }, [nearConnection]);

  const signOutNear = useCallback(async () => {
    nearConnection.signOut();
    setTimeout(() => {
      window.location.reload()
    })
  }, [nearConnection]);

  useEffect(() => {
    connectNear();
  }, []);

  const onChainProvider = useMemo(
    () => ({
      walletAccountId,
      nearConnection,
      signInNear,
      signOutNear,
    }),
    [walletAccountId, signInNear, signOutNear, nearConnection]
  );
  return (
    //@ts-ignore
    <NearContext.Provider value={{ onChainProvider }}>
      {children}
    </NearContext.Provider>
  );
};
