'use client'

import { ChevronLeftIcon, ChevronRightIcon, DoubleArrowLeftIcon, DoubleArrowRightIcon } from '@radix-ui/react-icons';
import { Button, Flex, Text } from '@radix-ui/themes';
import { useRouter, useSearchParams } from 'next/navigation';
import React from 'react'

interface Props{
    itemCount : number,
    pageSize : number,
    currentPage : number,
}

const Pagination = ( {itemCount, currentPage, pageSize} : Props) => {
    
    const totalPages = Math.ceil(itemCount/pageSize);

    const searchParams = useSearchParams();
    const router = useRouter();

    if(totalPages<=1) return null

    const changePage = (page : number) => {
        const params = new URLSearchParams(searchParams);
        params.set('page', page.toString());
        router.push('?' + params.toString());
    }

    return (
        <Flex align='center' gap='2'>
            <Button color='gray' variant='soft' disabled={currentPage===1} 
                onClick={() => changePage(1)}
            >
                <DoubleArrowLeftIcon/>
            </Button>
            <Button color='gray' variant='soft' disabled={currentPage===1}
                onClick={() => changePage(currentPage-1)}
            >
                <ChevronLeftIcon/>
            </Button>
            <Text size='2'>Page {currentPage} of {totalPages}</Text>
            <Button color='gray' variant='soft' disabled={currentPage===totalPages}
                onClick={() => changePage(currentPage+1)}
            >
                <ChevronRightIcon/>
            </Button>
            <Button color='gray' variant='soft' disabled={currentPage===totalPages}
                onClick={() => {changePage(totalPages)}}
            >
                <DoubleArrowRightIcon/>
            </Button>
        </Flex>
    )
}

export default Pagination