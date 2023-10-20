import React from 'react';
import GoalForm from './GoalForm';
import { fetchGoal } from '@/lib/actions/writeUps';
import ItemCard from './ItemCard';
import { ScrollArea } from '@/components/ui/scroll-area';
import DeleteObjModal from '@/components/DeleteObjModal';
type Props = {};

const GoalComponents = async (props: Props) => {
  const goals = await fetchGoal();

  const displayGoal =
    goals?.length > 0 ? (
      goals?.map((item, i) => (
        <ItemCard
          heading={item?.heading}
          description={item?.description}
          variant="GOAL"
          id={item?._id.toString()}
          key={i}
        />
      ))
    ) : (
      <h2 className="text-center font-bold text-xl">No Goals Yet</h2>
    );
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
      <DeleteObjModal />
      <div>
        <h1 className="text-center font-semibold mb-5">Add A Goal</h1>
        <GoalForm />
      </div>
      <div>
        <h1 className="text-center font-semibold  mb-5">Goals</h1>

        <ScrollArea className="h-[300px] py-4">{displayGoal}</ScrollArea>
      </div>
    </div>
  );
};

export default GoalComponents;
