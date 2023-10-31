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
import { useEffect, useState } from 'react';
import { ColorRing } from 'react-loader-spinner';
import { deleteEvent, deleteMember, deleteVolunteer } from '@/lib/actions/user';
import { deleteSlider } from '@/lib/actions/slider';
import { useToast } from './ui/use-toast';
const DeleteModal = () => {
  const { isOpen, onClose, id } = useDeleteModal();
  const router = useRouter();
  const pathname = usePathname();
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);
  const handleDelete = async () => {
    setLoading(true);
    if (pathname === '/event') {
      try {
        await deleteEvent(id);
        toast({
          variant: 'success',
          title: 'Success',
          description: 'Event deleted successfully',
        });
      } catch (error) {
        toast({
          variant: 'destructive',
          title: 'Error',
          description: 'Failed to delete event , something went wrong',
        });
      }
    } else if (pathname === '/volunteer') {
      try {
        await deleteVolunteer(id);
        toast({
          variant: 'success',
          title: 'Success',
          description: 'Volunteer deleted successfully',
        });
      } catch (error) {
        toast({
          variant: 'destructive',
          title: 'Error',
          description: 'Failed to delete volunteer , something went wrong',
        });
      }
    } else if (pathname === '/slider') {
      try {
        await deleteSlider(id);
        toast({
          variant: 'success',
          title: 'Success',
          description: 'Slider deleted successfully',
        });
      } catch (error) {
        toast({
          variant: 'destructive',
          title: 'Error',
          description: 'Failed to delete slider , something went wrong',
        });
      }
    } else {
      try {
        await deleteMember(id);
        toast({
          variant: 'success',
          title: 'Success',
          description: 'Member deleted successfully',
        });
      } catch (error) {
        toast({
          variant: 'destructive',
          title: 'Error',
          description: 'Failed to delete member , something went wrong',
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
            Are you absolutely sure?
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

export default DeleteModal;
