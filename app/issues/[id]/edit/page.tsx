import React from 'react';
import { prisma } from '@/prisma/client';
import { notFound } from 'next/navigation';
import IssueFormWrapper from '@/app/issues/_components/IssueFormWrapper';

const EditIssuePage = async ({ params }: { params: { id: string } }) => {
  const { id } = params;
  const issue = await prisma.issue.findUnique({
    where: { id: parseInt(id) }
  });

  if (!issue) notFound();

  return (
    <IssueFormWrapper issue={issue} />
  );
};

export default EditIssuePage;