import ObjectiveComponents from './_components/ObjectiveComponents';
import GoalComponents from './_components/GoalComponents';
import Priority from './_components/Priority';

type Props = {};

const Obj = (props: Props) => {
  return (
    <div className="py-[100px] min-h-screen space-y-8">
      <ObjectiveComponents />
      <GoalComponents />
      <Priority />
    </div>
  );
};

export default Obj;
