import Image from 'next/image';
import { ScrollArea } from '@/components/ui/scroll-area';

import AddMemberForm from '@/components/AddMemberForm';
import LoginModal from '@/components/LoginModal';

export default async function Home() {
  return (
    <div className="py-[100px] min-h-screen  w-[90%] mx-auto">
      <LoginModal home />
    </div>
  );
}
