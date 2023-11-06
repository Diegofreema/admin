'use client';
import React, { useEffect } from 'react';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from './ui/card';
import { Button } from './ui/button';
import { useDeleteModal } from './modalControl';
import { useUser } from '@/hook/useUser';
import { useRouter } from 'next/navigation';
import { useToast } from './ui/use-toast';

type Props = {
  email: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  dob: string;
  address: string;
  skill: string;
  country: string;
  reason: string;
  id: string;
};

const VolunteerComponent = ({
  email,
  firstName,
  lastName,
  phoneNumber,
  dob,
  address,
  skill,
  country,
  reason,
  id,
}: Props) => {
  const { getId, onOpen } = useDeleteModal();
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
  }, [toast, router, loggedIn]);

  const handleDelete = (id: string) => {
    onOpen();
    getId(id);
  };
  return (
    <Card>
      <CardHeader>
        <CardTitle>
          <h1 className="text-center font-bold text-sm">
            {firstName} {lastName}
          </h1>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-center font-bold text-sm">Email: {email}</p>
        <p className="text-center font-bold text-sm">
          Phone Number: {phoneNumber}
        </p>
        <p className="text-center font-bold text-sm">Date of Birth: {dob}</p>
        <p className="text-center font-bold text-sm">Address: {address}</p>
        <p className="text-center font-bold text-sm">Skill: {skill}</p>
        <p className="text-center font-bold text-sm">Country: {country}</p>
        <p className="text-center font-bold text-sm">Reason: {reason}</p>
      </CardContent>
      <CardFooter>
        <Button
          variant={'destructive'}
          className="w-full"
          size={'lg'}
          onClick={() => handleDelete(id)}
        >
          Delete
        </Button>
      </CardFooter>
    </Card>
  );
};

export default VolunteerComponent;
