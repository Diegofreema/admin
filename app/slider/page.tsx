import EventCard from '@/components/EventCard';
import DeleteModal from '@/components/DeleteModal';
import { fetchSliders } from '@/lib/actions/slider';
import AddSlider from './_components/AddSlider';

export default async function Slider() {
  const sliders = await fetchSliders();

  const displaySliders =
    sliders?.length > 0 ? (
      sliders?.map((item, i) => {
        return (
          <EventCard
            key={i}
            heading={item?.heading}
            description={item?.description}
            type="slider"
            imgUrl={item?.imgUrl}
            id={item?._id.toString()}
          />
        );
      })
    ) : (
      <h2 className="text-center font-bold text-xl">No Sliders Yet</h2>
    );
  return (
    <div className="py-[100px]  w-[90%] mx-auto">
      <DeleteModal />
      <div className="grid grid-cols-1 sm:grid-cols-2 sm:gap-x-20 gap-y-8">
        <div>
          <div className="space-y-16">
            <h2 className="text-center font-bold text-xl">Add A Slider</h2>
            <AddSlider />
          </div>
        </div>

        <div className="space-y-16">
          <h2 className="text-center font-bold text-xl">Sliders</h2>

          <div className=" max-h-[500px]  overflow-y-auto   space-y-4">
            {displaySliders}
          </div>
        </div>
      </div>
    </div>
  );
}
