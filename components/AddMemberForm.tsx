'use client';
import { useEffect, useState } from 'react';

import { Input } from '@/components/ui/input';
import { Button } from './ui/button';
import UploadComponent from './Upload';
import { useToast } from './ui/use-toast';
import { useRouter } from 'next/navigation';
import { createMember, editMember } from '@/lib/actions/user';
import { useEditTeam } from '@/hook/useEditTeam';

type Props = {};

const AddMemberForm = (props: Props) => {
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    setIsMounted(true);
  }, []);
  const { editData, edit, setEdit } = useEditTeam();
  const [values, setValues] = useState(editData);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const router = useRouter();
  const requiredFields = ['name', 'job', 'imgUrl'];
  const emptyFields = requiredFields.filter(
    (field) => !values[field as keyof Props]
  );
  useEffect(() => {
    setValues(editData);
  }, [editData]);

  async function onSubmit(e: any) {
    e.preventDefault();
    if (emptyFields.length) {
      toast({
        variant: 'destructive',
        title: `${emptyFields.join(' and ').toUpperCase()} ${
          emptyFields.length > 1 ? 'are' : 'is'
        } required`,
        description: 'Please fill required fields',
      });
      return;
    }
    setLoading(true);
    try {
      edit && setEdit();
      edit
        ? await editMember(editData.id, values.name, values.job, values.imgUrl)
        : await createMember(values.name, values.job, values.imgUrl);
      toast({
        variant: 'success',
        title: 'Success',
        description: edit
          ? 'You have updated a member'
          : 'You have added a new member to your team',
      });
      setValues({
        name: '',
        job: '',
        imgUrl: '',
        id: '',
      });
      router.refresh();
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Something went wrong',
      });
    } finally {
      setLoading(false);
    }
  }
  if (!isMounted) {
    return null;
  }
  return (
    <div>
      <form onSubmit={onSubmit} className="space-y-6">
        <Input
          placeholder="Name"
          value={values.name}
          onChange={(e) => {
            setValues((prev) => ({
              ...prev,
              name: e.target.value,
            }));
          }}
        />
        <Input
          placeholder="Job"
          value={values.job}
          onChange={(e) => {
            setValues((prev) => ({
              ...prev,
              job: e.target.value,
            }));
          }}
        />

        <UploadComponent
          endpoint="teamImage"
          value={values.imgUrl}
          onChange={(url: any) => {
            setValues((prev) => ({
              ...prev,
              imgUrl: url,
            }));
          }}
        />

        <Button
          disabled={loading}
          variant={'purple'}
          className="w-full"
          type="submit"
        >
          {edit ? 'Update' : ' Submit'}
        </Button>
      </form>
    </div>
  );
};

export default AddMemberForm;
