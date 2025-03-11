import { Issue, Status } from '@prisma/client'
import { ArrowDownIcon, ArrowUpIcon } from '@radix-ui/react-icons'
import { Table } from '@radix-ui/themes'
import NextLink from 'next/link'
import {Link} from '@/app/components'
import { IssueStatusBadge } from '../components'

export interface IssueQuery{
  status? : Status; 
  orderBy: keyof Issue; 
  order?: 'asc'|'desc';
  page?: string
}

interface Props{
  searchParams : IssueQuery,
  issues: Issue[]
}

const IssueTable = ({searchParams, issues} : Props) => {

  const url = searchParams;

  return (
    <div>
        <Table.Root variant='surface'>
        <Table.Header>
          <Table.Row>
            {columns.map(column => (
              <Table.ColumnHeaderCell key={column.value} className={column.className}>
                <NextLink href={{
                  query: {...url,
                    orderBy: column.value,
                    order: url.orderBy === column.value && url.order === 'asc' ? 'desc' : 'asc',
                  }
                }}>
                  {column.label}  
                  {column.value===url.orderBy && (
                    url.order ==='asc' ? <ArrowUpIcon className='inline'/> : <ArrowDownIcon className='inline'/>
                  )}
                </NextLink>
              </Table.ColumnHeaderCell>
            ))}
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {issues.map(issue => (
            <Table.Row key={issue.id}>
              <Table.Cell>
                <Link href={`/issues/${issue.id}`}>
                  {issue.title}
                </Link>
                
                <div className='block md:hidden'>
                  <IssueStatusBadge status={issue.status}/>
                </div>
              </Table.Cell>
              <Table.Cell className='hidden md:table-cell'>
              <IssueStatusBadge status={issue.status}/>
              </Table.Cell>
              <Table.Cell className='hidden md:table-cell'>{issue.createdAt.toDateString()}</Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </div>
  )
}

const columns: {label: string, value: keyof Issue, className?: string }[] = [
  {label: 'Issues',value: 'title' },
  {label: 'Status', value: 'status', className: 'hidden md:table-cell'},
  {label: 'Created', value: 'createdAt', className: 'hidden md:table-cell'}
]

export const columnNames = columns.map(column => column.value);

export default IssueTable