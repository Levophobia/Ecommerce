import { signOut } from 'next-auth/react'
import Link from 'next/link'
import React from 'react'

export default function profiledetails() {

const logoutHandler = () =>{
    signOut({callbackUrl: '/login'})
}



  return (
    
    <div>
      <div>
      <a onClick={logoutHandler}>Logout</a>
      </div>
      <div>
        <Link href="/orderhistory">Orderhistory</Link>
      </div>
    </div>
  )
}
