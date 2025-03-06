import IssueStatusBadge from '@/app/components/IssueStatusBadge'
import { prisma } from '@/prisma/client'
import { Box, Button, Card, Grid, Heading } from '@radix-ui/themes'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import React from 'react'
import Markdown from 'react-markdown'
import { Pencil2Icon } from '@radix-ui/react-icons'

interface Props {
    params : {id : string}
}

const IssueDetailPage = async ({params} : Props) => {
  
    const issue = await prisma.issue.findUnique({
        where : {id : parseInt(params.id)}
    })

    if(!issue)
        notFound();
  
    return (
    <Grid columns={{initial : '1', md : '2'}} gap='5'>
        <Box>
            <Heading>{issue.title}</Heading>
            <div className="flex space-x-3 my-2">
                <IssueStatusBadge status={issue.status}/>
                <p>{issue.createdAt.toDateString()}</p>
            </div>
            <Card className='prose mt-4'>
                <Markdown>{issue.description}</Markdown>
            </Card>
        </Box>
        <Box>
            <Button>
                <Pencil2Icon/>
                <Link href={`/issuse/${issue.id}/edit`}>
                    Edit Issue
                </Link>
            </Button>
        </Box>
    </Grid>
  )
}

export default IssueDetailPage