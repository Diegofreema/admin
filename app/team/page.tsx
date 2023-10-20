import AddMemberForm from '@/components/AddMemberForm';
import { fetchTeam } from '@/lib/actions/user';
import { Team } from '@/lib/types';
import TeamComponents from '@/components/TeamComponents';
import DeleteModal from '@/components/DeleteModal';
export default async function Team() {
  const team = await fetchTeam();

  const displayTeam =
    team?.length > 0 ? (
      team?.map((item: Team, i) => (
        <TeamComponents
          key={i}
          id={item?._id.toString()}
          imgUrl={item?.imgUrl}
          name={item?.name}
          job={item?.job}
        />
      ))
    ) : (
      <h2 className="text-center font-bold text-xl">Nobody On The Team Yet</h2>
    );
  return (
    <div className="py-[100px]  w-[90%] mx-auto">
      <DeleteModal />
      <div className="grid grid-cols-1 sm:grid-cols-2 sm:gap-x-20 gap-y-8">
        <div className="space-y-16">
          <h2 className="text-center font-bold text-xl">Add A Member</h2>
          <AddMemberForm />
        </div>
        <div className="space-y-16">
          <h2 className="text-center font-bold text-xl">All Team Members</h2>
          <div className=" max-h-[500px] place-items-center overflow-y-auto">
            {displayTeam}
          </div>
        </div>
      </div>
    </div>
  );
}
