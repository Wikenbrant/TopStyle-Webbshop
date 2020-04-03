import React from "react";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import HeaderLinks from "./components/Header/HeaderLinks";

const Layout: React.FC = ({ children }) => {
  return (
    <>
      <Header
        color="transparent"
        brand="TopStyle"
        fixed
        rightLinks={<HeaderLinks />}
        changeColorOnScroll={{
          height: 400,
          color: "white"
        }}
      />
      {children}
      {<Footer />}
    </>
  );
};

export default Layout;
