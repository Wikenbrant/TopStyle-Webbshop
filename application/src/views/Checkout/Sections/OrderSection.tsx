import React, { useState, useEffect, useContext } from "react";

// core components
import GridContainer from "../../../components/Grid/GridContainer";
import GridItem from "../../../components/Grid/GridItem";

import productStyle from "../../../assets/jss/material-kit-react/views/landingPageSections/productStyle";
import {
  useGetAllProductsLazyQuery,
  Product,
  Order,
} from "../../../generated/graphql";
import ShopingCartContext from "../../../Contexts/ShopingCartContext";
import {
  Typography,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Container,
} from "@material-ui/core";
import Button from "../../../components/CustomButtons/Button";
import { container } from "../../../assets/jss/material-kit-react";

export default function OrderSection({ order }: { order?: Order }) {
  const classes = productStyle();
  if (!order) {
    return <div>Loading...</div>;
  }
  return (
    <div style={{ color: "#555", padding: 0 }}>
      <GridContainer
        className={classes.section}
        alignItems="center"
        justify="center"
        direction="column"
        spacing={1}
        style={{ maxWidth: 400 }}
      >
        <GridItem>
          <Typography variant="h5" align="right">
            Ordernr. {order.orderId}
          </Typography>
        </GridItem>
        <GridItem>
          <Typography variant="h6" align="right">
            Thank you. {order.user.name}
          </Typography>
        </GridItem>
        {order.orderDetails.map(({ product, quantity, sum }) => (
          <GridItem key={product.productId}>
            <GridContainer>
              <GridItem xs={6}>
                <Typography variant="h6" align="right">
                  {product.name}
                </Typography>
              </GridItem>
              <GridItem xs={6}>
                <Typography
                  align="right"
                  paragraph
                >{`${quantity} X ${product.price} kr = ${sum} kr`}</Typography>
              </GridItem>
            </GridContainer>
          </GridItem>
        ))}
        <GridItem>
          <Typography align="right" variant="h6">
            {`Total: ${order.orderDetails
              .map((item) => item.sum)
              .reduce((a, b) => a + b, 0)} kr`}
          </Typography>
        </GridItem>
      </GridContainer>
    </div>
  );
}
