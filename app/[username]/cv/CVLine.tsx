import React from 'react';

export default function CVSection({
  experience,
}: {
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
  };
}) {
  return (
    <section className="my-2 w-full">
      <div className="grid-cols grid w-full grid-cols-12 justify-between gap-3">
        <span className="col-span-4 overflow-hidden text-sm italic">
          {experience.title}
        </span>
        <span className="col-span-4 overflow-hidden text-sm">
          {experience.organization}
        </span>
        <span className="col-span-2 overflow-hidden text-sm">
          {experience.location}
        </span>
        <span className="col-span-2 overflow-hidden text-sm">
          {experience.startDate}
          {experience.endDate && ` - ${experience.endDate}`}
        </span>
      </div>
      <div className="ml-5 flex w-full flex-col text-sm">
        {experience.bulletPoint1 && <span>· {experience.bulletPoint1}</span>}
        {experience.bulletPoint2 && <span>· {experience.bulletPoint2}</span>}
        {experience.bulletPoint3 && <span>· {experience.bulletPoint3}</span>}
      </div>
    </section>
  );
}
