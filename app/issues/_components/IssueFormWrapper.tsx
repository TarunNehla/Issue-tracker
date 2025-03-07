'use client';

import dynamic from 'next/dynamic';
import IssueFormSkeleton from './IssueFormSkeleton';

const IssueForm = dynamic(
  () => import('@/app/issues/_components/IssueForm'),
  {
    ssr: false,
    loading: () => <IssueFormSkeleton />
  }
);

const IssueFormWrapper = ({ issue }: { issue?: any }) => {
  return <IssueForm issue={issue} />;
};

export default IssueFormWrapper;