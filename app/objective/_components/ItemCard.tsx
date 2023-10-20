'use client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { useToast } from '@/components/ui/use-toast';
import { useDeleteItem } from '@/hook/useDeleteItems';
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
      <CardFooter>
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
