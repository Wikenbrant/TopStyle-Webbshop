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
import { Typography } from "@material-ui/core";
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
      <GridContainer className={classes.section} spacing={5} direction="column">
        <GridItem>
          <GridContainer justify="center">
            <GridItem xs={12} sm={12} md={8}>
              <Typography variant="h5" className={classes.title}>
                Products
              </Typography>
            </GridItem>
          </GridContainer>
        </GridItem>
        <GridItem>
          <GridContainer spacing={10}>
            {products.map(product => (
              <GridItem xs={12} md={6} lg={4} key={product.productId}>
                <GridContainer>
                  <GridItem xs={12}>
                    <Typography variant="h6" className={classes.title}>
                      {product.name}
                    </Typography>
                  </GridItem>
                  <GridItem xs={12}>
                    <Typography paragraph className={classes.description}>
                      {product.description}
                    </Typography>
                  </GridItem>
                  <GridItem xs={12}>
                    <GridContainer justify="center" alignItems="center">
                      <GridItem xs={4}>
                        <Typography
                          paragraph
                          color="primary"
                          style={{ marginBottom: 0 }}
                          align="right"
                        >
                          {product.price} kr
                        </Typography>
                      </GridItem>
                      <GridItem xs={6}>
                        <Button
                          color="success"
                          onClick={e => {
                            AddProductToCart(product, 1);
                            OpenCart(document.querySelector("#cart"));
                          }}
                          variant="contained"
                          size="lg"
                        >
                          Add to cart
                        </Button>
                      </GridItem>
                    </GridContainer>
                  </GridItem>
                </GridContainer>
              </GridItem>
            ))}
          </GridContainer>
        </GridItem>
      </GridContainer>
    </div>
  );
}
