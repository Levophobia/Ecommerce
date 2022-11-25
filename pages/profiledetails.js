import { signOut } from 'next-auth/react'
import React from 'react'

export default function profiledetails() {

const logoutHandler = () =>{
    signOut({callbackUrl: '/login'})
}



  return (
    <div>
      <a onClick={logoutHandler}>Logout</a>
    </div>
  )
}
