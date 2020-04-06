import React, { useContext } from "react";
// react components for routing our app without refresh
import { useHistory } from "react-router-dom";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Tooltip from "@material-ui/core/Tooltip";

// core components
//import CustomDropdown from "components/CustomDropdown/CustomDropdown.js";
import Button from "../CustomButtons/Button";

import headerLinksStyle from "../../assets/jss/material-kit-react/components/headerLinksStyle";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import UserContext from "../../Contexts/UserContext";

const HeaderLinks = () => {
  const classes = headerLinksStyle();
  const { loggedIn, name, LogOut } = useContext(UserContext);
  const history = useHistory();
  return (
    <List className={classes.list}>
      <ListItem className={classes.listItem}>
        <Tooltip
          id="instagram-twitter"
          title="Follow us on twitter"
          placement={window.innerWidth > 959 ? "top" : "left"}
          classes={{ tooltip: classes.tooltip }}
        >
          <Button
            href="https://twitter.com"
            target="_blank"
            color="transparent"
            className={classes.navLink}
          >
            <i className={classes.socialIcons + " fab fa-twitter"} />
          </Button>
        </Tooltip>
      </ListItem>
      <ListItem className={classes.listItem}>
        <Tooltip
          id="instagram-facebook"
          title="Follow us on facebook"
          placement={window.innerWidth > 959 ? "top" : "left"}
          classes={{ tooltip: classes.tooltip }}
        >
          <Button
            color="transparent"
            href="https://www.facebook.com"
            target="_blank"
            className={classes.navLink}
          >
            <i className={classes.socialIcons + " fab fa-facebook"} />
          </Button>
        </Tooltip>
      </ListItem>
      <ListItem className={classes.listItem}>
        <Tooltip
          id="instagram-tooltip"
          title="Follow us on instagram"
          placement={window.innerWidth > 959 ? "top" : "left"}
          classes={{ tooltip: classes.tooltip }}
        >
          <Button
            color="transparent"
            href="https://www.instagram.com"
            target="_blank"
            className={classes.navLink}
          >
            <i className={classes.socialIcons + " fab fa-instagram"} />
          </Button>
        </Tooltip>
      </ListItem>
      <ListItem className={classes.listItem}>
        {loggedIn ? (
          <Button
            href="https://twitter.com"
            target="_blank"
            color="transparent"
            className={classes.navLink}
            onClick={async e => {
              await LogOut();
              history.push("/");
            }}
          >
            Logout
          </Button>
        ) : (
          <>
            <Button
              color="transparent"
              className={classes.navLink}
              href="/Login"
            >
              Login
            </Button>
            <Button
              color="transparent"
              className={classes.navLink}
              href="/Register"
            >
              Register
            </Button>
          </>
        )}
      </ListItem>
    </List>
  );
};

export default HeaderLinks;
