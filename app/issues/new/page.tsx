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

const SimpleMDE = dynamic(() => import("react-simplemde-editor"), { ssr: false });


type IssueForm = z.infer<typeof createIssueSchema>

const NewIssuePage = () => {

  const {register, control, handleSubmit, formState: { errors }} = useForm<IssueForm>({
    resolver : zodResolver(createIssueSchema)
  });
  const [isClient, setIsClient] = useState(false);
  const router = useRouter();
  const [error, setError] = useState('');
  
  useEffect(() => {
    setIsClient(true);
  }, [])

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
        onSubmit={handleSubmit( async (data) => 
          {
            try {
              const response = await axios.post('/api/issues', data); 
              console.log('respose ',  response);
              router.push('/issues')
            } catch (error) {
              setError('An unexpected Error occur');
            }
          })
        }
      >

        <TextField.Root placeholder='Title' {...register('title')}/>
        {errors.title && <Text color='red' as='p'>{errors.title.message}</Text>}

        {isClient && <Controller
          name='description'
          control={control}
          render={({field}) => <SimpleMDE placeholder="Description" {...field} />}
        />}
        {errors.description && <Text color='red' as='p'>{errors.description.message}</Text>}

        <Button>Submit New Issue</Button>
      </form>
    </div>
  );
};

export default NewIssuePage;