import { createTheme, ThemeProvider } from "@material-ui/core";
import { useMemo, useState, useEffect } from "react";
import {
    ConnectionProvider,
    WalletProvider,
} from "@solana/wallet-adapter-react";
import * as anchor from "@project-serum/anchor";
import { clusterApiUrl } from "@solana/web3.js";
import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
import {
    getPhantomWallet,
    getSlopeWallet,
    getSolflareWallet,
    getSolflareWebWallet,
    getSolletWallet,
    getSolletExtensionWallet,
    getSolongWallet,
    getLedgerWallet,
    getSafePalWallet,
} from "@solana/wallet-adapter-wallets";

import {
    WalletModalProvider
} from '@solana/wallet-adapter-react-ui';

import "./App.css";
import Home from "./Home";
import MainHome from "./MainHome";
import About from "./About";
import Roadmap from "./Roadmap";
import Faq from "./Faq";
import Header from "./Header";

import { Route, Routes, useLocation } from "react-router-dom";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import "./Transition.css";

require('@solana/wallet-adapter-react-ui/styles.css');


const candyMachineId = new anchor.web3.PublicKey(
  process.env.REACT_APP_CANDY_MACHINE_ID!
);

const network = process.env.REACT_APP_SOLANA_NETWORK as WalletAdapterNetwork;

const rpcHost = process.env.REACT_APP_SOLANA_RPC_HOST!;
const connection = new anchor.web3.Connection(rpcHost);

const txTimeout = 30000; // milliseconds (confirm this works for your project)

const theme = createTheme({
    palette: {
        type: 'dark',
    },
    overrides: {
        MuiButtonBase: {
            root: {
                justifyContent: 'flex-start',
            },
        },
        MuiButton: {
            root: {
                textTransform: undefined,
                padding: '12px 16px',
            },
            startIcon: {
                marginRight: 8,
            },
            endIcon: {
                marginLeft: 8,
            },
        },
    },
});

const App = () => {
    // Custom RPC endpoint.
  const endpoint = useMemo(() => clusterApiUrl(network), []);

    // @solana/wallet-adapter-wallets includes all the adapters but supports tree shaking and lazy loading --
    // Only the wallets you configure here will be compiled into your application, and only the dependencies
    // of wallets that your users connect to will be loaded.
    const wallets = useMemo(
        () => [
            getPhantomWallet(),
            getSlopeWallet(),
            getSolflareWallet(),
            getSolflareWebWallet(),
            getSolletWallet({ network }),
            getSolletExtensionWallet({ network }),
            getSolongWallet(),
            getLedgerWallet(),
            getSafePalWallet(),
        ],
        []
    );

    const location = useLocation();
    const [displayLocation, setDisplayLocation] = useState(location);
    const [transitionStage, setTransistionStage] = useState("fadeIn");

    useEffect(() => {
      if (location !== displayLocation) setTransistionStage("fadeOut");
    }, [location, displayLocation]);

  return (
      <ThemeProvider theme={theme}>
        <ConnectionProvider endpoint={endpoint}>
          <WalletProvider wallets={wallets} autoConnect={true}>
            <WalletModalProvider>
              <Header/>
              <div                /* 원래는 trasitionGroup과 CSSTransition을 사용하라고 권장하지만 도대체인지 안되어 다음과 같은 코드를 사용함 문제는 같은 경로로의 header link를 눌러도 애니매이션이 걸려서 class acive인 것의 클릭을 막음 (App.css)*/
                className={`${transitionStage}`}
                onAnimationEnd={() => {
                  if (transitionStage === "fadeOut") {
                    setTransistionStage("fadeIn");
                    setDisplayLocation(location);
                  }
                }}
              >
                <Routes location={displayLocation}>  
                  <Route path='/' element={<MainHome/>}></Route>
                  <Route path='/About' element={<About/>}></Route>
                  <Route path='/Roadmap' element={<Roadmap/>}></Route>
                  <Route path='/Faq' element={<Faq/>}></Route>
                  <Route path="/Mint" element = {<Home
                                            candyMachineId={candyMachineId}
                                            connection={connection}
                                            txTimeout={txTimeout}
                                            rpcHost={rpcHost}
                                          />}>
                  </Route>
                </Routes>
              </div>
            </WalletModalProvider>
          </WalletProvider>
        </ConnectionProvider>
      </ThemeProvider>
  );
};

export default App;
