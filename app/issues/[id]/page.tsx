import { prisma } from '@/prisma/client'
import { Box, Flex, Grid } from '@radix-ui/themes'
import { notFound } from 'next/navigation'
import EditIssueButton from './EditIssueButton'
import IssueDetails from './IssueDetails'
import DeleteIssueButton from './DeleteIssueButton'
import { getServerSession } from 'next-auth'
import authOptions from '@/app/auth/authOptions'
import AssigneeSelect from './AssigneeSelect'
import { cache } from 'react'

const fetchUsers = cache((issueId: number) => (prisma.issue.findUnique({where : {id : issueId}})))

const IssueDetailPage = async ({params}: {params: Promise<{ id: string }>}) => {
    const { id } = await params;
    const issue = await fetchUsers(parseInt(id));

    if(!issue)
        notFound();

    const session = await getServerSession(authOptions);
  
    return (
    <Grid columns={{initial : '1', sm : '5'}} gap='5'>
        <Box className='md:col-span-4'>
            <IssueDetails issue={issue}/>
        </Box>
        {session && <Box>
            <Flex direction='column' gap='5'>
                <AssigneeSelect issue={issue}/>
                <EditIssueButton issueId={issue.id}/>
                <DeleteIssueButton issueId={issue.id}/>
            </Flex>
        </Box>}
    </Grid>
  )
}

export async function generateMetadata({params}: {params: Promise<{ id: string }>}) {
    const { id } = await params;
    const issue = await fetchUsers(parseInt(id));

    return {
        title: issue?.title,
        description: 'Details of issue' + issue?.id
    }
}

export default IssueDetailPage