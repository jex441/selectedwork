'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowUpRight } from 'lucide-react';
import { Arrow } from '@radix-ui/react-dropdown-menu';
import localFont from 'next/font/local';
import { useState } from 'react';
const regular = localFont({
  src: 'HKGrotesk-Medium.otf',
});
export default function page() {
  const [demo, setDemo] = useState(false);
  const [videoSrc, setVideoSrc] = useState('/template1.mov');
  return (
    <main className={`flex flex-col bg-[#E4EDDB] ${regular.className}`}>
      <header className="flex h-16 w-full items-center justify-between px-4 text-[#1F4287] lg:px-12">
        <Link href="#" className="flex items-center" prefetch={false}>
          <Image
            src="/landinglogo.png"
            alt="Selected Work"
            width={24}
            height={24}
          />
        </Link>
        <div className="flex items-center gap-6">
          <a
            href={`http${process.env.NODE_ENV === 'production' ? 's' : ''}://app.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}/sign-in`}
            className="w-20 border-2 border-[#1F4287] p-2 text-center text-sm font-medium hover:border-primary hover:text-primary"
            // prefetch={false}
          >
            Login
          </a>
          <a
            href={`http${process.env.NODE_ENV === 'production' ? 's' : ''}://app.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}/sign-up`}
            className="inline-flex w-24 items-center justify-center bg-[#1F4287] p-2 font-medium text-[#E4EDDB] shadow transition-colors hover:bg-primary"
          >
            Sign Up
          </a>
        </div>
      </header>

      <section className="flex min-h-[100vh] flex-1 flex-col-reverse items-center justify-center gap-10 text-[#1F4287] lg:flex-row lg:justify-between ">
        <div className="flex flex-col items-center justify-center space-y-4 text-center lg:ml-14 lg:items-start lg:space-y-6 lg:text-left">
          <span className="flex w-full flex-row items-center justify-center text-center lg:justify-start lg:text-left">
            <Image
              src="/landinglogo.png"
              className="mr-4"
              alt="Selected Work"
              width={35}
              height={35}
            />
            <span>
              <h1 className="text-center text-3xl font-semibold sm:text-5xl md:text-6xl lg:text-left">
                Selected Work
              </h1>
            </span>
          </span>
          <p className="md:text-xl">
            Create a professional portfolio website in minutes.
          </p>
          <div className="mt-4 flex w-full flex-row justify-center gap-6 sm:flex-row lg:justify-start lg:gap-10">
            <a
              href={`http${process.env.NODE_ENV === 'production' ? 's' : ''}://app.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}/sign-up`}
              className="inline-flex h-12 items-center justify-center bg-[#1F4287] px-4 text-lg font-medium text-[#E4EDDB] transition-colors hover:bg-primary lg:px-8 lg:text-xl"
            >
              Get Started
            </a>
            <a
              href={`http://camdenross.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}`}
              className="inline-flex h-10 items-center border-b-2 border-[#1F4287] bg-transparent px-1 text-lg font-medium transition-colors hover:border-primary hover:text-primary lg:px-2 lg:text-xl"
              target="_blank"
            >
              View Demo Site <ArrowUpRight size={26} className="ml-2" />
            </a>
          </div>
        </div>
        <div className="flex justify-end lg:m-0">
          <Image
            className=""
            src="/landinglarge.png"
            alt="Selected Work"
            width={800}
            height={500}
          />
        </div>
        {demo && (
          <div className="fade-in-simple h-22 absolute bottom-10 flex w-auto items-start justify-between rounded-2xl bg-white px-4 py-2 shadow-lg lg:left-40 lg:w-4/6">
            <div className="flex flex-col">
              <span className="lg:text-3xl">
                Watch the demo video:
                <a
                  target="_blank"
                  className="ml-5 underline"
                  href="https://youtu.be/gzs0o8G1rTg"
                >
                  https://youtu.be/gzs0o8G1rTg
                </a>
              </span>
            </div>
            <div
              className="cursor-pointer hover:text-black"
              onClick={() => setDemo(false)}
            >
              X
            </div>
          </div>
        )}
      </section>
      <section className="flex h-[100vh] flex-row items-center justify-center bg-[#393E46] p-10 text-white">
        <div className="flex w-1/3 flex-col justify-center space-y-4">
          <h2 className="text-3xl">Clean, minimalist readymade templates</h2>
          <p>
            Each of our templates was hand crafted by our design team in
            consultation with professional artists to do one thing: display real
            artwork by real artists. No tacky AI gimmicks. Just simple,
            readymade templates which let the work do the talking.
          </p>
        </div>
        <div className="mt-4 flex w-2/3 flex-col flex-col items-center justify-center gap-6 lg:gap-10">
          <span>
            <video
              src={videoSrc}
              className="h-[400px]"
              autoPlay
              loop
              muted
            ></video>
          </span>
          <div className="flex w-full flex-row items-center justify-center gap-20">
            <div className="flex flex-col gap-6">
              <button
                onClick={() => {
                  setVideoSrc('/template1.mov');
                }}
                className={`border-2 border-white bg-transparent px-4 py-2 text-lg font-medium transition-colors hover:bg-white hover:text-[#393E46] ${videoSrc === '/template1.mov' && 'bg-white text-[#393E46]'}`}
              >
                Template 1
              </button>
              <a href="https://camdenross.selectedwork.net" target="_blank">
                <div className="text-container w-[180px] border-b-2 p-4">
                  <div className="text flex justify-between">
                    View Demo Site
                    <Image
                      width={20}
                      height={20}
                      className="arrow ml-4 inline h-3 w-3"
                      alt="up arrow"
                      src="/uprightarrowwhite.png"
                    />
                  </div>
                  <span className="text-replace flex">
                    View Demo Site
                    <Image
                      width={20}
                      height={20}
                      className="arrow ml-4 inline h-3 w-3"
                      alt="up arrow"
                      src="/uprightarrowwhite.png"
                    />
                  </span>
                </div>
              </a>
            </div>
            <div className="flex flex-col gap-6">
              <button
                onClick={() => {
                  setVideoSrc('/template2.mov');
                }}
                className={`border-2 border-white bg-transparent px-4 py-2 text-lg font-medium transition-colors hover:bg-white hover:text-[#393E46] ${videoSrc === '/template2.mov' && 'bg-white text-[#393E46]'}`}
              >
                Template 2
              </button>
              <a href="https://andrewwhite.selectedwork.net" target="_blank">
                <div className="text-container w-[180px] border-b-2 p-4">
                  <div className="text flex justify-between">
                    View Demo Site
                    <Image
                      width={20}
                      height={20}
                      className="arrow ml-4 inline h-3 w-3"
                      alt="up arrow"
                      src="/uprightarrowwhite.png"
                    />
                  </div>
                  <span className="text-replace flex">
                    View Demo Site
                    <Image
                      width={20}
                      height={20}
                      className="arrow ml-4 inline h-3 w-3"
                      alt="up arrow"
                      src="/uprightarrowwhite.png"
                    />
                  </span>
                </div>
              </a>
            </div>
            <div className="flex flex-col gap-6">
              <button
                onClick={() => {
                  setVideoSrc('/template3.mov');
                }}
                className={`border-2 border-white bg-transparent px-4 py-2 text-lg font-medium transition-colors hover:bg-white hover:text-[#393E46] ${videoSrc === '/template3.mov' && 'bg-white text-[#393E46]'}`}
              >
                Template 3
              </button>
              <a href="https://janewalsh.selectedwork.net" target="_blank">
                <div className="text-container w-[180px] border-b-2 p-4">
                  <div className="text flex justify-between">
                    View Demo Site
                    <Image
                      width={20}
                      height={20}
                      className="arrow ml-4 inline h-3 w-3"
                      alt="up arrow"
                      src="/uprightarrowwhite.png"
                    />
                  </div>
                  <span className="text-replace flex">
                    View Demo Site
                    <Image
                      width={20}
                      height={20}
                      className="arrow ml-4 inline h-3 w-3"
                      alt="up arrow"
                      src="/uprightarrowwhite.png"
                    />
                  </span>
                </div>
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
