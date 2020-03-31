import React from "react";
import Header from "../../components/Header/Header";
import makeLandingPageStyle from "../../assets/jss/material-kit-react/views/landingPage";
import Parallax from "../../components/Parallax/Parallax";
import HeaderLinks from "../../components/Header/HeaderLinks";
import GridContainer from "../../components/Grid/GridContainer";
import GridItem from "../../components/Grid/GridItem";
import Footer from "../../components/Footer/Footer";
import classNames from "classnames";
import ProductSection from "./Sections/ProductSection";

const LandingPage = () => {
  const classes = makeLandingPageStyle();
  return (
    <div>
      <Parallax filter image={"https://source.unsplash.com/random"}>
        <div className={classes.container}>
          <GridContainer>
            <GridItem xs={12} sm={12} md={6}>
              <h1 className={classes.title}>Your Story Starts With Us.</h1>
              <h4>
                Every landing page needs a small description after the big bold
                title, that{"'"}s why we added this text here. Add here all the
                information that can make you or your product create the first
                impression.
              </h4>
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
