'use client';

import { TextField, Button, Callout, Text } from '@radix-ui/themes';
import { useEffect, useState } from 'react';
import "easymde/dist/easymde.min.css";
import { useForm, Controller } from "react-hook-form";
import dynamic from 'next/dynamic';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod'
import { createIssueSchema } from '@/app/validationSchemas';
import ErrorMessage from '@/app/components/ErrorMessage';
import Spinner from '@/app/components/Spinner';

const SimpleMDE = dynamic(() => import("react-simplemde-editor"), { ssr: false });


type IssueForm = z.infer<typeof createIssueSchema>

const NewIssuePage = () => {

  const {register, control, handleSubmit, formState: { errors }} = useForm<IssueForm>({
    resolver : zodResolver(createIssueSchema)
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
        await axios.post('/api/issues', data); 
        router.push('/issues')
      } catch (error) {
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

        <TextField.Root placeholder='Title' {...register('title')}/>
        <ErrorMessage>{errors.title?.message}</ErrorMessage>

        {isClient && <Controller
          name='description'
          control={control}
          render={({field}) => <SimpleMDE placeholder="Description" {...field} />}
        />}
        <ErrorMessage>{errors.description?.message}</ErrorMessage>

        <Button disabled={submitting}>Submit New Issue {submitting && <Spinner/>}</Button>
      </form>
    </div>
  );
};

export default NewIssuePage;