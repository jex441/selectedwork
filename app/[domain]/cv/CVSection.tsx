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
    <section className="mb-6 flex w-full flex-col">
      <h1 className="text-lightGray mb-1 uppercase lg:text-lg">{heading}</h1>
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
            return <CVLine key={data[categoryId].id} experience={experience} />;
          },
        )}
    </section>
  );
}
