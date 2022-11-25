import Cookies from 'js-cookie';
import { useRouter } from 'next/router';
import React, { useContext, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import CheckoutWizard from '../components/CheckoutWizard';
import Layout from '../components/Layout';
import { Store } from '../utils/store';

export default function payment() {

const router = useRouter();

const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('');

const {state, dispatch} = useContext(Store)
const {cart} = state;
const {shippingAddress, paymentMethod} = cart;

const submitHandler = (e) => {
    e.preventDefault();

    if(!selectedPaymentMethod){
        return toast.error('Payment method is required')
    }
    dispatch({type: 'SAVE_PAYMENT_METHOD', payload: selectedPaymentMethod});
    
    Cookies.set(
        'cart',
        JSON.stringify({
          ...cart,
          paymentMethod: selectedPaymentMethod,
        })
      );
      
      router.push('/placeorder')
}

useEffect(() => {
    if(!shippingAddress.address){
    router.push('shipping')
    }
    setSelectedPaymentMethod(paymentMethod || '')
},[paymentMethod, router, shippingAddress.address])

  return (
    <Layout title="Payment method">
      <CheckoutWizard activeStep={2} />
      <form className="mx-auto max-w-screen-md" onSubmit={submitHandler}>
        <h1 className="mb-4 text-xl">Payment method</h1>
        {['Paypal', 'Klarna'].map((payment) => (
          <div key={payment} className="mb-4">
            <input
              name="paymentMethod"
              className="p-2 outline-none focus:ring-0"
              id={payment}
              type="radio"
              checked={selectedPaymentMethod === payment}
              onChange={() => setSelectedPaymentMethod(payment)}
            />

            <label className='p-2' htmlFor={payment}>
                {payment}
            </label>
          </div>
        ))}

        <div className='mb-4 flex justify-between'>
            <button onClick={() => router.push('/shipping')}
            type='button'
            className='default-button'>
                Back to shipping
            </button>
        </div>

        <div>
        <button className="primary-button">Next</button>
        </div>
      </form>
    </Layout>
  );
}
