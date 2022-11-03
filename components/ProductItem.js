import React from "react";
import Link from "next/link";

export default function ProductItem(product) {
  return (
    <div className="card">
      <Link href={`/product/${product.slug}`}>
        <a>
          shadow
          <img
            src={product.image}
            alt={product.name}
            className="rounded shadow"
          ></img>
        </a>
      </Link>

      <div className="flex flex-col items-center justify-center p-5">
        <Link href={`/product/${product.slug}`}>
        <a>
        <h2 className="text-leg">
            {product.name}
        </h2>
        </a>
        </Link>

        <p className="mb-2">${product.price}</p>
        <button className="primary-button" type="button">Add to Cart</button>
       

      </div>
    </div>
  );
}
