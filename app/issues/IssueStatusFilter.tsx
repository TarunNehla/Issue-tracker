'use client';

import { Status } from "@prisma/client";
import { Select } from "@radix-ui/themes";
import { useRouter, useSearchParams } from "next/navigation";
import React from "react";

const statuses: { label: string; value?: Status }[] = [
  { label: "All" },
  { label: "Open", value: "OPEN" },
  { label: "In Progress", value: "IN_PROGRESS" },
  { label: "Closed", value: "CLOSED" },
];

const IssueStatusFilter = () => {

    const router = useRouter();
    const searchParams = useSearchParams();


  return (
    <Select.Root defaultValue={searchParams.get('status') || ''} onValueChange={(status) => {

      const params = new URLSearchParams();
      if(status){
        if (status === 'all') {
          params.delete("status"); 
        } else {
          params.append('status', status);
        }
      }
      
      if(searchParams.get('orderBy'))
        params.append('orderBy', searchParams.get('orderBy')!);

      const query = params.size ? '?' + params.toString() : '';
        router.push('/issues'+query);
    }}>
      <Select.Trigger placeholder="Filter by Status..." />
      <Select.Content>
        {statuses.map((status, index) => (
          <Select.Item key={index} value={status.value || 'all'}>
            {status.label}
          </Select.Item>
        ))}
      </Select.Content>
    </Select.Root>
  );
};

export default IssueStatusFilter;
