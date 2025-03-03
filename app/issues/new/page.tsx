'use client';

import { TextField, Button } from '@radix-ui/themes';
import { useEffect, useState } from 'react';
import "easymde/dist/easymde.min.css";
import { useForm, Controller } from "react-hook-form";
import dynamic from 'next/dynamic';
import { useRouter } from 'next/navigation';
import axios from 'axios';

const SimpleMDE = dynamic(() => import("react-simplemde-editor"), { ssr: false });


interface IssueForm{
  title : string;
  description : string;
}

const NewIssuePage = () => {

  const {register, control, handleSubmit} = useForm<IssueForm>();
  const [isClient, setIsClient] = useState(false);
  const router = useRouter();
  
  useEffect(() => {
    setIsClient(true);
  }, [])

  return (
    <form className='max-w-xl space-y-3' 
      onSubmit={handleSubmit( async (data) => 
        {
          const response = await axios.post('/api/issues', data); 
          console.log('respose ',  response);
          router.push('/issues')
        })
      }
    >

      <TextField.Root placeholder='Title' {...register('title')}/>

      {isClient && <Controller
        name='description'
        control={control}
        render={({field}) => <SimpleMDE placeholder="Description" {...field} />}
      />}

      <Button>Submit New Issue</Button>
    </form>
  );
};

export default NewIssuePage;