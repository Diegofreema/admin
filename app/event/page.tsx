import { fetchEvent } from '@/lib/actions/user';
import AddEvent from '@/components/AddEventForm';
import EventCard from '@/components/EventCard';
import DeleteModal from '@/components/DeleteModal';
import moment from 'moment-timezone';

export default async function Event() {
  const events = await fetchEvent();

  const displayEvents =
    events?.length > 0 ? (
      events?.map((item, i) => {
        return (
          <EventCard
            key={i}
            venue={item?.venue}
            name={item?.name}
            startDate={item?.startDate.toString()}
            endDate={item?.endDate?.toString() || null}
            imgUrl={item?.imgUrl}
            id={item?._id.toString()}
            type="event"
            description={item?.description}
          />
        );
      })
    ) : (
      <h2 className="text-center font-bold text-xl">No Events Yet</h2>
    );
  return (
    <div className="py-[100px] !overflow-scroll !h-screen  w-[90%] mx-auto">
      <DeleteModal />
      <div className="grid grid-cols-1 lg:grid-cols-2 lg:gap-x-20 gap-y-8">
        <div className="">
          <div className="space-y-16">
            <h2 className="text-center font-bold text-xl">Add An Event</h2>
            <AddEvent />
          </div>
        </div>

        <div className="space-y-16">
          <h2 className="text-center font-bold text-xl">Events</h2>

          <div className=" max-h-[500px]  overflow-y-auto   space-y-4">
            {displayEvents}
          </div>
        </div>
      </div>
    </div>
  );
}
