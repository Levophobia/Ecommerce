/* eslint-disable @next/next/no-img-element */
import React, { useContext } from "react";
import Link from "next/link";
import { Store } from "../utils/store";

export default function ProductItem({product, addToCartHandler}) {

  const { state } = useContext(Store);

  console.log(state)
  
  
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
        <button onClick={() => addToCartHandler(product)} className="primary-button" type="button">Add to Cart</button>
       

      </div>
    </div>
  );
}
