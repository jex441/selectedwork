import React from 'react';
import CVLine from './CVLine';

export default function CVSection({
  data,
  heading,
  categoryId,
}: {
  data: any;
  heading: string;
  categoryId: string;
}) {
  return (
    <section className="fade-in-up-simple mb-6 flex w-full flex-col lg:w-2/3">
      <h1 className="mb-1 uppercase text-mediumGray lg:text-lg">{heading}</h1>
      {data &&
        data[categoryId] &&
        data[categoryId].map(
          (
            experience: {
              categoryId: string | null;
              title: string | null;
              organization: string | null;
              location: string | null;
              startDate: string | null;
              endDate: string | null;
              bulletPoint1: string | null;
              bulletPoint2: string | null;
              bulletPoint3: string | null;
            },
            idx: number,
          ) => {
            return (
              <CVLine key={data[categoryId].id + idx} experience={experience} />
            );
          },
        )}
    </section>
  );
}
