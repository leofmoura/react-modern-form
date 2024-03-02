'use client';

import React from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { useFieldArray, useForm } from 'react-hook-form';
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
import { Minus, MoveUp, Plus } from 'lucide-react';
import { DevTool } from '@hookform/devtools';

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
    fields: tags,
    append,
    prepend,
    remove,
    swap,
    move,
    insert,
  } = useFieldArray({
    control: form.control, // control props comes from useForm (optional: if you are using FormContext)
    name: 'tags', // unique name for your Field Array
  });

  const onSubmit = (data: FormInputs) => {
    toast({
      title: 'Form is good!',
      description: JSON.stringify(data),
    });
  };

  const onError = (data: any) => {
    // toast({
    //   title: 'Form is good!',
    //   variant: 'destructive',
    //   description: JSON.stringify(data),
    // });
  };

  // console.info(form.watch());

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
          <div
            className='pl-8'
            key={tag.id}
          >
            <FormField
              {...form.register(`tags.${index}`)}
              control={form.control}
              render={({ field: tag }) => (
                <>
                  <FormItem>
                    <FormLabel>{index + 1}.</FormLabel>
                    <FormControl>
                      <Input
                        {...form.register(`tags.${index}.value`)}
                        type='text'
                        {...tag.value}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                  <Button
                    type='button'
                    onClick={() => remove(index)}
                  >
                    <Minus />
                    Remove
                  </Button>
                </>
              )}
            />
          </div>
        ))}
        <Button type='submit'>Submit</Button>
      </form>
      <DevTool control={form.control} />
    </Form>
  );
}

export default MyForm;
