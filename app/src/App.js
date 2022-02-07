import React, {useEffect, useState} from 'react';
import './App.css';
import twitterLogo from './assets/twitter-logo.svg';
import baldyDefault from './assets/BaldyDefault.png';
import CandyMachine from './CandyMachine';

// Constants
const TWITTER_HANDLE = '_buildspace';
const TWITTER_LINK = `https://twitter.com/${TWITTER_HANDLE}`;

const App = () => {
  // State
  const [walletAddress, setWalletAddress] = useState(null);
  
  const checkIfWalletIsConnected = async () => {
    try
    {
      const {solana} = window;

      if(solana)
      {
        if(solana.isPhantom){
          console.log('Phantom Wallet Found!');
          
          const response = await solana.connect({ onlyIfTrusted: true });
          console.log(
            'Connected with Public Key:',
            response.publicKey.toString()
          );
          setWalletAddress(response.publicKey.toString());
        }
        else{
          console.log('Solana Supporting Wallet Found!')
        }
      }
      else{
        alert('Solana Object not found! Get a Phantom Wallet');
      }
    }
    catch(error){
      console.error(error);
    }
  };

  const connectWallet = async () => {
    const { solana } = window;
    if (solana) {
      const response = await solana.connect();
      console.log('Connected with Public Key:', response.publicKey.toString());
      setWalletAddress(response.publicKey.toString());
    }
  };

  // const renderNotConnectedContainer = () => 
  // {
  //   <button
  //     className="cta-button connect-wallet-button"
  //     onClick={connectWallet}
  //   >
  //     Connect to Wallet
  //   </button>
  // };

  useEffect(() => {
    const onLoad = async () =>
    {
      await checkIfWalletIsConnected();
    };
    window.addEventListener('load', onLoad);
    return () => window.removeEventListener('load', onLoad);
  }, []);

  return (
    <div className="App">
      <div className="container">
        <div className="header-container">
        <img alt="Baldy Default" className="baldy-pic" src={baldyDefault}/>
          <p className="header">Baldy Drop</p>
          <p className="sub-text">Mint your very own Baldy!</p>
          { !walletAddress && 
          <button
            className="cta-button connect-wallet-button"
            onClick={connectWallet}>
              Connect to Wallet
          </button> }
        </div>
        {walletAddress && <CandyMachine walletAddress={window.solana} />}
        <div className="footer-container">
          <img alt="Twitter Logo" className="twitter-logo" src={twitterLogo} />
          <a
            className="footer-text"
            href={TWITTER_LINK}
            target="_blank"
            rel="noreferrer"
          >{`built on @${TWITTER_HANDLE}`}</a>
        </div>
      </div>
    </div>
  );
};

export default App;
