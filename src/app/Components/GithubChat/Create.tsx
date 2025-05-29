'use client'
import { AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import React from 'react';
import {useForm} from 'react-hook-form';

type GithubRepoFormInput = {
    repoUrl: string,
    projectName: string,
    githubToken?: string
}

const CreateProject = () => {
  
    const {register,handleSubmit,reset} = useForm<GithubRepoFormInput>();

    function OnSubmit(data: GithubRepoFormInput)
    {
      const project_id = async() =>{
        const response = await fetch('/api/create-project',{
          method:"POST",
          headers:{
            'Content-Type':'application/json'
          },
          body:JSON.stringify(data)
        })
      }
      return;
    }

    return (
      <AlertDialogContent>
        <AlertDialogHeader className='gap-y-8'>
          <AlertDialogTitle className='flex flex-col items-center justify-center gap-y-2'>
            <span className='font-bold text-red-500 text-xl'>Link Your Github Repository</span>
            <span className='text-muted-foreground text-sm'>connect your repo to SerenLingua by entering your github url</span>
          </AlertDialogTitle>
          <AlertDialogDescription className='flex flex-row items-center justify-center gap-x-4'>
            <div>

            </div>
            <div className='flex flex-col items-center justify-center gap-y-4'>
              <form onSubmit={handleSubmit(OnSubmit)} className='flex flex-col items-center justify-center gap-y-4'>
                <Input {...register('projectName',{required:true})} placeholder='Enter Project Name' required/>
                <Input {...register('repoUrl',{required:true})} placeholder='Enter Github URL' required type='url'/>
                <Input {...register('githubToken')} placeholder='Github Token { Optional for private repo }'/>
                <div className='flex flex-row items-center justify-center gap-x-4'>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <Button type='submit' className='self-end bg-red-600/85 hover:bg-red-600/85'>
                    Create Project
                </Button>
                </div>
              </form>
            </div>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className='h-4'>
         
        </AlertDialogFooter>
      </AlertDialogContent>
  )
}

export default CreateProject;