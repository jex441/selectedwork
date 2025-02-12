'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowUpRight } from 'lucide-react';
import { Arrow } from '@radix-ui/react-dropdown-menu';
import localFont from 'next/font/local';
import { useState, useEffect } from 'react';
import { motion } from 'motion/react';

const regular = localFont({
  src: 'HKGrotesk-Medium.otf',
});
export default function page() {
  const [demo, setDemo] = useState(false);
  const [videoSrc, setVideoSrc] = useState('/template1.mp4');
  //
  const [scrolledWords, setScrolledWords] = useState(0);
  const text =
    'Built for working artists, SelectedWork is the simplest and most intuitive approach to launching a quality portfolio website for your work today.';

  const handleScroll = () => {
    const scrollPosition = window.scrollY;
    const windowHeight = window.innerHeight;
    const totalHeight = document.body.scrollHeight;

    // Calculate the percentage of the page scrolled
    const scrollPercentage =
      (scrollPosition / (totalHeight - windowHeight)) * 100;

    // Determine how many words to change based on scroll percentage
    const words = text.split(' '); // Split by spaces to get words
    const wordsToChange = Math.floor((scrollPercentage / 10) * words.length);

    setScrolledWords(wordsToChange);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  //
  const templates = ['camdenross', 'andrewwhite', 'janewalsh'];
  return (
    <main className={`flex flex-col bg-[#E4EDDB] ${regular.className}`}>
      <header className="flex h-16 w-full items-center justify-between px-4 text-[#403A60] lg:px-12">
        <Link href="#" className="flex items-center" prefetch={false}>
          <Image
            src="/landinglogo.png"
            alt="SelectedWork"
            width={24}
            height={24}
          />
        </Link>
        <div className="flex items-center gap-6">
          <a
            href={`http${process.env.NODE_ENV === 'production' ? 's' : ''}://app.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}`}
          >
            <button
              className={`relative overflow-hidden border-2 border-[#403A60] bg-[#E4EDDB] px-6 py-2 text-lg font-medium text-[#403A60] transition-all 
    before:absolute before:bottom-0 before:left-0 before:h-0 before:w-full before:bg-[#403A60] before:transition-all before:duration-300 hover:text-[#E4EDDB] 
    hover:before:h-full`}
            >
              <span className="relative z-10 text-sm font-semibold uppercase">
                Login
              </span>
            </button>
          </a>
          <a
            href={`http${process.env.NODE_ENV === 'production' ? 's' : ''}://app.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}/sign-up`}
          >
            <button
              className={`relative overflow-hidden border-2 border-[#403A60] bg-[#403A60] px-6 py-2 text-lg font-medium text-[#E4EDDB] transition-all 
    before:absolute before:bottom-0 before:left-0 before:h-0 before:w-full before:bg-[#E4EDDB] before:transition-all before:duration-300 hover:text-[#403A60] 
    hover:before:h-full`}
            >
              <span className="relative z-10 text-sm font-semibold uppercase">
                Sign Up
              </span>
            </button>
          </a>
        </div>
      </header>

      <section className="flex min-h-[90vh] flex-1 flex-col-reverse items-center justify-center gap-10 text-[#403A60] lg:flex-row lg:justify-between">
        <div className="flex flex-col items-center justify-center space-y-4 text-center lg:ml-14 lg:items-start lg:space-y-6 lg:text-left">
          <span className="flex w-full flex-row items-center justify-center overflow-hidden text-center lg:justify-start lg:text-left">
            <Image
              src="/landinglogo.png"
              className="mr-4"
              alt="SelectedWork"
              width={35}
              height={35}
            />
            <span>
              <h1 className="text-center text-4xl font-semibold sm:text-5xl md:text-6xl lg:text-left lg:text-5xl xl:text-6xl">
                SelectedWork
              </h1>
            </span>
          </span>
          <p className="md:text-xl">
            Create a professional portfolio website in minutes.
          </p>
          <div className="mt-4 flex w-full flex-row justify-center gap-6 sm:flex-row lg:justify-start lg:gap-10">
            <a
              href={`http${process.env.NODE_ENV === 'production' ? 's' : ''}://app.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}`}
            >
              <div
                className={`relative overflow-hidden border-2 border-[#403A60] bg-[#403A60] px-6 py-2 text-lg font-medium text-[#E4EDDB] transition-all 
        before:absolute before:bottom-0 before:left-0 before:h-0 before:w-full before:bg-[#E4EDDB] before:transition-all before:duration-300 hover:text-[#403A60] 
        hover:before:h-full`}
              >
                <span className="relative z-10 text-sm font-semibold uppercase">
                  Get Started
                </span>
              </div>
            </a>
            <a
              href={`https://camdenross.selectedwork.net`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <div className="text-container m-2 w-[160px] border-b-2 border-[#403A60] p-3">
                <div className="text md:text-md flex flex-row justify-between text-sm">
                  View Demo Site
                  <ArrowUpRight size={20} className="ml-2 inline" />
                </div>
                <span className="text-replace md:text-md flex hidden text-sm md:block">
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
            alt="SelectedWork"
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

      <section className="flex min-h-[60vh] items-center justify-center bg-[#EDEDED] px-6 py-12 md:h-[90vh] md:p-20">
        <div className="max-w-[90%] text-center text-2xl font-semibold leading-[50px] md:w-3/4 md:text-4xl md:leading-[70px]">
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
      <section className="flex min-h-[100vh] flex-col items-center justify-center bg-[#393E46] p-2 text-white md:flex-row md:p-10 md:p-6">
        <div className="flex w-full flex-col justify-center space-y-6 pr-0 text-center md:w-1/3 md:pr-5 md:text-left">
          <h2 className="text-2xl md:text-3xl">
            Clean, minimalist readymade templates
          </h2>

          <p className="text-sm md:text-base">
            Each of our templates was hand-crafted by our design team in
            consultation with professional artists to do one thing: display real
            artwork by real artists.
          </p>
          <p className="my-2 text-sm md:text-base">
            No tacky AI gimmicks. Just simple, readymade templates that let the
            work do the talking.
          </p>
        </div>

        <div className="flex w-full flex-col items-center justify-center md:w-2/3 md:gap-6 lg:gap-10">
          <span className="w-full max-w-[90%] md:max-w-full">
            <video
              src={videoSrc}
              className="my-4 h-[250px] w-full rounded-md md:my-0 md:my-10 md:h-[450px]"
              autoPlay
              loop
              muted
            ></video>
          </span>

          <div className="flex w-full items-center justify-between md:w-2/3 md:flex-nowrap md:justify-center md:gap-12">
            {[1, 2, 3].map((template) => (
              <div key={template} className="flex flex-col items-center gap-2">
                <button
                  onClick={() => setVideoSrc(`/template${template}.mp4`)}
                  className={`relative overflow-hidden border-2 border-white bg-transparent px-2 py-2 text-lg font-medium transition-all before:absolute before:bottom-0 
              before:left-0 before:h-0 before:w-full before:bg-white before:transition-all before:duration-300 hover:text-[#393E46] hover:before:h-full 
              md:max-w-[180px] md:px-6 
              ${videoSrc === `/template${template}.mp4` ? 'bg-white text-[#393E46]' : 'text-white'}`}
                >
                  <span className="relative z-10 text-sm font-semibold uppercase">
                    Template {template}
                  </span>
                </button>
                <a
                  href={`https://template${template}.selectedwork.net`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="my-4 hidden w-full max-w-[180px] border-b-2 md:block"
                >
                  <div className="text-container border-[#403A60] p-2 md:m-2 md:w-[160px]">
                    <div className="text flex flex-row justify-between">
                      View Demo Site
                      <ArrowUpRight size={20} className="ml-2 inline" />
                    </div>
                    <span className="text-replace flex">
                      View Demo Site
                      <ArrowUpRight size={20} className="ml-1 inline md:ml-2" />
                    </span>
                  </div>
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Made for artwork  */}
      <section className="flex-col items-start justify-start bg-[#C7C7B0] px-2 py-20 md:flex md:min-h-[100vh] md:p-20 md:px-6 ">
        <div className="md:w-5/6">
          {/* Desktop */}
          <ul className="hidden flex-col text-[62px] font-semibold uppercase leading-[64px] md:flex md:text-[116px] md:leading-[116px]">
            <li className="overflow-hidden">
              <motion.div
                initial={{ translateY: 110, rotateX: 180, opacity: 0 }}
                viewport={{ once: true }}
                whileInView={{ translateY: 0, rotateX: 0, opacity: 1 }}
                transition={{
                  duration: 0.8,
                  ease: [0, 0.71, 0.2, 1.01],
                }}
              >
                Made for
              </motion.div>
            </li>
            <li className="overflow-hidden">
              <motion.div
                initial={{ translateY: 110, rotateX: 180, opacity: 0 }}
                viewport={{ once: true }}
                whileInView={{ translateY: 0, rotateX: 0, opacity: 1 }}
                transition={{
                  duration: 0.8,
                  ease: [0, 0.71, 0.2, 1.01],
                  delay: 0.1,
                }}
              >
                displaying
              </motion.div>
            </li>
            <li className="overflow-hidden">
              <motion.div
                initial={{ translateY: 110, rotateX: 180, opacity: 0 }}
                viewport={{ once: true }}
                whileInView={{ translateY: 0, rotateX: 0, opacity: 1 }}
                transition={{
                  duration: 0.8,
                  ease: [0, 0.71, 0.2, 1.01],
                  delay: 0.2,
                }}
              >
                artwork.
              </motion.div>
            </li>
            <li className="overflow-hidden">
              <motion.div
                initial={{ translateY: 110, rotateX: 180, opacity: 0 }}
                viewport={{ once: true }}
                whileInView={{ translateY: 0, rotateX: 0, opacity: 1 }}
                transition={{
                  duration: 0.8,
                  ease: [0, 0.71, 0.2, 1.01],
                  delay: 0.3,
                }}
                className="text-white"
              >
                Nothing else
              </motion.div>
            </li>
          </ul>

          {/* Mobile: */}
          <ul className="flex flex-col text-[54px] font-semibold uppercase leading-[58px] md:hidden md:text-[116px] md:leading-[116px]">
            <li className="overflow-hidden">
              <motion.div
                initial={{ translateY: 50, rotateX: 180, opacity: 0 }}
                viewport={{ once: true }}
                whileInView={{ translateY: 0, rotateX: 0, opacity: 1 }}
                transition={{
                  duration: 0.8,
                  ease: [0, 0.71, 0.2, 1.01],
                }}
              >
                Made for
              </motion.div>
            </li>
            <li className="overflow-hidden">
              <motion.div
                initial={{ translateY: 50, rotateX: 180, opacity: 0 }}
                viewport={{ once: true }}
                whileInView={{ translateY: 0, rotateX: 0, opacity: 1 }}
                transition={{
                  duration: 0.8,
                  ease: [0, 0.71, 0.2, 1.01],
                  delay: 0.1,
                }}
              >
                displaying
              </motion.div>
            </li>
            <li className="overflow-hidden">
              <motion.div
                initial={{ translateY: 50, rotateX: 180, opacity: 0 }}
                viewport={{ once: true }}
                whileInView={{ translateY: 0, rotateX: 0, opacity: 1 }}
                transition={{
                  duration: 0.8,
                  ease: [0, 0.71, 0.2, 1.01],
                  delay: 0.2,
                }}
              >
                artwork.
              </motion.div>
            </li>
            <li className="overflow-hidden">
              <motion.div
                initial={{ translateY: 50, rotateX: 180, opacity: 0 }}
                viewport={{ once: true }}
                whileInView={{ translateY: 0, rotateX: 0, opacity: 1 }}
                transition={{
                  duration: 0.8,
                  ease: [0, 0.71, 0.2, 1.01],
                  delay: 0.3,
                }}
                className="text-white"
              >
                Nothing
              </motion.div>
            </li>
            <li className="overflow-hidden">
              <motion.div
                initial={{ translateY: 50, rotateX: 180, opacity: 0 }}
                viewport={{ once: true }}
                whileInView={{ translateY: 0, rotateX: 0, opacity: 1 }}
                transition={{
                  duration: 0.8,
                  ease: [0, 0.71, 0.2, 1.01],
                  delay: 0.3,
                }}
                className="text-white"
              >
                else
              </motion.div>
            </li>
          </ul>

          <div className="mt-6 w-full md:mt-12 md:text-xl">
            <motion.div
              initial={{ opacity: 0 }}
              viewport={{ once: true }}
              whileInView={{ opacity: 1 }}
              transition={{
                duration: 0.8,
                ease: [0, 0.71, 0.2, 1.01],
              }}
            >
              <p className="">
                Unlike Squarespace and Wix which cater to every industry under
                the sun, SelectedWork was purpose built for one thing, and one
                thing only: displaying real, physical artwork, on the web - the
                right way.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Thumbnails */}
      <section className="flex h-auto flex-col-reverse items-center justify-center bg-[#D1CEC5] px-5 py-10 text-[#283739] md:h-[100vh] md:flex-row md:p-10 md:py-0">
        <div className="flex w-full flex-col justify-center space-y-4 md:w-1/3 md:p-5">
          <h2 className="text-2xl md:text-4xl">Get the whole picture</h2>

          <p className="text-sm leading-loose md:text-base">
            A picture is worth a thousand words. And 5 or 6 pictures is worth a
            lot more. Add multiple images of each piece, to get a sense of its
            scale or show the details.
          </p>
          <p className="text-sm leading-loose md:text-base">
            Sculptors: show it from multiple angles.
          </p>
        </div>
        <div className="mt-4 flex w-full flex-col items-center justify-center gap-6 md:w-2/3 lg:gap-10">
          <video
            src="/modal.mp4"
            className="mb-10 max-h-[300px] rounded-md shadow-md md:my-0 md:h-auto md:max-h-[400px]"
            autoPlay
            loop
            muted
          ></video>
        </div>
      </section>

      {/* Dashboard */}
      <section className="flex h-auto flex-col-reverse items-center justify-center bg-[#EBEBEB] px-5 py-10 text-[#393E46] md:h-[100vh] md:flex-row md:p-10">
        <div className="flex w-full flex-col justify-center space-y-4 md:w-1/3 md:p-5">
          <h2 className="text-2xl md:text-4xl">Easy to use dashboard</h2>
          <p className="text-sm leading-loose md:text-base">
            No complicated website builders. Just upload your work, choose a
            template, and click publish. Get a custom-looking website that is as
            easy to maintain as your Instagram page.
          </p>
        </div>
        <div className="mt-4 flex w-full flex-col items-center justify-center gap-6 md:w-2/3 lg:gap-10">
          <video
            src="/dashboard.mp4"
            className="mb-10 max-h-[300px] rounded-md shadow-md md:my-0 md:h-auto md:max-h-[400px]"
            autoPlay
            loop
            muted
          ></video>
        </div>
      </section>

      {/* Whitespace  */}
      <section className="flex h-auto flex-col items-start justify-start bg-[#C7CFBE] px-2 py-10 md:min-h-[100vh] md:p-20 md:p-6">
        <div className="md:w-5/6">
          {/* desktop: */}
          <ul className="hidden flex-col text-[62px] font-semibold uppercase leading-[64px] md:flex md:text-[116px] md:leading-[116px]">
            <li className="flex flex-row md:overflow-hidden">
              <motion.div
                initial={{ translateY: 110, rotateX: 180, opacity: 0 }}
                viewport={{ once: true }}
                whileInView={{ translateY: 0, rotateX: 0, opacity: 1 }}
                transition={{
                  duration: 0.8,
                  ease: [0, 0.71, 0.2, 1.01],
                }}
              >
                Just the
              </motion.div>
            </li>
            <li className="flex flex-row md:overflow-hidden">
              <motion.div
                initial={{ translateY: 110, rotateX: 180, opacity: 0 }}
                viewport={{ once: true }}
                whileInView={{ translateY: 0, rotateX: 0, opacity: 1 }}
                transition={{
                  duration: 0.8,
                  delay: 0.1,
                  ease: [0, 0.71, 0.2, 1.01],
                }}
              >
                right
              </motion.div>
            </li>
            <li className="flex flex-row md:overflow-hidden">
              <motion.div
                initial={{ translateY: 110, rotateX: 180, opacity: 0 }}
                viewport={{ once: true }}
                whileInView={{ translateY: 0, rotateX: 0, opacity: 1 }}
                transition={{
                  duration: 0.8,
                  delay: 0.2,
                  ease: [0, 0.71, 0.2, 1.01],
                }}
              >
                amount of
              </motion.div>
            </li>
            <li className="flex flex-row md:overflow-hidden">
              {'whitespace'.split('').map((word, index) => (
                <motion.div
                  className="text-white"
                  key={index}
                  initial={{ translateY: 110, rotateX: 180, opacity: 0 }}
                  viewport={{ once: true }}
                  whileInView={{ translateY: 0, rotateX: 0, opacity: 1 }}
                  transition={{
                    duration: 0.4,
                    delay: index * 0.1,
                    ease: [0, 0.71, 0.2, 1.01],
                  }}
                >
                  {word}
                </motion.div>
              ))}
            </li>
          </ul>

          {/* mobile */}
          <ul className="flex flex-col text-[48px] font-semibold uppercase leading-[50px] md:flex md:hidden md:text-[116px] md:leading-[116px]">
            <li className="flex flex-row overflow-hidden">
              <motion.div
                initial={{ translateY: 30, rotateX: 180, opacity: 0 }}
                viewport={{ once: true }}
                whileInView={{ translateY: 0, rotateX: 0, opacity: 1 }}
                transition={{
                  duration: 0.8,
                  ease: [0, 0.71, 0.2, 1.01],
                }}
              >
                Just the
              </motion.div>
            </li>
            <li className="flex flex-row overflow-hidden">
              <motion.div
                initial={{ translateY: 30, rotateX: 180, opacity: 0 }}
                viewport={{ once: true }}
                whileInView={{ translateY: 0, rotateX: 0, opacity: 1 }}
                transition={{
                  duration: 0.8,
                  delay: 0.1,
                  ease: [0, 0.71, 0.2, 1.01],
                }}
              >
                right
              </motion.div>
            </li>
            <li className="flex flex-row overflow-hidden">
              <motion.div
                initial={{ translateY: 30, rotateX: 180, opacity: 0 }}
                viewport={{ once: true }}
                whileInView={{ translateY: 0, rotateX: 0, opacity: 1 }}
                transition={{
                  duration: 0.8,
                  delay: 0.2,
                  ease: [0, 0.71, 0.2, 1.01],
                }}
              >
                amount of
              </motion.div>
            </li>
            <li className="flex flex-row overflow-hidden">
              {'whitespace'.split('').map((word, index) => (
                <motion.div
                  className="text-white"
                  key={index}
                  initial={{ translateY: 30, rotateX: 180, opacity: 0 }}
                  viewport={{ once: true }}
                  whileInView={{ translateY: 0, rotateX: 0, opacity: 1 }}
                  transition={{
                    duration: 0.4,
                    delay: index * 0.1,
                    ease: [0, 0.71, 0.2, 1.01],
                  }}
                >
                  {word}
                </motion.div>
              ))}
            </li>
          </ul>

          <div className="mt-6 w-full text-lg leading-relaxed md:mt-12 md:text-xl">
            <motion.div
              initial={{ translateY: 110, rotateX: 180, opacity: 0 }}
              viewport={{ once: true }}
              whileInView={{ translateY: 0, rotateX: 0, opacity: 1 }}
              transition={{
                duration: 0.8,
                ease: [0, 0.71, 0.2, 1.01],
              }}
            >
              <p className="leading-relaxed">
                Ditch the annoying, jumbled, tile layouts. Show your work in a
                clean, neat, grid, and give each piece space to breathe.
              </p>
            </motion.div>
          </div>
        </div>
        <div className="my-10 flex w-full flex-col items-center justify-between md:my-20 md:flex-row md:gap-10">
          <div className="mb-10 flex flex-col items-center justify-center gap-5 md:mb-0">
            <span className="text-sm font-semibold uppercase tracking-wider text-gray-600">
              Before
            </span>
            <video
              src="/beforevideo.mp4"
              className="h-[250px] w-full rounded-md object-cover shadow-md md:h-[320px]"
              autoPlay
              loop
              muted
            ></video>
            <span className="w-full bg-gray-600 text-center text-sm font-semibold uppercase tracking-wider text-[#C7CFBE]">
              Squarespace
            </span>
          </div>
          <div className="mb-10 flex flex-col items-center justify-center gap-5 md:mb-0">
            <span className="text-sm font-semibold uppercase tracking-wider text-gray-600">
              After
            </span>
            <video
              src="/aftervideo.mp4"
              className="h-[250px] w-full rounded-md object-cover shadow-md md:h-[320px]"
              autoPlay
              loop
              muted
            ></video>
            <span className="w-full bg-gray-600 text-center text-sm font-semibold uppercase tracking-wider text-[#C7CFBE]">
              SelectedWork
            </span>
          </div>
        </div>
      </section>

      {/* Only the features you need  */}
      <section className="flex h-auto flex-col items-start justify-start bg-[#CDD5E0] px-2 py-10 md:min-h-[100vh] md:p-20 md:px-4 md:py-10">
        <div className="w-full md:w-5/6">
          {/* Desktop */}
          <ul className="hidden flex-col text-6xl font-semibold uppercase leading-tight md:flex md:text-[116px] md:leading-[116px]">
            <li className="flex flex-row overflow-hidden">
              <motion.div
                initial={{ translateY: 110, rotateX: 180, opacity: 0 }}
                viewport={{ once: true }}
                whileInView={{ translateY: 0, rotateX: 0, opacity: 1 }}
                transition={{
                  duration: 0.8,
                  ease: [0, 0.71, 0.2, 1.01],
                }}
              >
                Only the
              </motion.div>
            </li>
            <li className="flex flex-row overflow-hidden">
              <motion.div
                initial={{ translateY: 110, rotateX: 180, opacity: 0 }}
                viewport={{ once: true }}
                whileInView={{ translateY: 0, rotateX: 0, opacity: 1 }}
                transition={{
                  duration: 0.8,
                  ease: [0, 0.71, 0.2, 1.01],
                }}
              >
                features
              </motion.div>
            </li>
            <li className="flex flex-row overflow-hidden">
              <motion.div
                initial={{ translateY: 110, rotateX: 180, opacity: 0 }}
                viewport={{ once: true }}
                whileInView={{ translateY: 0, rotateX: 0, opacity: 1 }}
                transition={{
                  duration: 0.8,
                  ease: [0, 0.71, 0.2, 1.01],
                }}
              >
                you need.
              </motion.div>
            </li>
            <li className="flex flex-row overflow-hidden">
              <motion.div
                className="text-white"
                initial={{ translateY: 110, rotateX: 180, opacity: 0 }}
                viewport={{ once: true }}
                whileInView={{ translateY: 0, rotateX: 0, opacity: 1 }}
                transition={{
                  duration: 0.8,
                  ease: [0, 0.71, 0.2, 1.01],
                }}
              >
                Nothing you
              </motion.div>
            </li>
            <li className="flex flex-row overflow-hidden ">
              <motion.div
                className="text-white"
                initial={{ translateY: 110, rotateX: 180, opacity: 0 }}
                viewport={{ once: true }}
                whileInView={{ translateY: 0, rotateX: 0, opacity: 1 }}
                transition={{
                  duration: 0.8,
                  ease: [0, 0.71, 0.2, 1.01],
                }}
              >
                don't.
              </motion.div>
            </li>
          </ul>

          {/* Mobile */}
          <ul className="flex flex-col text-[53px] font-semibold uppercase leading-[58px] md:hidden">
            <li className="flex flex-row overflow-hidden">
              <motion.div
                initial={{ translateY: 30, rotateX: 180, opacity: 0 }}
                viewport={{ once: true }}
                whileInView={{ translateY: 0, rotateX: 0, opacity: 1 }}
                transition={{
                  duration: 0.8,
                  ease: [0, 0.71, 0.2, 1.01],
                }}
              >
                Only the
              </motion.div>
            </li>
            <li className="flex flex-row overflow-hidden">
              <motion.div
                initial={{ translateY: 30, rotateX: 180, opacity: 0 }}
                viewport={{ once: true }}
                whileInView={{ translateY: 0, rotateX: 0, opacity: 1 }}
                transition={{
                  duration: 0.8,
                  delay: 0.1,
                  ease: [0, 0.71, 0.2, 1.01],
                }}
              >
                features
              </motion.div>
            </li>
            <li className="flex flex-row overflow-hidden">
              <motion.div
                initial={{ translateY: 30, rotateX: 180, opacity: 0 }}
                viewport={{ once: true }}
                whileInView={{ translateY: 0, rotateX: 0, opacity: 1 }}
                transition={{
                  duration: 0.8,
                  delay: 0.2,
                  ease: [0, 0.71, 0.2, 1.01],
                }}
              >
                you need.
              </motion.div>
            </li>
            <li className="flex flex-row overflow-hidden">
              <motion.div
                className="text-white"
                initial={{ translateY: 30, rotateX: 180, opacity: 0 }}
                viewport={{ once: true }}
                whileInView={{ translateY: 0, rotateX: 0, opacity: 1 }}
                transition={{
                  duration: 0.8,
                  delay: 0.3,
                  ease: [0, 0.71, 0.2, 1.01],
                }}
              >
                Nothing
              </motion.div>
            </li>
            <li className="flex flex-row overflow-hidden">
              <motion.div
                className="text-white"
                initial={{ translateY: 30, rotateX: 180, opacity: 0 }}
                viewport={{ once: true }}
                whileInView={{ translateY: 0, rotateX: 0, opacity: 1 }}
                transition={{
                  duration: 0.8,
                  delay: 0.4,
                  ease: [0, 0.71, 0.2, 1.01],
                }}
              >
                you don't.
              </motion.div>
            </li>
          </ul>

          <div className="mt-6 text-lg leading-relaxed md:mt-12 md:w-2/3 md:text-xl">
            <motion.div
              initial={{ opacity: 0 }}
              viewport={{ once: true }}
              whileInView={{ opacity: 1 }}
              transition={{
                duration: 0.8,
                ease: [0, 0.71, 0.2, 1.01],
              }}
            >
              <p className="leading-relaxed">
                Stop overpaying for a ton of features you don't even use.
                SelectedWork offers what you need to show your work today.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0 }}
              viewport={{ once: true }}
              whileInView={{ opacity: 1 }}
              transition={{
                duration: 0.8,
                ease: [0, 0.71, 0.2, 1.01],
              }}
            >
              <p className="mt-10">
                Oh yeah, and no long term contracts. Just flexible
                easy-to-understand pricing.
              </p>
            </motion.div>
          </div>
        </div>

        {/* Pricing Section */}
        <section className="flex w-full flex-col items-center justify-between py-10 md:justify-center md:py-20">
          <div className="mt-10 flex flex-row justify-between gap-2 md:gap-20">
            {/* Free Tier */}
            <div className="flex w-1/2 max-w-md flex-col rounded-lg border-2 border-gray-600 p-2 text-center md:h-[470px] md:w-[320px] md:p-10 md:p-4">
              <h3 className="mb-2 bg-gray-600 p-1 text-xl font-semibold uppercase tracking-wide text-[#CDD5E0]">
                Hobby
              </h3>
              <p className="my-2 text-gray-500">Start Building</p>
              <h3 className="text-2xl font-semibold leading-loose text-gray-600">
                Free
              </h3>
              <ul className="mx-0 mt-4 h-[150px] flex-1 space-y-2 text-left text-sm text-gray-700 md:mx-4 md:text-lg">
                <li>• All the tools you need to show your work</li>
              </ul>
              <div className="mt-6 flex flex-col items-center justify-center gap-2">
                <a
                  href={`http${process.env.NODE_ENV === 'production' ? 's' : ''}://app.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}`}
                >
                  <div className="relative w-[180px] w-full cursor-pointer overflow-hidden border-2 border-gray-600 bg-transparent px-6 py-2 text-lg font-medium text-gray-600 transition-all before:absolute before:bottom-0 before:left-0 before:h-0 before:w-full before:bg-gray-600 before:text-gray-600 before:transition-all before:duration-100 hover:text-[#CDD5E0] hover:before:h-full">
                    <span className="relative z-10 text-sm font-semibold uppercase">
                      Try it out
                    </span>
                  </div>
                </a>
              </div>
            </div>

            {/* Pro Tier */}
            <div className="flex w-1/2 max-w-md flex-col rounded-lg border-2 border-gray-600 p-2 text-center md:h-[470px] md:w-[320px] md:p-10 md:p-4">
              <h3 className="mb-2 bg-gray-600 p-1 text-xl font-semibold uppercase tracking-wide text-[#CDD5E0]">
                Pro
              </h3>
              <p className="my-2 text-gray-500">Make it your own</p>
              <h3 className="text-2xl font-semibold leading-loose text-gray-600">
                $10/month
              </h3>
              <ul className="mx-0 mt-4 h-[150px] flex-1 space-y-2 text-left text-sm text-gray-700 md:mx-4 md:text-lg">
                <li>• Custom domains</li>
                <li>• No branding</li>
                <li>• Pause anytime</li>
                <li>• Cancel anytime</li>
              </ul>
              <div className="mt-6 flex flex-col items-center justify-center gap-2">
                <a
                  href={`http${process.env.NODE_ENV === 'production' ? 's' : ''}://app.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}`}
                >
                  <div className="relative w-[180px] w-full cursor-pointer overflow-hidden border-2 border-gray-600 bg-transparent px-6 py-2 text-lg font-medium text-gray-600 transition-all before:absolute before:bottom-0 before:left-0 before:h-0 before:w-full before:bg-gray-600 before:text-gray-600 before:transition-all before:duration-100 hover:text-[#CDD5E0] hover:before:h-full">
                    <span className="relative z-10 text-sm font-semibold uppercase">
                      Go Pro
                    </span>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </section>
      </section>

      <section className="flex h-auto flex-col items-center justify-between bg-[#CDCACE] py-8 text-[#393E46] md:h-[100vh] md:flex-row md:py-10">
        <div className="flex w-full flex-col items-center justify-center md:w-1/2">
          <Image
            src="/screenshot1.png"
            width={900}
            height={900}
            alt="mobile"
            className="h-auto max-w-full"
          />
        </div>

        <div className="my-10 flex w-full flex-col justify-center space-y-6 text-center md:w-1/2 md:text-left lg:my-0 lg:p-20">
          <div className="mb-10">
            <h2 className="mb-5 text-2xl font-semibold md:text-4xl">
              Try SelectedWork today
            </h2>
            <p className="text-lg md:text-xl">
              Show your work with confidence with a professional-grade website.
            </p>
          </div>

          {/* CTA Button */}
          <div className="flex w-full justify-center p-2 md:p-0">
            <a
              href={`http${process.env.NODE_ENV === 'production' ? 's' : ''}://app.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}`}
              rel="noopener noreferrer"
              className="group relative block h-[70px] w-full overflow-hidden bg-[#393E46] p-4 transition-all duration-300"
            >
              {/* Default state */}
              <div className="absolute inset-0 flex items-center justify-center text-lg font-semibold text-white transition-transform duration-300 group-hover:-translate-y-full">
                Let's Go
                <Image
                  width={30}
                  height={20}
                  className="ml-4 transition-opacity duration-300 group-hover:opacity-0"
                  alt="right arrow"
                  src="/rightarrowwhite.png"
                />
              </div>

              {/* Hover state */}
              <div className="absolute inset-0 flex translate-y-full items-center justify-center bg-white text-lg font-semibold text-black transition-transform duration-300 group-hover:translate-y-0">
                Let's Go
                <Image
                  width={30}
                  height={20}
                  className="ml-4 transition-opacity duration-300 group-hover:opacity-100"
                  alt="right arrow"
                  src="/rightarrowdark.png"
                />
              </div>
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
