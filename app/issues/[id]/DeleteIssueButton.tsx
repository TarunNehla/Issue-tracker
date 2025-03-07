'use client'

import { Spinner } from '@/app/components'
import { AlertDialog, Button, Flex } from '@radix-ui/themes'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'

const DeleteIssueButton = ( { issueId } : { issueId: number} ) => {

    const [error, setError] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);
    const router = useRouter();

    const DeleteIssue = async () => {
        try {
            setIsDeleting(true);
            await axios.delete('/api/issues/'+issueId)
            router.push('/issues')
        } catch (error) {
            setIsDeleting(false);
            setError(true);
        }
    }

  return (
    <>
        <AlertDialog.Root>
            <AlertDialog.Trigger>
                <Button color='red' disabled = {isDeleting}> 
                    Delete 
                    {isDeleting && <Spinner/>}
                </Button>
            </AlertDialog.Trigger>
            <AlertDialog.Content>
                <AlertDialog.Title>Confirm Deletion</AlertDialog.Title>
                <AlertDialog.Description>
                    Are you sure you want to delete this issue ? This action can't be undone.
                </AlertDialog.Description>

                <Flex gap='3' mt='4'>
                    <AlertDialog.Cancel>
                        <Button variant='soft' color='gray'>Cancel</Button>
                    </AlertDialog.Cancel>
                    <AlertDialog.Action>
                        <Button variant='solid' color='red' onClick={DeleteIssue}>
                            Delete Issue
                        </Button>
                    </AlertDialog.Action>
                </Flex>
            </AlertDialog.Content>
        </AlertDialog.Root>

        <AlertDialog.Root open={error}>
            <AlertDialog.Content>
                <AlertDialog.Title>Error</AlertDialog.Title>
                <AlertDialog.Description>This issue could not be deleted</AlertDialog.Description>
                <Button mt='2' variant='soft' color='gray' onClick={() => setError(false)}>Okay</Button>
            </AlertDialog.Content>
        </AlertDialog.Root>
    </>
  )
}

export default DeleteIssueButton