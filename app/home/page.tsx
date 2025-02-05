'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowUpRight } from 'lucide-react';
import { Arrow } from '@radix-ui/react-dropdown-menu';
import localFont from 'next/font/local';
import { useState, useEffect } from 'react';
const regular = localFont({
  src: 'HKGrotesk-Medium.otf',
});
export default function page() {
  const [demo, setDemo] = useState(false);
  const [videoSrc, setVideoSrc] = useState('/template1.mov');
  //
  const [scrolledWords, setScrolledWords] = useState(0);
  const text =
    'Built for working artists, Selected Work is the simplest and most intuitive approach to creating your portfolio website and show your work in the best possible light.';

  const handleScroll = () => {
    const scrollPosition = window.scrollY;
    const windowHeight = window.innerHeight;
    const totalHeight = document.body.scrollHeight;

    // Calculate the percentage of the page scrolled
    const scrollPercentage =
      (scrollPosition / (totalHeight - windowHeight)) * 100;

    // Determine how many words to change based on scroll percentage
    const words = text.split(' '); // Split by spaces to get words
    const wordsToChange = Math.floor((scrollPercentage / 20) * words.length);

    setScrolledWords(wordsToChange);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  //
  return (
    <main className={`flex flex-col bg-[#E4EDDB] ${regular.className}`}>
      <header className="flex h-16 w-full items-center justify-between px-4 text-[#403A60] lg:px-12">
        <Link href="#" className="flex items-center" prefetch={false}>
          <Image
            src="/landinglogo.png"
            alt="Selected Work"
            width={24}
            height={24}
          />
        </Link>
        <div className="flex items-center gap-6">
          <button
            className={`relative overflow-hidden border-2 border-[#403A60] bg-[#E4EDDB] px-6 py-2 text-lg font-medium text-[#403A60] transition-all 
    before:absolute before:bottom-0 before:left-0 before:h-0 before:w-full before:bg-[#403A60] before:transition-all before:duration-300 hover:text-[#E4EDDB] 
    hover:before:h-full`}
          >
            <span className="relative z-10 text-sm font-semibold uppercase">
              Login
            </span>
          </button>
          <button
            className={`relative overflow-hidden border-2 border-[#403A60] bg-[#403A60] px-6 py-2 text-lg font-medium text-[#E4EDDB] transition-all 
    before:absolute before:bottom-0 before:left-0 before:h-0 before:w-full before:bg-[#E4EDDB] before:transition-all before:duration-300 hover:text-[#403A60] 
    hover:before:h-full`}
          >
            <span className="relative z-10 text-sm font-semibold uppercase">
              Sign Up
            </span>
          </button>
        </div>
      </header>

      <section className="flex min-h-[90vh] flex-1 flex-col-reverse items-center justify-center gap-10 text-[#403A60] lg:flex-row lg:justify-between ">
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
            <button
              className={`relative overflow-hidden border-2 border-[#403A60] bg-[#403A60] px-6 py-2 text-lg font-medium text-[#E4EDDB] transition-all 
    before:absolute before:bottom-0 before:left-0 before:h-0 before:w-full before:bg-[#E4EDDB] before:transition-all before:duration-300 hover:text-[#403A60] 
    hover:before:h-full`}
            >
              <span className="relative z-10 text-sm font-semibold uppercase">
                Get Started
              </span>
            </button>
            <a
              href={`https://camdenross.selectedwork.net`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <div className="text-container m-2 w-[160px] border-b-2 border-[#403A60] p-4">
                <div className="text flex flex-row justify-between">
                  View Demo Site
                  <ArrowUpRight size={20} className="ml-2 inline" />
                </div>
                <span className="text-replace flex">
                  View Demo Site
                  <ArrowUpRight size={20} className="ml-2 inline" />
                </span>
              </div>
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
          <div className="fade-in-simple h-22 absolute bottom-10 flex w-auto items-start justify-between rounded-2xl bg-white px-6 py-2 shadow-lg lg:left-40 lg:w-4/6">
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

      <section className="flex h-[90vh] items-center justify-center bg-[#EDEDED] p-20">
        <div className="w-3/4 text-center text-4xl leading-[70px]">
          {text.split(' ').map((word, index) => (
            <span
              key={index}
              className={`word ${index < scrolledWords ? 'text-[#393E46]' : 'text-[#AEAEAE]'}`}
            >
              {word}{' '}
            </span>
          ))}
        </div>
      </section>

      {/* Templates */}
      <section className="flex h-auto min-h-[100vh] flex-col items-center justify-center bg-[#393E46] p-5 text-white md:h-[100vh] md:flex-row md:p-10">
        <div className="flex w-full flex-col justify-center space-y-4 pr-5 md:w-1/3">
          <h2 className="text-2xl md:text-3xl">
            Clean, minimalist readymade templates
          </h2>
          <p className="text-sm md:text-base">
            Each of our templates was hand crafted by our design team in
            consultation with professional artists to do one thing: display real
            artwork by real artists. No tacky AI gimmicks. Just simple,
            readymade templates which let the work do the talking.
          </p>
        </div>
        <div className="flex w-full flex-col items-center justify-center gap-6 md:w-2/3 lg:gap-10">
          <span>
            <video
              src={videoSrc}
              className="h-[300px] w-full rounded-md md:h-[450px]"
              autoPlay
              loop
              muted
            ></video>
          </span>
          <div className="flex w-2/3 flex-row items-center justify-between gap-6 md:gap-12">
            {/** Template Buttons and Links */}
            {[1, 2, 3].map((template) => (
              <div key={template} className="flex flex-col items-center gap-2">
                <button
                  onClick={() => {
                    setVideoSrc(`/template${template}.mov`);
                  }}
                  className={`relative overflow-hidden border-2 border-white bg-transparent px-6 py-2 text-lg font-medium transition-all 
    before:absolute before:bottom-0 before:left-0 before:h-0 before:w-full before:bg-white before:transition-all before:duration-300 hover:text-[#393E46] 
    hover:before:h-full ${videoSrc === `/template${template}.mov` ? 'bg-white text-[#393E46]' : 'text-white'}`}
                >
                  <span className="relative z-10 text-sm font-semibold uppercase">
                    Template {template}
                  </span>
                </button>
                <a
                  href={`https://template${template}.selectedwork.net`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <div className="text-container mt-4 w-[160px] border-b-2 p-4">
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
            ))}
          </div>
        </div>
      </section>

      {/* Only the features you need  */}
      <section className="flex h-auto flex-col items-start justify-start bg-[#DDDDC7] p-5 md:min-h-[100vh] md:p-20">
        <h1 className="text-[128px] font-semibold leading-[140px]">
          Only the features you need. Nothing you don’t.
        </h1>
        <div className="mt-10 w-full">
          <p className="text-2xl leading-loose">
            No complicated website builders. Just upload your work, choose a
            template, and click publish.
          </p>
          <p className="my-5 text-2xl leading-loose">
            Get a custom looking website that is as easy to maintain as your
            Instagram page.
          </p>
        </div>
      </section>

      <section className="flex h-auto flex-col items-center justify-center bg-[#D1CEC5] p-5 text-[#283739] md:h-[100vh] md:flex-row md:p-10">
        <div className="flex w-full flex-col justify-center space-y-4 p-5 md:w-1/3">
          <h2 className="text-2xl md:text-4xl">Get the whole picture</h2>
          <p className="text-sm leading-loose md:text-base">
            A picture is worth a thousand words. And 5 or 6 pictures is worth a
            lot more. Add multiple images of each piece, to get a sense of its
            scale or show the details. Sculptors: show it from multiple angles.
          </p>
          <p className="text-sm leading-loose md:text-base">
            Sculptors: show it from multiple angles.
          </p>
        </div>
        <div className="mt-4 flex w-full flex-col items-center justify-center gap-6 md:w-2/3 lg:gap-10">
          <video
            src="/modal.mov"
            className="h-[300px] rounded-md shadow-md md:h-[450px]"
            autoPlay
            loop
            muted
          ></video>
        </div>
      </section>

      <section className="flex h-auto flex-col items-center justify-center bg-[#EBEBEB] p-5 text-[#393E46] md:h-[100vh] md:flex-row md:p-10">
        <div className="flex w-full flex-col justify-center space-y-4 p-5 md:w-1/3">
          <h2 className="text-2xl md:text-4xl">
            Intuitive dashboard for ease of use
          </h2>
          <p className="text-sm leading-loose md:text-base">
            With a simple, easy to use dashboard, launch your portfolio website
            on SelectedWork in minutes, not days or weeks, without any web
            design or coding knowledge needed. Updating it is as easy as posting
            on Instagram.
          </p>
          <p className="text-sm leading-loose md:text-base">
            Updating it is as easy as posting on Instagram.
          </p>
        </div>
        <div className="mt-4 flex w-full flex-col items-center justify-center gap-6 md:w-2/3 lg:gap-10">
          <video
            src="/dashboard.mov"
            className="h-[300px] rounded-md shadow-md md:h-[450px]"
            autoPlay
            loop
            muted
          ></video>
        </div>
      </section>

      <section className="flex h-auto flex-col items-center justify-between bg-[#CDCACE] py-5 text-[#393E46]  md:h-[100vh] md:flex-row md:py-10">
        <div className="flex w-full flex-col items-center justify-center md:w-1/2">
          <Image src="/screenshot1.png" width={900} height={900} alt="mobile" />
        </div>
        <div className="flex w-full flex-col justify-center space-y-4 md:w-1/2 lg:p-20">
          <div className="mb-10">
            <h2 className="mb-5 text-2xl font-semibold md:text-4xl">
              Try SelectedWork today
            </h2>
            <p>
              Show your work with confidence with a professional grade website.
            </p>
          </div>
          {/* Content */}
          <a
            href={`http${process.env.NODE_ENV === 'production' ? 's' : ''}://app.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}`}
            rel="noopener noreferrer"
            className="group relative block h-[80px] w-[420px] overflow-hidden bg-[#393E46] p-4 transition-all duration-100"
          >
            {/* Default state (Dark background, white text) */}
            <div className="absolute inset-0 flex items-center justify-center text-xl font-semibold text-white transition-transform duration-300 group-hover:-translate-y-full">
              Let's Go
              <Image
                width={30}
                height={20}
                className="ml-4 transition-opacity duration-300 group-hover:opacity-0"
                alt="up arrow"
                src="/rightarrowwhite.png"
              />
            </div>

            {/* Hover state (White background, dark text) */}
            <div className="absolute inset-0 flex translate-y-full items-center justify-center bg-white p-4 text-xl font-semibold text-black transition-transform duration-300 group-hover:translate-y-0">
              Let's Go
              <Image
                width={30}
                height={20}
                className="ml-4 transition-opacity duration-300 group-hover:opacity-100"
                alt="up arrow"
                src="/rightarrowdark.png"
              />
            </div>
          </a>
        </div>
      </section>
    </main>
  );
}
