/* eslint-disable @next/next/no-img-element */
import React, { useContext } from "react";
import Link from "next/link";
import { Store } from "../utils/store";

export default function ProductItem({product}) {

  const { state, dispatch } = useContext(Store);

  console.log(state)


  const addToCartHandler = () => {
    const existItem = state.cart.cartItems.find((x) => x.slug === product.slug);
    const quantity = existItem ? existItem.quantity + 1 : 1;

    if (product.countInStock < quantity) {
      alert('Sorry. Product is out of stock');
      return;
    }

    dispatch({ type: 'CART_ADD_ITEM', payload: { ...product, quantity } });
  };
  
  
  return (
    <div className="card">
      <Link legacyBehavior href={`/product/${product.slug}`}>
        <a>
          <img
            src={product.image}
            alt={product.name}
            className="rounded shadow"
          />
        </a>
      </Link>

      <div className="flex flex-col items-center justify-center p-5">
        <Link legacyBehavior href={`/product/${product.slug}`}>
        <a>
        <h2 className="text-lg">
            {product.name}
        </h2>
        </a>
        </Link>

        <p className="mb-2">${product.price}</p>
        <button onClick={addToCartHandler} className="primary-button" type="button">Add to Cart</button>
       

      </div>
    </div>
  );
}
