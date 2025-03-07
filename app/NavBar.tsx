'use client'

import Link from 'next/link'
import React from 'react'
import { AiFillBug } from "react-icons/ai";
import { usePathname } from 'next/navigation';
import classNames from 'classnames';
import { useSession } from 'next-auth/react'
import { Box } from '@radix-ui/themes';

const NavBar = () => {

    const currentPath = usePathname();
    const { status , data : session } = useSession()

    const links = [
        {label : 'Dashboard', href : '/'},
        {label : 'Issues', href : '/issues'}
    ]

  return (
    <nav className='flex space-x-6 border-b px-5 h-16 items-center mb-5'>
        <Link href={'/'}><AiFillBug /></Link>
        <ul className='flex space-x-6'>
            {links.map(link => 
                <li key={link.href}>
                    <Link 
                    href={link.href}
                    className={ classNames({
                        'text-zinc-900' : currentPath === link.href,
                        'text-zinc-500' : currentPath !== link.href,
                        'hover: text-zinc-800 transition-colors' : true
                    })}
                    >{link.label}</Link>
                </li>
            )}
        </ul>
        <Box>
            { status === 'authenticated' && <Link href='/api/auth/signout'>SignOut</Link> }
            { status === 'unauthenticated' && <Link href='/api/auth/signin'>SignIn</Link> }
        </Box>
    </nav>
  )
}

export default NavBar