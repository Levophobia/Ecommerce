import { signOut, useSession } from 'next-auth/react'
import Link from 'next/link'
import React from 'react'

export default function profiledetails() {

const logoutHandler = () =>{
    signOut({callbackUrl: '/login'})
}

const {status, data: session} = useSession();

  return (
    
    <div>

      <div>{session.user.firstname}</div>
      <div>{session.user.lastname}</div>
      <div>{session.user.email}</div>


      <div>
      <a onClick={logoutHandler}>Logout</a>
      </div>
      <div>
        <Link href="/orderhistory">Orderhistory</Link>
      </div>
      <div><Link href="/updateprofile">Update profile</Link></div>
    </div>
  )
}
