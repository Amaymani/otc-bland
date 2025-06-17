"use client"
import React from 'react'
import { Button } from './ui/button'
import { signIn, useSession, signOut } from 'next-auth/react'

const Navbar = () => {
    const {data: session, status} = useSession();


  return (
    <div className='fixed top-5 flex w-full justify-between px-4 md:px-10 lg:px-20'>
    <span className="pointer-events-none whitespace-pre-wrap bg-gradient-to-b from-black to-gray-300/80 bg-clip-text text-center text-3xl font-black leading-none text-transparent dark:from-white dark:to-slate-900/10">
        BLAND OTC
    </span>

    <div className='flex items-center gap-2'>
        {status === 'authenticated' ? (
            <>
                <span className='text-sm font-semibold'>{session.user?.name}</span>
                <Button variant='outline' onClick={() => signOut()}>Sign Out</Button>
            </>
        ) : (
            <Button variant='outline' onClick={() => signIn('google')}>Sign In with Google</Button>
        )}

    </div>

    </div>
  )
}

export default Navbar