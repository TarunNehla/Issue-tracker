'use client';

import ErrorMessage from '@/app/components/ErrorMessage';
import Spinner from '@/app/components/Spinner';
import { IssueSchema } from '@/app/validationSchemas';
import { zodResolver } from '@hookform/resolvers/zod';
import { Issue } from '@prisma/client';
import { Button, Callout, TextField } from '@radix-ui/themes';
import axios from 'axios';
import "easymde/dist/easymde.min.css";
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Controller, useForm } from "react-hook-form";
import SimpleMDE from 'react-simplemde-editor';
import { z } from 'zod';


type IssueFormData= z.infer<typeof IssueSchema>


const IssueForm = ( {issue} : {issue? : Issue}) => {

  const {register, control, handleSubmit, formState: { errors }} = useForm<IssueFormData>({
    resolver : zodResolver(IssueSchema)
  });
  const [isClient, setIsClient] = useState(false);
  const router = useRouter();
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);
  
  useEffect(() => {
    setIsClient(true);
  }, [])

  const onSubmit = handleSubmit( async (data) => 
    {
      try {
        setSubmitting(true)
        if(issue)
            await axios.patch('/api/issues/'+ issue.id, data);
        else
            await axios.post('/api/issues', data); 
        router.push('/issues')
      } catch {
        setSubmitting(false)
        setError('An unexpected Error occur');
      }
    })

  return (
    <div className='max-w-xl'>
      {
        error && <Callout.Root color='red' className='mb-5'>
          <Callout.Text>
            {error}
          </Callout.Text>
        </Callout.Root>
      }
      <form className=' space-y-3' 
        onSubmit={onSubmit}
      >

        <TextField.Root placeholder='Title' defaultValue={issue?.title} {...register('title')}/>
        <ErrorMessage>{errors.title?.message}</ErrorMessage>

        {isClient && <Controller
          name='description'
          control={control}
          defaultValue= {issue?.description}
          render={({field}) => <SimpleMDE placeholder="Description" {...field} />}
        />}
        <ErrorMessage>{errors.description?.message}</ErrorMessage>

        <Button disabled={submitting}>
            {issue ? 'Update Issue' : 'Submit New Issue'} {submitting && <Spinner/>}
        </Button>
      </form>
    </div>
  );
};

export default IssueForm;