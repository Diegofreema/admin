import React from 'react';
import PriorityForm from './PriorityForm';
import { fetchPriorities } from '@/lib/actions/writeUps';
import ItemCard from './ItemCard';
import { ScrollArea } from '@/components/ui/scroll-area';
import DeleteObjModal from '@/components/DeleteObjModal';
type Props = {};

const Priority = async (props: Props) => {
  const priorities = await fetchPriorities();

  const displayPriorities =
    priorities?.length > 0 ? (
      priorities?.map((item, i) => (
        <ItemCard
          heading={item?.heading}
          description={item?.description}
          id={item?._id.toString()}
          variant="PRIORITY"
          key={i}
        />
      ))
    ) : (
      <h2 className="text-center font-bold text-xl">No priorities Yet</h2>
    );
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
      <DeleteObjModal />
      <div>
        <h1 className="text-center font-semibold mb-5">Add A Priority</h1>
        <PriorityForm />
      </div>
      <div>
        <h1 className="text-center font-semibold  mb-5">Priorities</h1>

        <ScrollArea className="h-[300px] py-4">{displayPriorities}</ScrollArea>
      </div>
    </div>
  );
};

export default Priority;
