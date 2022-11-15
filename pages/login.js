import Link from 'next/link'
import React from 'react'
import { useForm } from 'react-hook-form'
import Layout from '../components/Layout'

export default function login() {

    const{
        handleSubmit,
        register,
        formState: {errors},
    } = useForm();
    const submitHandler = ({email, password}) => {
    }

  return (
    <Layout title="Login">
        <form className='mx-auto max-w-screen-md' onSubmit={handleSubmit(submitHandler)}>
            <h1 className='mb-4 text-xl'>Login</h1>
            <div className='mb-4'>
                <label htmlFor='email'>Email</label>
                <input type="email" {...register('email', {required: 'Please enter email'})} className='w-full' id="email">

                </input>
                {errors.email && (
                <div className='text-red-500'>{errors.email.message}</div>)}
            </div>
            <div className='mb-4'>
                <label htmlFor='password'>Password</label>
                <input type="password" {...register('password', {required: 'Please enter password'})} className='w-full' id="password">

                </input>
                {errors.password && (
                <div className='text-red-500'>{errors.password.message}</div>)}
            </div>
            <div className='mb-4'>
                <button className='primary-button'>
                    Login
                </button>
            </div>
            <div className='mb-4'>
                Don&apos;t have an account? &nbsp;
                <Link href="/register">Register</Link>
            </div>

        </form>
    </Layout>
  )
}