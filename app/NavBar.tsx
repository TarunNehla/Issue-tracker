'use client'

import Link from 'next/link'
import React from 'react'
import { AiFillBug } from "react-icons/ai";
import { usePathname } from 'next/navigation';
import classNames from 'classnames';
import { useSession } from 'next-auth/react'
import { Avatar, Box, Container, DropdownMenu, Flex, Text } from '@radix-ui/themes';

const NavBar = () => {

    const currentPath = usePathname();
    const { status , data : session } = useSession()
    console.log("Session Data:", session);
    
    const links = [
        {label : 'Dashboard', href : '/'},
        {label : 'Issues', href : '/issues'}
    ]

  return (
    <nav className='border-b px-5 mb-5 py-3'>
        <Container>
            <Flex justify='between' >
                <Flex align='center' gap='3'>
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
                </Flex>
                <Box>
                    {status === 'authenticated' &&
                    (<DropdownMenu.Root>
                        <DropdownMenu.Trigger>
                            {/* <button className="bg-transparent border-none p-0 m-0 rounded-full focus:outline-none focus:ring-0">
                                
                            </button> */}

                            <Avatar 
                                src={session?.user?.image || ''} 
                                fallback='?' 
                                radius='full' 
                                size='2' 
                                className='cursor-pointer'
                                referrerPolicy='no-referrer'
                            />
                        </DropdownMenu.Trigger>
                        <DropdownMenu.Content>
                            <DropdownMenu.Label>
                                <Text size='2'>{session.user!.email}</Text>
                            </DropdownMenu.Label>
                            <DropdownMenu.Item>
                                <Link href='/api/auth/signout'>SignOut</Link>
                            </DropdownMenu.Item>
                        </DropdownMenu.Content>
                    </DropdownMenu.Root>)}
                    { status === 'unauthenticated' && <Link href='/api/auth/signin'>SignIn</Link> }
                </Box>
            </Flex>
        </Container>
        
        
    </nav>
  )
}

export default NavBar