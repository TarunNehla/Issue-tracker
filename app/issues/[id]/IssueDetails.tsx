import { IssueStatusBadge } from '@/app/components'
import { Issue } from '@prisma/client'
import { Heading, Card } from '@radix-ui/themes'
import React from 'react'
import Markdown from 'react-markdown'

const IssueDetails = ({ issue }: { issue: Issue }) => {
  return (
    <>
      <Heading>{issue.title}</Heading>
      <div className="flex space-x-3 my-2">
        <IssueStatusBadge status={issue.status} />
        <p>{issue.createdAt.toDateString()}</p>
      </div>
      <Card className='prose mt-4'>
        <Markdown>{issue.description}</Markdown>
      </Card>
    </>
  )
}

export default IssueDetails