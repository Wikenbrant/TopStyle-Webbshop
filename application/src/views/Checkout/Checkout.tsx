import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Order, useGetOrderLazyQuery } from "../../generated/graphql";
import Parallax from "../../components/Parallax/Parallax";
import GridContainer from "../../components/Grid/GridContainer";
import GridItem from "../../components/Grid/GridItem";
import classNames from "classnames";
import makeLandingPageStyle from "../../assets/jss/material-kit-react/views/landingPage";
import OrderSection from "./Sections/OrderSection";

interface Props {}

const Checkout = (props: Props) => {
  const classes = makeLandingPageStyle();
  const { id } = useParams();
  const [order, setOrder] = useState<Order>();
  const [GetOrder, { data, error, loading }] = useGetOrderLazyQuery({
    variables: { id: Number(id) },
    onCompleted: ({ order }) => setOrder(order as Order),
  });
  useEffect(() => {
    GetOrder();
  }, [GetOrder]);
  return (
    <div>
      <Parallax filter image={"https://source.unsplash.com/random"}>
        <div className={classes.container}>
          <GridContainer>
            <GridItem sm={12} md={6}>
              <h1 className={classes.title}>Your Order.</h1>
            </GridItem>
          </GridContainer>
        </div>
      </Parallax>
      <div className={classNames(classes.main, classes.mainRaised)}>
        <div className={classes.container}>
          <OrderSection order={order} />
        </div>
      </div>
    </div>
  );
};

export default Checkout;
