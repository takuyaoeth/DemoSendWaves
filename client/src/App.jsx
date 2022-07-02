import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
import abi from "./utils/NewWavePortal.json";
import "./App.css";

const App = () => {
  const [currentAccount, setCurrentAccount] = useState("");
  const [amountCount, setAmountCount] = useState(0);
  const [waveMessage, setWaveMessage] = useState("");  
  const [waveInformation, setWaveInformation] = useState("");
  const contractAddress = "0xB750157c9C353fFD98bd947F1F1438bf5204A95E";
  const contractABI = abi.abi;

  const changeMessage = async (e) => {
    setWaveMessage(() => e.target.value);
  } 
  
  const checkIfWalletIsConnected = async () => {
    try {
      const { ethereum } = window;

      if (!ethereum) {
        console.log("Make sure you have metamask!");
        return;
      } else {
        console.log("We have the ethereum object", ethereum);
      }

      const accounts = await ethereum.request({ method: "eth_accounts" });

      if (accounts.length !== 0) {
        const account = accounts[0];
        console.log("Found an authorized account:", account);
        setCurrentAccount(account);
      } else {
        console.log("No authorized account found")
      }
    } catch (error) {
      console.log(error);
    }
  }

  const waveCount = async () => {
    try {
      const { ethereum } = window;
      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const wavePortalContract = new ethers.Contract(contractAddress, contractABI, signer);

        let count = await wavePortalContract.getTotalWaves();
        console.log("【Retrieved total wave count...】", count.toNumber());
        setAmountCount(count.toNumber());

        let allWaves = await wavePortalContract.getAllWaves();
        console.log(allWaves);

      } else {
        console.log("Ethereum object doesn't exist!");
      }
      
    } catch (error) {
      console.log(error);
    }
  }
  
  /**
  * Implement your connectWallet method here
  */
  const connectWallet = async () => {
    try {
      const { ethereum } = window;

      if (!ethereum) {
        alert("Get MetaMask!");
        return;
      }

      const accounts = await ethereum.request({ method: "eth_requestAccounts" });

      console.log("Connected", accounts[0]);
      setCurrentAccount(accounts[0]);
    } catch (error) {
      console.log(error)
    }
  }

  const wave = async () => {
    try {
      const { ethereum } = window;

      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const wavePortalContract = new ethers.Contract(contractAddress, contractABI, signer);
        console.log("siner is %o", await signer.getAddress());
        let sender = await signer.getAddress();

        let count = await wavePortalContract.getTotalWaves();
        console.log("Retrieved total wave count...", count.toNumber());
        // setAmountCount(count.toNumber());

        /*
        * Execute the actual wave from your smart contract
        */
        const waveTxn = await wavePortalContract.wave(waveMessage);
        console.log("Mining...", waveTxn.hash);

        await waveTxn.wait();
        console.log("Mined -- ", waveTxn.hash);

        count = await wavePortalContract.getTotalWaves();
        console.log("Retrieved total wave count...", count.toNumber());
      } else {
        console.log("Ethereum object doesn't exist!");
      }
    } catch (error) {
      console.log(error);
    }
  }
  
  useEffect(() => {
    checkIfWalletIsConnected();
  }, [])

  useEffect(() => {
    waveCount();
  }, [amountCount])
  
  return (
    <div className="mainContainer">
      <div className="dataContainer">
        <div className="header">
        👋 Hey there!
        </div>

        <div className="bio">
          I am farza and I worked on self-driving cars so that's pretty cool right? Connect your Ethereum wallet and wave at me!
        </div>

<input type="text" name="message" onChange={changeMessage} value={waveMessage} />
        
        <button className="waveButton" onClick={wave}>
          Wave at Me
        </button>

        {amountCount > 0 && (
        <div className="amount">Retrieved total wave count: <strong>{amountCount}</strong></div>
        )}

        

        {/*
        * If there is no currentAccount render this button
        */}
        {!currentAccount && (
          <button className="waveButton" onClick={connectWallet}>
            Connect Wallet
          </button>
        )}
      </div>
    </div>
  );
}

export default App