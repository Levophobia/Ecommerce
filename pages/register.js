/* eslint-disable react-hooks/rules-of-hooks */
import Link from 'next/link';
import React, { useEffect } from 'react';
import { signIn, useSession } from 'next-auth/react';
import { useForm } from 'react-hook-form';
import Layout from '../components/Layout';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';
import axios from 'axios';
import { getError } from '../utils/error';

export default function register() {
  const { data: session } = useSession();

  const router = useRouter();
  const { redirect } = router.query;

  useEffect(() => {
    if (session?.user) {
      router.push(redirect || '/');
    }
  }, [router, session, redirect]);

  const {
    handleSubmit,
    register,
    getValues,
    formState: { errors },
  } = useForm();
  const submitHandler = async ({firstname, lastname, email, password }) => {
    try {
        
        await axios.post('/api/auth/signup', {          
          firstname,
          lastname,
          email,
          password,
        });

      const result = await signIn('credentials', {
        redirect: false,
        email,
        password,
      })
      if (result.error) {
        toast.error(result.error);
      }
    } catch (err) {
      toast.error(getError(err));
    }
  };

  return (
    <Layout title="Register">
      <form
        className="mx-auto max-w-screen-md"
        onSubmit={handleSubmit(submitHandler)}
      >
        <h1 className="mb-4 text-xl">Register</h1>

        <div className="mb-4">
          <label htmlFor="firstname">Firstname</label>
          <input
            type="name"
            className="w-full"
            id="firstname"
            autoFocus
            {...register('firstname', {
              required: 'Please enter firstname',
            })}
          />
          {errors.firstname && (
            <div className="text-red-500">{errors.firstname.message}</div>
          )}
        </div>

        <div className="mb-4">
          <label htmlFor="lastname">Lastname</label>
          <input
            type="name"
            className="w-full"
            id="lastname"
            autoFocus
            {...register('lastname', {
              required: 'Please enter lastname',
            })}
          />
          {errors.lastname && (
            <div className="text-red-500">{errors.lastname.message}</div>
          )}
        </div>

        <div className="mb-4">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            {...register('email', { required: 'Please enter email' })}
            className="w-full"
            id="email"
          ></input>
          {errors.email && (
            <div className="text-red-500">{errors.email.message}</div>
          )}
        </div>
        <div className="mb-4">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            {...register('password', { required: 'Please enter password' })}
            className="w-full"
            id="password"
          ></input>
          {errors.password && (
            <div className="text-red-500">{errors.password.message}</div>
          )}
        </div>

        <div className="mb-4">
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            type="password"
            {...register('confirmPassword', { required: 'Please enter confirm password',
        validate: (value) => value === getValues('password') })}
            className="w-full"
            id="confirmPassword"
          ></input>
          {errors.confirmPassword && (
            <div className="text-red-500">{errors.confirmPassword.message}</div>
          )}
        </div>
        {errors.confirmPassword && 
        errors.confirmPassword.type === 'validate' &&(
            <div className='text-red-500'>Password do not match</div>
        )}




        <div className="mb-4">
          <button className="primary-button">Register</button>
        </div>
        <div className="mb-4">
          Don&apos;t have an account? &nbsp;
          <Link href={`/register?redirect=${redirect || '/'}`}>Register</Link>
        </div>
      </form>
    </Layout>
  );
}
