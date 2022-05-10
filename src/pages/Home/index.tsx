import useMetaMask from "hooks/useMetamask";
import { useNearContext } from "hooks/nearContext";
import "./home.scss";

const Home = () => {
  const { account, activateBrowserWallet, deactivate } = useMetaMask();
  const { walletAccountId, signInNear, signOutNear } = useNearContext();

  return (
    <div>
      <div className="wallet-connection">
        {account ? (
          <>
            <div className="wallet-address">{account}</div>
            <button className="connect-button" onClick={deactivate}>
              Metamask Disconnect
            </button>
          </>
        ) : (
          <button className="connect-button" onClick={activateBrowserWallet}>
            Metamask Connect
          </button>
        )}
      </div>
      <div className="wallet-connection">
        {walletAccountId ? (
          <>
            <div className="wallet-address">{walletAccountId}</div>
            <button className="connect-button" onClick={signOutNear}>
              NearWallet Disconnect
            </button>
          </>
        ) : (
          <button className="connect-button" onClick={signInNear}>
            NearWallet Connect
          </button>
        )}
      </div>
    </div>
  );
};

export default Home;
