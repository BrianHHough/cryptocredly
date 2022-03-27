import React from 'react';
import NavBar from "./NavBar";
import Footer from "./Footer";

const Layout = ({children}: {children: any}) => {
  return (
    <>
    <NavBar />
      {children}
    <Footer />
    </>
  )
}

export default Layout;