import React, { useContext } from "react";
import makeLandingPageStyle from "../../assets/jss/material-kit-react/views/landingPage";
import Parallax from "../../components/Parallax/Parallax";
import GridContainer from "../../components/Grid/GridContainer";
import GridItem from "../../components/Grid/GridItem";
import classNames from "classnames";
import ProductSection from "./Sections/ProductSection";
import Button from "../../components/CustomButtons/Button";
import UserContext from "../../Contexts/UserContext";

const LandingPage = () => {
  const classes = makeLandingPageStyle();
  const { loggedIn, LogOut } = useContext(UserContext);
  return (
    <div>
      <Parallax filter image={"https://source.unsplash.com/random"}>
        <div className={classes.container}>
          <GridContainer>
            <GridItem sm={12} md={6}>
              <h1 className={classes.title}>
                Your best experience Starts With Us.
              </h1>
              <h4>The best producs to the best price.</h4>
              {loggedIn ? (
                <Button
                  href="/"
                  onClick={async (e) => await LogOut()}
                  className={classes.navLink}
                >
                  Loggout
                </Button>
              ) : (
                <>
                  <Button
                    href="/Login"
                    className={classes.navLink}
                    variant="outlined"
                  >
                    Login
                  </Button>
                  <Button href="/Register" className={classes.navLink}>
                    Register
                  </Button>
                </>
              )}
            </GridItem>
          </GridContainer>
        </div>
      </Parallax>
      <div className={classNames(classes.main, classes.mainRaised)}>
        <div className={classes.container}>
          <ProductSection />
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
