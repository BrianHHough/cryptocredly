import React, { useState, useRef } from "react";
import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css';
import { useMoralis } from "react-moralis";
import CryptoCredly from "../assets/CryptoCredly-logo.png"
import ChainlinkLogo from "../assets/logo-chainlink.png"
import LogoJava from "../assets/logo-java.jpeg"
import SolidityLogo from "../assets/logo-solidity.png";
import { ethers } from "ethers";

declare let window: any;

function Home(): JSX.Element[] | any {
  const { 
    authenticate, 
    isAuthenticated, 
    user
} = useMoralis();

// Hash your credential here:
const [signatures, setSignatures] = useState<Array<string | any>>([] as string[]);
const [error, setError] = useState<string | null>(null);
const [verifySuccessMessage, setVerifySuccessMessage] = useState<string | null>(null);

const verifySig = async ({ setError, message }) => {
  try {
    console.log({ message });
    if (!window.ethereum)
      throw new Error("No crypto wallet found. Please install it.");

    await window.ethereum.send("eth_requestAccounts");
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const signature = await signer.signMessage(message);
    const address = await signer.getAddress();

    return {
      message,
      signature,
      address
    };
  } catch (err) {
    setError(err.message);
  }
};

const receiveSig = async (e) => {
  e.preventDefault();
  const data = new FormData(e.target);
  setError(e.message);
  const sig = await verifySig({
    setError,
    message: data.get("message")
  });
  if (sig) {
    setSignatures([...signatures, sig]);
    setVerifySuccessMessage("Certification Signature Confirmed!");
  } else {
    setError("Invalid Certification Signature");
  }
};

if (isAuthenticated) {
  return(
    <div >
    <Head>
      <title>CryptoCredly</title>
      <meta name="description" content="Decentralized credentialling made simple" />
      <link rel="icon" href="/favicon.ico" />
    </Head>
    {/* <button onClick={() => authenticate()}>Connect</button> */}
    <div className="App">
    <div 
    style={{
      position: "absolute",
      height: "70%",
      width: "70%",
      left: "50%",
      top: "50%",
      transform: "translate(-50%, -50%)",
      backgroundColor: "white",
      borderRadius: "40px",
      background: "rgba( 255, 255, 255, 0.25 )",
      boxShadow: "0 8px 32px 0 rgba( 160, 38, 135, 0.37 )",
      backdropFilter: "blur( 4px )",
      // webkitBackdropFilter: "blur( 4px )",
      border: "1px solid rgba( 255, 255, 255, 0.18 )"
    }}
    >
      <Image src={CryptoCredly} alt="logo" height="100px" width="100px" 
      style={{
        borderRadius: "30px",
        marginTop: "20px"
        }} />
      <h1>Welcome to CryptoCredly</h1>
      <h3>A decentralized, professional credentialling service</h3>
      <h3>Welcome {user?.get("ethAddress").substring(0,6)}</h3>
      <p>You are eligible to mint these skills:</p>
      
      <div 
        id="row 1"
        style={{display: "inline-flex"}}>
        <div 
          className="HoverGrow"
          style={{
            height: "100px", 
            width: "100px", 
            backgroundColor: "white", 
            borderRadius: "100px",
            margin: "20px",
            border: "5px solid gold",
            boxShadow: "2px 2px 8px 3px rgba(0, 0, 0, 0.2)"
          }}
          >
            <Image 
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c3/Python-logo-notext.svg/1200px-Python-logo-notext.svg.png" 
              alt="python" 
              height="30px"
              width="30px" 
              style={{
                // top: "-50%", 
                // transform: "translateY(50%)", 
                // marginBottom: "10px"
                }}
            />
            <h4 style={{top: "50%", transform: "translateY(-50%)", background: "transparent"}}>Python</h4>
        </div>
        <div 
          className="HoverGrow"
          style={{
            height: "100px", 
            width: "100px", 
            backgroundColor: "white", 
            borderRadius: "100px",
            margin: "20px",
            border: "5px solid gold",
            boxShadow: "2px 2px 8px 3px rgba(0, 0, 0, 0.2)"
          }}
          >
            <Image 
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/4c/Typescript_logo_2020.svg/1200px-Typescript_logo_2020.svg.png" 
              alt="python" 
              height="30px"
              width="30px" 
              style={{
                // top: "-50%", 
                // transform: "translateY(50%)", 
                // marginBottom: "10px"
                }}
            />
            <h4 style={{top: "50%", transform: "translateY(-50%)"}}>TypeScript</h4>
        </div>
      </div>

      <br></br>
      <form 
        onSubmit={receiveSig}
      >
      <div>
        <main>
          {/* TITLE */}
          <h1>
            Hash My Certs
          </h1>

          {/* TEXT INPUT - "MESSAGE" */}
          <div>
            <div>
              <textarea
                required
                // type="text"
                name="message"
                placeholder="Message"
              />
            </div>
          </div>
        </main>

        {/* BUTTON */}
        <footer>
          <button
            type="submit"
          >
            Verify My Certification
          </button>
          <ErrorMessage message={error} />
        </footer>

        {/* OUTPUTS */}
        {signatures.map((sig, idx) => {
          return (
            <div key={sig}>
              <div>
                <p>
                  Certification #{idx + 1}: {sig.message}
                </p>

                <p>Signer: {sig.address}</p>
                <textarea
                  readOnly
                  placeholder="Generated cryptographic hash signature"
                  value={sig.signature}
                />
                <SuccessMessage message={verifySuccessMessage} />
              </div>
            </div>
          );
        })}
      </div>
    </form>
      
      </div>
      
  </div>
  </div>
  )
}

if (!isAuthenticated) {
  return (
    <div >
      <Head>
        <title>CryptoCredly</title>
        <meta name="description" content="Decentralized credentialling made simple" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="App">
      <div 
      style={{
        position: "absolute",
        height: "70%",
        width: "70%",
        left: "50%",
        top: "50%",
        transform: "translate(-50%, -50%)",
        backgroundColor: "white",
        borderRadius: "40px",
        background: "rgba( 255, 255, 255, 0.25 )",
        boxShadow: "0 8px 32px 0 rgba( 160, 38, 135, 0.37 )",
        backdropFilter: "blur( 4px )",
        border: "1px solid rgba( 255, 255, 255, 0.18 )"
      }}
      >
        <Image src={CryptoCredly} alt="logo" height="100px" width="100px" 
        style={{
          borderRadius: "30px",
          marginTop: "20px"
          }} />
        <h1>Welcome to CryptoCredly</h1>
        <h3>A decentralized, professional credentialling service</h3>
        <button onClick={() => authenticate()}>Connect</button>
        <p>See which skills you can mint:</p>
        <div 
          id="row 1"
          style={{display: "inline-flex"}}>
          <div 
            className="HoverGrow"
            style={{
              height: "100px", 
              width: "100px", 
              backgroundColor: "white", 
              borderRadius: "100px",
              margin: "20px",
              border: "5px solid gold",
              boxShadow: "2px 2px 8px 3px rgba(0, 0, 0, 0.2)"
            }}
            >
              <Image 
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c3/Python-logo-notext.svg/1200px-Python-logo-notext.svg.png" 
                alt="python" 
                height="30px"
                width="30px" 
                style={{
                  }}
              />
              <h4 style={{top: "50%", transform: "translateY(-50%)", background: "transparent"}}>Python</h4>
          </div>

          <div 
            className="HoverGrow"
            style={{
              height: "100px", 
              width: "100px", 
              backgroundColor: "white", 
              borderRadius: "100px",
              margin: "20px",
              border: "5px solid gold",
              boxShadow: "2px 2px 8px 3px rgba(0, 0, 0, 0.2)"
            }}
            >
              <Image 
                src={SolidityLogo} 
                alt="python" 
                height="30px"
                width="30px" 
                style={{
                  }}
              />
              <h4 style={{top: "50%", transform: "translateY(-50%)"}}>Solidity</h4>
          </div>

          <div 
            className="HoverGrow"
            style={{
              height: "100px", 
              width: "100px", 
              backgroundColor: "white", 
              borderRadius: "100px",
              margin: "20px",
              border: "5px solid gold",
              boxShadow: "2px 2px 8px 3px rgba(0, 0, 0, 0.2)"
            }}
            >
              <Image 
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/4c/Typescript_logo_2020.svg/1200px-Typescript_logo_2020.svg.png" 
                alt="python" 
                height="30px"
                width="30px" 
                style={{
                  }}
              />
              <h4 style={{top: "50%", transform: "translateY(-50%)"}}>TypeScript</h4>
          </div>
        </div>

        <br></br>

        <div 
          id="row 2"
          style={{display: "inline-flex"}}>
          <div 
            className="HoverGrow"
            style={{
              height: "100px", 
              width: "100px", 
              backgroundColor: "white", 
              borderRadius: "100px",
              margin: "20px",
              border: "5px solid gold",
              boxShadow: "2px 2px 8px 3px rgba(0, 0, 0, 0.2)"
            }}
            >
              <Image 
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a3/.NET_Logo.svg/2048px-.NET_Logo.svg.png" 
                alt="python" 
                height="30px"
                width="30px" 
                style={{
                  }}
              />
              <h4 style={{top: "50%", transform: "translateY(-50%)"}}>.NET</h4>
          </div>

          <div 
            className="HoverGrow"
            style={{
              height: "100px", 
              width: "100px", 
              backgroundColor: "white", 
              borderRadius: "100px",
              margin: "20px",
              border: "5px solid gold",
              boxShadow: "2px 2px 8px 3px rgba(0, 0, 0, 0.2)"
            }}
            >
              <Image 
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/18/ISO_C%2B%2B_Logo.svg/1200px-ISO_C%2B%2B_Logo.svg.png" 
                alt="c++" 
                height="30px"
                width="30px" 
                style={{
                  // top: "-50%", 
                  // transform: "translateY(50%)", 
                  // marginBottom: "10px"
                  }}
              />
              <h4 style={{top: "50%", transform: "translateY(-50%)"}}>C++</h4>
          </div>

          <div 
            className="HoverGrow"
            style={{
              height: "100px", 
              width: "100px", 
              backgroundColor: "white", 
              borderRadius: "100px",
              margin: "20px",
              border: "5px solid gold",
              boxShadow: "2px 2px 8px 3px rgba(0, 0, 0, 0.2)"
            }}
            >
              <Image 
                src={ChainlinkLogo} 
                alt="python" 
                height="30px"
                width="30px" 
                style={{
                  }}
              />
              <h4 style={{top: "50%", transform: "translateY(-50%)"}}>Chainlink</h4>
          </div>

          <div 
            className="HoverGrow"
            style={{
              height: "100px", 
              width: "100px", 
              backgroundColor: "white", 
              borderRadius: "100px",
              margin: "20px",
              border: "5px solid gold",
              boxShadow: "2px 2px 8px 3px rgba(0, 0, 0, 0.2)"
            }}
            >
              <Image 
                src={LogoJava} 
                alt="python" 
                height="40px"
                width="60px" 
                style={{
                  borderRadius: "90px",
                  marginTop: "10px"
                  }}
              />
              <h4 style={{top: "50%", transform: "translateY(-50%)"}}>Java</h4>
          </div>

        </div>
        
        </div>
        
    </div>
    

      
    </div>
  )
}
}

export default Home


export function SuccessMessage({ message }) {
  if (!message) return null;

  return (
    <div>
      <div>
        <label>{message}</label>
      </div>
    </div>
  );
}



export function ErrorMessage({ message }) {
  if (!message) return null;

  return (
    <div>
      <div>
        <label>{message}</label>
      </div>
    </div>
  );
}
