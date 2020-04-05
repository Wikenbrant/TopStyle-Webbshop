import React, { useContext } from "react";
import ShopingCartContext from "../../Contexts/ShopingCartContext";
import {
  makeStyles,
  Paper,
  Typography,
  Popover,
  TextField,
  InputAdornment,
  IconButton
} from "@material-ui/core";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import GridContainer from "../Grid/GridContainer";
import GridItem from "../Grid/GridItem";
import Button from "../CustomButtons/Button";
import RemoveIcon from "@material-ui/icons/Remove";
import AddIcon from "@material-ui/icons/Add";

const Cart: React.FC<{}> = () => {
  const {
    cart,
    OpenCart,
    CloseCart,
    cartOpen,
    AddProductToCart,
    SetProductToCart,
    RemoveProductFromCart
  } = useContext(ShopingCartContext);
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
      width: 300,
      minHeight: 50
    }
  }));
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <div className={classes.cart}>
        <Button
          id="cart"
          className={classes.icon}
          onClick={e => {
            if (cart.length > 0) {
              OpenCart(e.currentTarget);
            }
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
          <GridContainer
            spacing={2}
            direction="row"
            alignItems="center"
            justify="center"
          >
            <GridItem>
              <Typography variant="h5" align="center">
                Cart
              </Typography>
            </GridItem>
            {cart.map(({ product, quantity }) => (
              <GridItem key={product.productId}>
                <GridContainer alignItems="center" justify="center">
                  <GridItem xs={3}>
                    <Typography
                      paragraph
                      align="right"
                      style={{ fontSize: ".9rem", marginBottom: 0 }}
                    >
                      {product.name}
                    </Typography>
                  </GridItem>
                  <GridItem xs={6}>
                    <TextField
                      style={{ fontSize: ".9rem" }}
                      value={quantity}
                      type="number"
                      onChange={e =>
                        SetProductToCart(product, +e.currentTarget.value)
                      }
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <IconButton
                              onClick={e =>
                                RemoveProductFromCart(product.productId, 1)
                              }
                              size="small"
                            >
                              <RemoveIcon />
                            </IconButton>
                          </InputAdornment>
                        ),
                        endAdornment: (
                          <InputAdornment position="end">
                            st
                            <IconButton
                              style={{ marginLeft: 5 }}
                              onClick={e => AddProductToCart(product, 1)}
                              size="small"
                            >
                              <AddIcon />
                            </IconButton>
                          </InputAdornment>
                        )
                      }}
                    />
                  </GridItem>
                  <GridItem xs={3}>
                    <Typography
                      paragraph
                      style={{ fontSize: ".9rem", marginBottom: 0 }}
                      align="left"
                    >
                      {product.price * quantity} kr
                    </Typography>
                  </GridItem>
                </GridContainer>
              </GridItem>
            ))}
            <GridItem>
              <Typography
                variant="h6"
                align="right"
                style={{ marginRight: 30 }}
              >
                Totalt:{" "}
                {cart
                  .map(({ product, quantity }) => product.price * quantity)
                  .reduce((a, b) => a + b, 0)}{" "}
                kr
              </Typography>
            </GridItem>
            <Button
              color="success"
              variant="contained"
              style={{
                width: "100%",
                marginLeft: 30,
                marginRight: 30,
                marginBottom: 10
              }}
            >
              Till kassan
            </Button>
          </GridContainer>
        </Paper>
      </Popover>
    </div>
  );
};

export default Cart;
