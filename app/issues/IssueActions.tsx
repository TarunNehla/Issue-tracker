'use client'

import React, { Suspense } from 'react'
import { Button, Flex } from '@radix-ui/themes'
import Link from 'next/link'
import IssueStatusFilter from './IssueStatusFilter'

const IssueActions = () => {
  return (
    <Flex justify='between'>
        <Suspense fallback={<div>Loading filter...</div>}>
        <IssueStatusFilter/>
      </Suspense>
        <Button><Link href='/issues/new'>Create new Issue</Link></Button>
    </Flex>
  )
}

export default IssueActions