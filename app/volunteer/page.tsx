import VolunteerComponent from '@/components/VolunteerComponent';
import { fetchVolunteers } from '@/lib/actions/user';
import { VolunteerType } from '@/lib/types';
import { cn } from '@/lib/utils';
import React from 'react';
import moment from 'moment-timezone';
import DeleteModal from '@/components/DeleteModal';

type Props = {};

const page = async (props: Props) => {
  const volunteer = await fetchVolunteers();

  const displayVolunteers =
    volunteer?.length > 0 ? (
      volunteer?.map((item: VolunteerType, i) => {
        const utcMoment = moment.utc(item?.dob);
        const date = utcMoment.tz('Africa/Lagos').format('DD/MM/YYYY');
        return (
          <VolunteerComponent
            key={i}
            email={item?.email}
            firstName={item?.firstName}
            lastName={item?.lastName}
            phoneNumber={item?.phoneNumber}
            dob={date}
            address={item?.address}
            skill={item?.skill}
            country={item?.country}
            reason={item?.reason}
            id={item?._id.toString()}
          />
        );
      })
    ) : (
      <h2 className="text-center w-full font-bold text-xl">
        No Volunteers Yet
      </h2>
    );
  return (
    <div className="py-[100px]  w-[90%] mx-auto">
      <DeleteModal />
      <h1 className="text-center font-bold text-xl">Volunteers</h1>
      <div
        className={cn(
          volunteer?.length <= 0
            ? 'mt-20'
            : 'grid mt-20 grid-cols-1 sm:grid-cols-2 sm:gap-x-20 gap-y-8'
        )}
      >
        {displayVolunteers}
      </div>
    </div>
  );
};

export default page;
