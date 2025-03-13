import { prisma } from '@/prisma/client'
import IssueActions from './IssueActions'
import Pagination from '../components/Pagination'
import IssueTable, { IssueQuery } from './IssueTable'
import { Flex } from '@radix-ui/themes'
import { Metadata } from 'next'
import { columnNames } from './columnDefinitions'


interface Props{
  searchParams : IssueQuery
}

const IssuesPage = async ({ searchParams }: Props) => {

  const url = await searchParams;
  const status = url.status;
  const page = parseInt(url.page!) || 1;
  const pageSize = 10;
  const where = {status};
  


  const orderBy = columnNames.includes(url.orderBy)
    ? { [url.orderBy]: url.order || "asc" }
    : undefined;

  const issues = await prisma.issue.findMany({
    where,
    orderBy,
    skip : (page-1)*pageSize,
    take : pageSize
  })

  const issuesCount = await prisma.issue.count({ where });

  return (
    <Flex direction='column' gap='3'>
      <IssueActions/>
      <IssueTable searchParams={url} issues={issues}/>
      <Pagination currentPage={page} pageSize={pageSize} itemCount={issuesCount} />
    </Flex>
  )
}

export const metadata: Metadata = {
  title: 'Issue Tracker - Issues List',
  description: 'View all project issues'
}



export default IssuesPage