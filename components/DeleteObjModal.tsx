'use client';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from './ui/button';
import { useDeleteModal } from './modalControl';
import { usePathname, useRouter } from 'next/navigation';
import { useDeleteItem } from '@/hook/useDeleteItems';
import { deleteGoal, deleteObj, deletePriority } from '@/lib/actions/writeUps';
import { useToast } from './ui/use-toast';
import { useEffect, useState } from 'react';
import { ColorRing } from 'react-loader-spinner';
const DeleteObjModal = () => {
  const { isOpen, onClose, id, variant } = useDeleteItem();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);
  const handleDelete = async () => {
    setLoading(true);
    if (variant === 'OBJECTIVE') {
      try {
        await deleteObj(id);
        toast({
          title: 'Objective Deleted',
          description: 'Objective deleted successfully',
          variant: 'success',
        });
      } catch (error) {
        toast({
          title: 'Error',
          description: 'Something went wrong',
          variant: 'destructive',
        });
      }
    } else if (variant === 'GOAL') {
      try {
        await deleteGoal(id);
        toast({
          title: 'Goal Deleted',
          description: 'Goal deleted successfully',
          variant: 'success',
        });
      } catch (error) {
        toast({
          title: 'Error',
          description: 'Something went wrong',
          variant: 'destructive',
        });
      }
    } else {
      try {
        await deletePriority(id);
        toast({
          title: 'Priority Deleted',
          description: 'Priority deleted successfully',
          variant: 'success',
        });
      } catch (error) {
        toast({
          title: 'Error',
          description: 'Something went wrong',
          variant: 'destructive',
        });
      }
    }
    setLoading(false);
    onClose();
    router.refresh();
  };
  if (!mounted) {
    return null;
  }
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader className="space-y-4">
          <DialogTitle className="text-center">
            Are you sure absolutely sure?
          </DialogTitle>
          <div className=" flex items-center justify-center  !space-x-4">
            <Button
              disabled={loading}
              size={'lg'}
              className="!border-none !outline-none"
              variant={'destructive'}
              onClick={handleDelete}
            >
              {loading && (
                <ColorRing
                  visible={true}
                  height="30"
                  width="30"
                  ariaLabel="blocks-loading"
                  wrapperClass="blocks-wrapper"
                  colors={[
                    '#e15b64',
                    '#f47e60',
                    '#f8b26a',
                    '#abbd81',
                    '#849b87',
                  ]}
                />
              )}{' '}
              Yes
            </Button>
            <Button
              size={'lg'}
              className="!border-none !outline-none "
              variant={'purple'}
              onClick={onClose}
            >
              No
            </Button>
          </div>
          <DialogDescription className="text-center">
            This action cannot be undone. Clicking yes will permanently delete
            this from your server.
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteObjModal;
