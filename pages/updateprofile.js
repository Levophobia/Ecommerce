import axios from 'axios'
import { signIn, useSession } from 'next-auth/react'
import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import Layout from '../components/Layout'
import { getError } from '../utils/error'

export default function updateprofile() {
  
  
    const {data: session} = useSession()
    const {
        handleSubmit,
        register,
        setValue,
        formState: {errors},

    } = useForm()
  
  


    useEffect(() => {
        setValue('firstname', session.user.name);
        setValue('lastname', session.user.lastname)
        setValue('email', session.user.email)
        
    }, [session.user, setValue])

    const submitHandler = async ({firstname, lastname, email, password}) => {

        try{

            await axios.put('/api/auth/update', {
                firstname,
                lastname,
                email,
                password,
            })
            const result = await signIn('credentials',{
                redirect: false,
                email,
                password,
            })

            toast.success('Profile updated successfully')

            if(result.error) {
                toast.error(result.error)
            }

        } catch (err){
            toast.error(getError(err))
        }
    }
  
    return (
    <Layout title='Profile update'>
        <form className='mx-auto max-w-screen-md'
        onSubmit={handleSubmit(submitHandler)}>
                <h1 className='mb-4 text-xl'>
                    Update profile
                </h1>

                <div>
                    <label htmlFor='firstname'>First name</label>
                        <input type='text' className='w-full' id='firstname' autoFocus {...register('firstname',{required: 'Please enter firstname'})}/>
                        {errors.firstname && (
                            <div className='text-red-500'>{errors.firstname.message}</div>
                        )}
                    
                </div>
                <div>
                    <label htmlFor='lastname'>Last name</label>
                        <input type='text' className='w-full' id='lastname' {...register('lastname',{required: 'Please enter lastname'})}/>
                        {errors.lastname && (
                            <div className='text-red-500'>{errors.lastname.message}</div>
                        )}
                    
                </div>
                <div>
                    <label htmlFor='email'>Email</label>
                        <input type='email' className='w-full' id='email' {...register('email',{required: 'Please enter email'})}/>
                        {errors.email && (
                            <div className='text-red-500'>{errors.email.message}</div>
                        )}
                    
                </div>
                <div>
                    <label htmlFor='password'>Password</label>
                        <input type='password' className='w-full' id='password' {...register('password',{required: 'Please enter password'})}/>
                        {errors.password && (
                            <div className='text-red-500'>{errors.password.message}</div>
                        )}
                    
                </div>
                <div>
                    <label htmlFor='confirmpassword'>Confirm password</label>
                        <input type='password' className='w-full' id='confirmpassword' {...register('confirmpassword',{required: 'Please enter password'})}/>
                        {errors.password && (
                            <div className='text-red-500'>{errors.confirmpassword.message}</div>
                        )}
                    
                </div>
                <div className='mb-4'>
                    <button className='primary-button'>Update profile</button>
                </div>
        </form>

    </Layout>
  )
}

updateprofile.auth = true

