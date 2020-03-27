import React, { useContext } from "react";
import ShopingCartContext from "./Contexts/ShopingCartContext";
import { useGetAllProductsQuery, Product } from "./generated/graphql";

function App() {
  const { data } = useGetAllProductsQuery();
  const { cart, AddProductToCart, RemoveProductFromCart } = useContext(
    ShopingCartContext
  );
  return (
    <>
      <ul>
        {data?.products.map(product => (
          <li>
            <p>{JSON.stringify(product, null, 2)}</p>
            <p onClick={() => AddProductToCart(product as Product, 3)}>+</p>
            <p onClick={() => RemoveProductFromCart(product.id, 3)}>-</p>
          </li>
        ))}
      </ul>
      <div>
        <p>{JSON.stringify(cart, null, 3)}</p>
      </div>
    </>
  );
}

export default App;
