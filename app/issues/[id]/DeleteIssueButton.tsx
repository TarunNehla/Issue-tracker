'use client'

import { AlertDialog, Button, Flex } from '@radix-ui/themes'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import React from 'react'

const DeleteIssueButton = ( { issueId } : { issueId: number} ) => {

    const router = useRouter()

  return (
    <AlertDialog.Root>
        <AlertDialog.Trigger>
            <Button color='red'> Delete </Button>
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
                    <Button variant='solid' color='red' onClick={ async () => {
                        await axios.delete('/api/issues/'+issueId)
                        router.push('/issues')
                    }}>
                        Delete Issue
                    </Button>
                </AlertDialog.Action>
            </Flex>
        </AlertDialog.Content>
    </AlertDialog.Root>
  )
}

export default DeleteIssueButton