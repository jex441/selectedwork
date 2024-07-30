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
    <section className="mb-6 flex w-full flex-col lg:w-3/4">
      <h1 className="mb-2 text-xl uppercase text-gray-500">{heading}</h1>
      {data &&
        data[categoryId] &&
        data[categoryId].map(
          (experience: {
            categoryId: string | null;
            title: string | null;
            organization: string | null;
            location: string | null;
            startDate: string | null;
            endDate: string | null;
            bulletPoint1: string | null;
            bulletPoint2: string | null;
            bulletPoint3: string | null;
          }) => {
            return <CVLine experience={experience} />;
          },
        )}
    </section>
  );
}
