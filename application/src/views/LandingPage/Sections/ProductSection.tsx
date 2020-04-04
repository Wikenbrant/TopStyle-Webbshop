import React, { useState, useEffect, useContext } from "react";

// core components
import GridContainer from "../../../components/Grid/GridContainer";
import GridItem from "../../../components/Grid/GridItem";

import productStyle from "../../../assets/jss/material-kit-react/views/landingPageSections/productStyle";
import {
  useGetAllProductsLazyQuery,
  Product
} from "../../../generated/graphql";
import ShopingCartContext from "../../../Contexts/ShopingCartContext";
import { Typography, FormControl, TextField } from "@material-ui/core";
import Button from "../../../components/CustomButtons/Button";

export default function ProductSection() {
  const classes = productStyle();
  const [products, setProducts] = useState<Product[]>([]);
  const [GetAllProducts] = useGetAllProductsLazyQuery({
    onCompleted: ({ products }) => setProducts(products as Product[])
  });
  useEffect(() => {
    GetAllProducts();
  }, [GetAllProducts]);

  const { AddProductToCart, OpenCart } = useContext(ShopingCartContext);
  return (
    <div>
      <GridContainer className={classes.section}>
        <GridContainer justify="center">
          <GridItem xs={12} sm={12} md={8}>
            <h2 className={classes.title}>Products</h2>
          </GridItem>
        </GridContainer>
        <GridContainer>
          {products.map(product => (
            <GridItem xs={12} md={4} key={product.id}>
              {JSON.stringify(product)}
              <h2 className={classes.title}>{product.name}</h2>
              <h5 className={classes.description}>{product.description}</h5>
              <Typography paragraph color="primary">
                {product.price} kr
                <Button
                  color="transparent"
                  onClick={e => {
                    AddProductToCart(product, 1);
                    OpenCart(e.currentTarget);
                  }}
                >
                  Add to cart
                </Button>
              </Typography>
            </GridItem>
          ))}
        </GridContainer>
      </GridContainer>
    </div>
  );
}
