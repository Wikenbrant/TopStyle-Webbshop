import React, { useContext, useState } from "react";
import ShopingCartContext from "../../Contexts/ShopingCartContext";
import {
  makeStyles,
  Popper,
  Grow,
  Paper,
  ClickAwayListener,
  IconButton,
  Typography,
  Popover
} from "@material-ui/core";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import GridContainer from "../Grid/GridContainer";
import GridItem from "../Grid/GridItem";
import Button from "../CustomButtons/Button";

const Cart: React.FC<{
  className: string;
  iconColor:
    | "primary"
    | "info"
    | "success"
    | "warning"
    | "danger"
    | "transparent"
    | "white"
    | "rose"
    | "dark";
}> = ({ className, iconColor }) => {
  const { cart, OpenCart, CloseCart, cartOpen } = useContext(
    ShopingCartContext
  );
  const useStyles = makeStyles(theme => ({
    container: { float: "right", position: "relative" },
    icon: { color: "inherit" },
    cart: {
      "&:after": {
        position: "absolute",
        right: 17,
        bottom: 5,
        borderRadius: "50%",
        content: `"${cart.length}"`,
        display: "block",
        backgroundColor: "white",
        color: "#555",
        fontWeight: 600,
        height: 20,
        width: 20,
        textAlign: "center",
        fontFamily: "roboto",
        zIndex: -1
      }
    },
    paper: {
      padding: theme.spacing(1),
      minWidth: 150,
      minHeight: 150
    }
  }));
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <div className={classes.cart}>
        <Button
          className={classes.icon}
          onClick={e => {
            OpenCart(e.currentTarget);
          }}
          color="transparent"
        >
          <ShoppingCartIcon />
        </Button>
      </div>
      <Popover
        open={cartOpen.open}
        anchorEl={cartOpen.anchorEl}
        onClose={e => CloseCart()}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center"
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center"
        }}
      >
        <Paper className={classes.paper}>
          <GridContainer spacing={2}>
            <GridItem>
              <Typography variant="h5" align="center">
                Cart
              </Typography>
            </GridItem>
            {cart.map(({ product, quantity }) => (
              <GridItem key={product.id}>
                {product.name} {quantity}
              </GridItem>
            ))}
          </GridContainer>
        </Paper>
      </Popover>
    </div>
  );
};

export default Cart;
