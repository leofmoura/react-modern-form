'use client';

import React from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Controller, useFieldArray, useForm } from 'react-hook-form';
import { z } from 'zod';
import { formSchema } from '../schemas/form-schema';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form';
import { toast } from '../ui/use-toast';
import { Separator } from '../ui/separator';
import { Plus } from 'lucide-react';

export type FormInputs = z.infer<typeof formSchema>;

function MyForm() {
  const form = useForm<FormInputs>({
    mode: 'onChange',
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: 'Leofmoura',
      email: '',
      password: 'sdasdasdasd1sdads1',
      tags: [{ value: 'asdasd' }],
    },
  });
  const {
    formState: { errors },
  } = form;
  const { fields: tags, append } = useFieldArray({
    control: form.control, // control props comes from useForm (optional: if you are using FormContext)
    name: 'tags', // unique name for your Field Array
  });

  const onSubmit = (data: FormInputs) => {
    toast({
      title: 'Form is good!',
      description: JSON.stringify(data),
    });
  };

  const onError = (errors: any) => {
    console.log(errors);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit, onError)}
        className='space-y-4'
      >
        <FormField
          control={form.control}
          name='name'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input
                  placeholder='shadcn'
                  {...field}
                />
              </FormControl>
              <FormDescription>
                This is your public display name.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='email'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  type='email'
                  {...field}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='password'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input
                  type='password'
                  {...field}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <div className='py-5'>
          <Separator />
        </div>
        <div className='flex place-content-between items-center '>
          <h2 className='font-bold'>Tags:</h2>
          <Button
            type='button'
            onClick={() => append({ value: '' })}
          >
            <Plus />
            Add
          </Button>
        </div>
        {tags.map((tag, index) => (
          <FormField
            key={tag.id}
            control={form.control}
            name={`tags.${index}.value`}
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    placeholder={`Tag ${index + 1}`}
                    {...form.register(`tags.${index}.value`)}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        ))}
        <Button type='submit'>Submit</Button>
      </form>
    </Form>
  );
}

export default MyForm;
