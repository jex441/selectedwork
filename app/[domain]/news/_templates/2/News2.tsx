import React from 'react';
import { INewsPage } from '../../../../interfaces/INewsPage';
import Image from 'next/image';

export default function News1({ data }: { data: INewsPage }) {
  const { imgSrc, posts, heading, subHeading, body } = data || {};

  return (
    <main className="mb-20 flex w-full flex-col items-start justify-center px-4 lg:flex-row lg:gap-14 lg:px-20 lg:pt-10">
      {posts.map((post) => (
        <div
          key={post.id}
          className="my-2 flex w-full flex-col items-start justify-start gap-4 lg:flex-row lg:gap-10"
        >
          <div>
            {post.imgSrc && (
              <Image
                src={post.imgSrc}
                alt={'News image'}
                width={400}
                height={400}
              />
            )}
          </div>
          <div className="flex-1 gap-4">
            <div className="flex w-full flex-row items-center justify-between">
              <span>
                <h2 className="text-lg leading-9 text-darkGray">
                  {post.heading}
                </h2>
              </span>
              <span>
                <p className="text-sm leading-6 text-mediumGray">{post.date}</p>
              </span>
            </div>
            <p className="text-sm leading-6 text-mediumGray">
              {post.subHeading}
            </p>
            <p className="text-sm leading-6 text-mediumGray">{post.location}</p>
            <p className="my-2 w-full text-sm leading-6 text-mediumGray lg:w-3/4">
              {post.body}
            </p>
            {post.linkSrc1 && (
              <p className="text-sm leading-6 text-mediumGray">
                <a href={post.linkSrc1}>{post.linkSrc1}</a>
              </p>
            )}
          </div>
        </div>
      ))}
    </main>
  );
}
