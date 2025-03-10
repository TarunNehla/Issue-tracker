import { ChevronLeftIcon, ChevronRightIcon, DoubleArrowLeftIcon, DoubleArrowRightIcon } from '@radix-ui/react-icons';
import { Button, Flex, Text } from '@radix-ui/themes';
import React from 'react'

interface Props{
    itemCount : number,
    pageSize : number,
    currentPage : number,
}

const Pagination = ( {itemCount, currentPage, pageSize} : Props) => {
    
    const totalPages = Math.ceil(itemCount/pageSize);

    if(totalPages<=1) return null

    return (
        <Flex align='center' gap='2'>
            <Button color='gray' variant='soft' disabled={currentPage===1}>
                <DoubleArrowLeftIcon/>
            </Button>
            <Button color='gray' variant='soft' disabled={currentPage===1}>
                <ChevronLeftIcon/>
            </Button>
            <Text size='2'>Page {currentPage} of {totalPages}</Text>
            <Button color='gray' variant='soft' disabled={currentPage===totalPages}>
                <ChevronRightIcon/>
            </Button>
            <Button color='gray' variant='soft' disabled={currentPage===totalPages}>
                <DoubleArrowRightIcon/>
            </Button>
        </Flex>
    )
}

export default Pagination