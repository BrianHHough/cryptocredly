import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useMoralis } from "react-moralis";
import MetaMaskLogo from "../../assets/MetaMask_Logo.webp"
import CryptoCredly from "../../assets/CryptoCredly-logo.png"
import Blockie from "../../components/Profile/Blockies"

import {
  NavBarCon,
  NavBarInner,
  NavBarLogoCon,
  LogoText,
  NavBarLogoRandomQuote,
  SearchCon,
  SearchInput,
  SearchIcon,
  NavItems,
  NavItemsAuthed,
  LoginWithMetaMask,
  MetaMaskLogoCon,
  LoginWithMetaMaskText,
  NavItemButton,
  NavItemButtonProfile,
  NavItemText
} from "./NavBarElements"

// Style Imports
import TravelExploreIcon from '@mui/icons-material/TravelExplore';
import LogoutIcon from '@mui/icons-material/Logout';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import CircularProgress from '@mui/material/CircularProgress';
import SlowMotionVideoIcon from '@mui/icons-material/SlowMotionVideo';

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref,
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function NavBar(): JSX.Element[] | any {
    const { 
        account,
        authenticate, 
        isAuthenticated, 
        isAuthenticating,
        logout,
        user,
        authError,
        auth
    } = useMoralis();

    const userAd = user?.get("ethAddress");
    const userUn = user?.get("username");

    const [open, setOpen] = React.useState(false);

    const handleClick = () => {
      setOpen(true);
    };
  
    const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
      if (reason === 'clickaway') {
        return;
      }
  
      setOpen(false);
    };


    // PopUp 
    const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null);

    const handlePopoverOpen = (event: React.MouseEvent<HTMLElement>) => {
      setAnchorEl(event.currentTarget);
    };

    const handlePopoverClose = () => {
      setAnchorEl(null);
    };

    const openPopup = Boolean(anchorEl);

  return (
    <>
    <NavBarCon>
      <NavBarInner>

        <Link href="/" passHref>
        <NavBarLogoCon>
          <Image
            src={CryptoCredly}
            height="70px"
            width="70px"
            alt="logo"
          >

          </Image>
        </NavBarLogoCon>
        </Link>

        <SearchCon>
          <SearchInput placeholder="Search by TokenId..."/>
          <SearchIcon>
            <TravelExploreIcon 
              fontSize='large'
              htmlColor='#fff'/>
          </SearchIcon>
        </SearchCon>

        <Snackbar 
          open={open} 
          autoHideDuration={6000} 
          onClose={handleClose}
          anchorOrigin={{ 
            vertical: 'top',
            horizontal: 'right', }}
          style={{
            marginTop: "80px"
          }}
        >
          {/* <Alert 
            onClose={handleClose} 
            severity="success" 
            sx={{ width: '100%' }}
          >
            Login successful!
          </Alert> */}
          {isAuthenticated ?
          <Alert 
            onClose={handleClose} 
            severity="success" 
            sx={{ width: '100%' }}
          >
            Login successful!
          </Alert>
          : 
          <Alert 
            onClose={handleClose} 
            severity="error" 
            sx={{ width: '100%' }}
          >
            {authError}
          </Alert>
          }
        </Snackbar>

        

        <NavItems>
          {!isAuthenticated ? 
          <>
          <LoginWithMetaMask>
            <MetaMaskLogoCon>
              {isAuthenticating ? 
                <CircularProgress 
                thickness={5.5}
                style={{color: 'orange', padding: "6px"}}/>
              : 
                <Image src={MetaMaskLogo} alt="MetaMask Logo" width="100%" height="100%">
                </Image>
              }
            </MetaMaskLogoCon>
            <LoginWithMetaMaskText
              onClick={() => authenticate(
                {signingMessage:"Sign this gas-less transaction to log-into CryptoCredly."
              })
            }
            >
              Connect
            </LoginWithMetaMaskText>
          </LoginWithMetaMask>
          </>
          : 
          <>
          <Link href="/profile" passHref>
            <NavItemButtonProfile>
              <MetaMaskLogoCon>
                <Blockie 
                currentWallet scale={4}
                className="blockieStyle"
                />
              </MetaMaskLogoCon>
              <NavItemText
              >
                {user? 
                userAd.substring(0,6) + "..." + userAd.slice(-4)
                : 
                "0x0000.0000"
              }
              </NavItemText>
            </NavItemButtonProfile>
          </Link>
          <NavItemButton 
            id="Logout Button"
            onClick={() => logout()}
              disabled={isAuthenticating}
              authError={() => handleClick()} 
          >
            <MetaMaskLogoCon>
              <LogoutIcon fontSize='large' style={{color: "var(--color-connectwallet-text)"}}/>
            </MetaMaskLogoCon>
          </NavItemButton>
          </>
          }
          {/* <div>Test</div> */}
        </NavItems>
      </NavBarInner>
     
    </NavBarCon>
    </>
  )
}

export default NavBar