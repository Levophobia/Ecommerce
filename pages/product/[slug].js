import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useContext } from 'react';
import Layout from '../../components/Layout';
import data from '../../utils/data';
import { Store } from '../../utils/store';


export default function ProductScreen() {

  const { state, dispatch } = useContext(Store);

  const { query } = useRouter();
  const { slug } = query;
  const product = data.products.find(x => x.slug === slug);
  if(!product){
    return <div>Product Not Found</div>
  }

  const addToCartHandler = () => {
    const existItem = state.cart.cartItems.find((x) => x.slug === product.slug);
    const quantity = existItem ? existItem.quantity + 1 : 1;

    if (product.countInStock < quantity) {
      alert('Sorry. Product is out of stock');
      return;
    }

    dispatch({ type: 'CART_ADD_ITEM', payload: { ...product, quantity } });
  };

  return <Layout title={product.name}>
    <div className='py-2'>
      <Link href="/">
      Back to products
      </Link>
      <div className='grid md:grid-cols-4 md:gap-3'>
        <div className='md:col-span-2'>
          <Image
          src={product.image}
          alt={product.name}
          width={640}
          height={640}
          layout="responsive"          
          ></Image>
          <div>
              <button onClick={addToCartHandler} className='primary-button-details w-full'>Add to Cart</button>
            </div>
          <div>
          <h5 className='text-sm'>{product.description}</h5>
          </div>        

        </div>
        <div>
            <ul>
              <li>
                <h1 className='text-lg'>{product.name}</h1>
              </li>
              <li>
                <h1 className='text-lg'>${product.price}</h1>
              </li>
              <li>
                <h1 className='text-lg'>{product.countInStock > 0 ? 'In stock' : 'Unavailable'}</h1>
              </li>
            </ul>

            
          </div>

      </div>

    </div>
  </Layout>;
}
