'use client';

import React, { useState } from 'react';
import { INewsPage } from '../../../../interfaces/INewsPage';
import { INewsPost } from '../../../../interfaces/INewsPost';
import Image from 'next/image';
import InquireForm from './InquireForm';
import close from '@/public/close.png';

export default function News1({ data }: { data: INewsPage }) {
  const { imgSrc, posts, heading, subHeading, body } = data || {};
  const [inquireModalOpen, setInquireModalOpen] = useState(false);
  const [currentPost, setCurrentPost] = useState<INewsPost | null>(null);

  const inquireHandler = (post: INewsPost) => {
    setCurrentPost(post);
    setInquireModalOpen(true);
  };

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
            <h2 className="text-lg leading-9 text-darkGray">{post.heading}</h2>
            <p className="text-sm leading-6 text-mediumGray">
              {post.subHeading}
            </p>
            <div className="my-2">
              <p className="text-sm leading-6 text-mediumGray">{post.date}</p>
              <p className="text-sm leading-6 text-mediumGray">
                {post.location}
              </p>
            </div>
            <p className="my-2 w-full text-sm leading-6 text-mediumGray">
              {post.body}
            </p>
            {post.linkSrc1 && (
              <p className="text-sm leading-6 text-mediumGray">
                <a href={post.linkSrc1}>{post.linkSrc1}</a>
              </p>
            )}
            {!post.inquire && (
              <button
                onClick={() => inquireHandler(post)}
                className="my-2 border-2 px-4 py-1 text-sm leading-6 tracking-wide text-mediumGray"
              >
                Inquire
              </button>
            )}
          </div>
        </div>
      ))}
      {inquireModalOpen && (
        <div className="absolute inset-0 top-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="flex h-[600px] w-[550px] flex-col rounded-md bg-white p-4">
            <button
              onClick={() => setInquireModalOpen(false)}
              className="self-end text-sm leading-6 text-mediumGray"
            >
              <Image
                className="w-4 opacity-40 transition-all hover:opacity-100"
                src={close}
                alt={'close'}
              />
            </button>
            <div className="flex w-full flex-col">
              <div className="flex w-full flex-row p-4">
                {currentPost.imgSrc && (
                  <Image
                    src={currentPost.imgSrc}
                    alt={'News image'}
                    width={150}
                    height={150}
                  />
                )}
                <div className="flex flex-col gap-2 px-4">
                  <h2 className="leading-9 text-darkGray">
                    {currentPost?.heading}
                  </h2>
                  <p className="text-xs leading-6 text-mediumGray">
                    {currentPost?.subHeading}
                  </p>
                  <p className="text-xs leading-6 text-mediumGray">
                    {currentPost?.location}
                  </p>
                </div>
              </div>
              <div className="flex flex-1 flex-col">
                {currentPost !== null && (
                  <InquireForm subject={currentPost.heading} />
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
