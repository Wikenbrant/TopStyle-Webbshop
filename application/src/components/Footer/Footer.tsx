/*eslint-disable*/
import React from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// material-ui core components
import { List, ListItem, Typography, Container } from "@material-ui/core";

// @material-ui/icons
import Favorite from "@material-ui/icons/Favorite";

import makeFooterStyle from "../../assets/jss/material-kit-react/components/footerStyle";

interface Props {
  whiteFont?: boolean;
}

const Footer: React.FC<Props> = props => {
  const classes = makeFooterStyle();
  const { whiteFont } = props;
  const footerClasses = classNames({
    [classes.footer]: true,
    [classes.footerWhiteFont]: whiteFont
  });
  return (
    <footer className={footerClasses} style={{ margin: 30 }}>
      <Container>
        <Typography variant="h6" color="textSecondary">
          &copy; {new Date().getFullYear()} Made by Mathias Wikenbrant
        </Typography>
      </Container>
    </footer>
  );
};

export default Footer;
