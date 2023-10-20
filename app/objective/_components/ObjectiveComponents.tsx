import ObjectiveForm from './ObjectiveForm';
import { fetchObj } from '@/lib/actions/writeUps';
import ItemCard from './ItemCard';
import { ScrollArea } from '@/components/ui/scroll-area';
import DeleteObjModal from '@/components/DeleteObjModal';
type Props = {};

const ObjectiveComponents = async (props: Props) => {
  const obj = await fetchObj();

  const displayObj =
    obj?.length > 0 ? (
      obj?.map((item, i) => (
        <ItemCard
          heading={item?.heading}
          description={item?.description}
          variant="OBJECTIVE"
          id={item?._id.toString()}
          key={i}
        />
      ))
    ) : (
      <h2 className="text-center font-bold text-xl">No Objectives Yet</h2>
    );
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
      <DeleteObjModal />
      <div>
        <h1 className="text-center font-semibold  mb-5">Add An Objective</h1>
        <ObjectiveForm />
      </div>
      <div>
        <h1 className="text-center font-semibold  mb-5">Objectives</h1>

        <ScrollArea className="h-[300px] py-4">{displayObj}</ScrollArea>
      </div>
    </div>
  );
};

export default ObjectiveComponents;
