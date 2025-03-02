'use client'

import Link from 'next/link'
import React from 'react'
import { AiFillBug } from "react-icons/ai";
import { usePathname } from 'next/navigation';
import classNames from 'classnames';

const NavBar = () => {

    const currentPath = usePathname();

    const links = [
        {label : 'Dashboard', href : '/'},
        {label : 'Issues', href : '/issues'}
    ]

  return (
    <nav className='flex space-x-6 border-b px-5 h-16 items-center mb-5'>
        <Link href={'/'}><AiFillBug /></Link>
        <ul className='flex space-x-6'>
            {links.map(link => 
                <Link key={link.href} 
                href={link.href}
                className={ classNames({
                    'text-zinc-900' : currentPath === link.href,
                    'text-zinc-500' : currentPath !== link.href,
                    'hover: text-zinc-800 transition-colors' : true
                })}
                >{link.label}</Link>
            )}
        </ul>
    </nav>
  )
}

export default NavBar