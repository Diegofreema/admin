'use client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { useToast } from '@/components/ui/use-toast';
import { useDeleteItem } from '@/hook/useDeleteItems';
import { useEditGoal } from '@/hook/useEditGoals';
import { useEditObj } from '@/hook/useEditObj';
import { useEditPriority } from '@/hook/useEditPriority';
import { useUser } from '@/hook/useUser';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';

type Props = {
  heading: string;
  description: string;
  variant: 'OBJECTIVE' | 'GOAL' | 'PRIORITY';
  id: string;
};

const ItemCard = ({ description, heading, variant, id }: Props) => {
  const { getId, onOpen, getVariant } = useDeleteItem();
  const { getEditGoal, setEdit } = useEditGoal();
  const { getEditPriority, setEdit: setEditPriority } = useEditPriority();
  const { getEditObj, setEdit: setEditObj } = useEditObj();
  const { loggedIn } = useUser();
  const router = useRouter();
  const { toast } = useToast();
  useEffect(() => {
    if (!loggedIn) {
      router.push('/');
      toast({
        variant: 'destructive',
        title: 'Unauthorized',
        description: 'Please login',
      });
    }
  }, [loggedIn, router, toast]);

  const handleDelete = (id: string) => {
    onOpen();
    getId(id);
    getVariant(variant);
  };
  const handleEditFn = (id: string, heading: string, description: string) => {
    if (variant === 'GOAL') {
      getEditGoal({
        heading,
        description,
        id,
      });
      setEdit();
    } else if (variant === 'PRIORITY') {
      getEditPriority({
        heading,
        description,
        id,
      });
      setEditPriority();
    } else if (variant === 'OBJECTIVE') {
      getEditObj({
        heading,
        description,
        id,
      });
      setEditObj();
    }
  };

  return (
    <Card className="mb-5">
      <CardContent className="space-y-4">
        <div>
          <h1 className="font-bold">Heading</h1>
          <p>{heading}</p>
        </div>
        <div>
          <h1 className="font-bold">Description</h1>
          <p>{description}</p>
        </div>
      </CardContent>
      <CardFooter className="flex items-center justify-between space-x-3">
        <Button
          variant={'purple'}
          className="w-full"
          onClick={() => handleEditFn(id, heading, description)}
        >
          Edit
        </Button>
        <Button
          variant={'destructive'}
          className="w-full"
          onClick={() => handleDelete(id)}
        >
          Delete
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ItemCard;
