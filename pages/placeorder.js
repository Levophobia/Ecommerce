import Image from 'next/image';
import Link from 'next/link';
import React, { useContext } from 'react';
import CheckoutWizard from '../components/CheckoutWizard';
import Layout from '../components/Layout';
import { Store } from '../utils/store';

export default function placeorder() {
  const { state, dispatch } = useContext(Store);
  const { cart } = state;
  const { cartItems, shippingAddress, paymentMethod } = cart;

  const round2 = (num) => Math.round(num * 100 + Number.EPSILON) / 100; 

  const itemsPrice = round2(cartItems.reduce((a, c) => a + c.quantity * c.price, 0))

  return (
    <div>
      <Layout title="Place order">
        <CheckoutWizard activeStep={3} />
        <h1 className="mb-4 text-xl">Place order</h1>
        {cartItems.length === 0 ? (
          <div>
            Cart is empty
            <Link href="/">Back to shopping</Link>
          </div>
        ) : (
          <div className="grid md:grid-cols-4 md:gap-5">
            <div className="overflow-x-auto md:col-span-3">
              <div className="card p-5">
                <h2 className="mb-2 text-lg">Shipping Address</h2>
                <div>
                  {shippingAddress.fullName}, {shippingAddress.address},{' '}
                  {shippingAddress.city}, {shippingAddress.postalCode},{' '}
                  {shippingAddress.country}
                </div>
              </div>
              <div className="card p.5">
                <h2 className="mb-2 text-lg">Payment method</h2>
                <div>{paymentMethod}</div>
              </div>

              <div className="card overflow-x-auto p-5">
                <h2 className="mb-2 text-lg">Order Items</h2>
                <table className="min-w-full">
                  <thead>
                    <th className="px-5 text-left">Item</th>
                    <th className="p-5 text-right">Quantity</th>
                    <th className="p-5 text-right">Price</th>
                    <th className="p-5 text-right">Total</th>
                  </thead>
                  <tbody>
                    {cartItems.map((item) => (
                      <tr key={item._id} className="border-b">
                        <td>
                          <Link legacyBehavior href={`/product/${item.slug}`}>
                            <a className="flex items-center">
                              <Image
                                src={item.image}
                                alt={item.name}
                                width={50}
                                height={50}
                              ></Image>
                              &nbsp;
                              {item.name}
                            </a>
                          </Link>
                        </td>
                        <td className="p-5 text-right">{item.quantity}</td>
                        <td className="p-5 text-right">{item.price}</td>
                        <td className="p-5 text-right">
                          Total: {item.quantity * item.price}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            <div className="card p-5">
              <h2 className="mb-2 text-lg">Order Summary</h2>
              <ul>
                <li>
                  <div className='mb-2 flex justify-between'>
                    <div>Items</div>
                    <div>Total: {itemsPrice}</div>
                  </div>
                  <button diabled={loading} onClick={placeOrderHandler} className='primary-button w-full'>
                    {loading? 'loading...': 'Place Order'}
                  </button>
                </li>
              </ul>
            </div>
          </div>
        )}
      </Layout>
    </div>
  );
}

placeorder.auth = true