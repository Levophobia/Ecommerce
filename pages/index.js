import axios from "axios";
import { useContext } from "react";
import Layout from "../components/Layout";
import ProductItem from "../components/ProductItem";
import Product from "../models/Product";
import db from "../utils/db";
import { Store } from "../utils/store";

export default function Home({products}) {

  const { state, dispatch } = useContext(Store);
  const {cart} = state;

  const addToCartHandler = async (product) => {
    const existItem = cart.cartItems.find((x) => x.slug === product.slug);
    const quantity = existItem ? existItem.quantity + 1 : 1;
    const {data} = await axios.get(`/api/products/${product._id}`)

    if (data.countInStock < quantity) {
      alert('Sorry. Product is out of stock');
      return;
    }

    dispatch({ type: 'CART_ADD_ITEM', payload: { ...product, quantity } });
  };

  return (
    <Layout title="Home Page">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-4">
        {products.map((product) => (
        <ProductItem addToCartHandler={addToCartHandler} product = {product} key={product.slug}/>
        ))}
      </div>
    </Layout>
  );
}

export async function getServerSideProps(){
  await db.connect();
  const products = await Product.find().lean();
  return {
    props:{
      products: products.map(db.convertDocToObject),
    },
  }
}
