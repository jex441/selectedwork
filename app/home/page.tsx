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

      <section className="flex min-h-[60vh] items-center justify-center bg-[#EDEDED] px-6 py-12 md:h-[90vh] md:p-20">
        <div className="md:max-w-3/4 max-w-[90%] text-center text-2xl leading-[50px] md:text-5xl md:leading-[70px]">
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
      <section className="flex h-auto min-h-[100vh] flex-col items-center justify-center bg-[#393E46] p-6 text-white md:h-[100vh] md:flex-row md:p-10">
        <div className="flex w-full flex-col justify-center space-y-6 pr-0 text-center md:w-1/3 md:pr-5 md:text-left">
          <h2 className="text-2xl md:text-3xl">
            Clean, minimalist readymade templates
          </h2>
          <p className="text-sm md:text-base">
            Each of our templates was hand-crafted by our design team in
            consultation with professional artists to do one thing: display real
            artwork by real artists.
          </p>
          <p className="text-sm md:text-base">
            No tacky AI gimmicks. Just simple, readymade templates that let the
            work do the talking.
          </p>
        </div>

        <div className="flex w-full flex-col items-center justify-center gap-6 md:w-2/3 lg:gap-10">
          <span className="w-full max-w-[90%] md:max-w-full">
            <video
              src={videoSrc}
              className="my-10 h-[250px] w-full rounded-md md:my-0 md:h-[450px]"
              autoPlay
              loop
              muted
            ></video>
          </span>

          <div className="flex w-full flex-wrap items-center justify-center gap-6 md:w-2/3 md:flex-nowrap md:gap-12">
            {[1, 2, 3].map((template) => (
              <div key={template} className="flex flex-col items-center gap-2">
                <button
                  onClick={() => setVideoSrc(`/template${template}.mov`)}
                  className={`relative w-full max-w-[180px] overflow-hidden border-2 border-white bg-transparent px-6 py-2 text-lg font-medium transition-all 
              before:absolute before:bottom-0 before:left-0 before:h-0 before:w-full before:bg-white before:transition-all before:duration-300 
              hover:text-[#393E46] hover:before:h-full 
              ${videoSrc === `/template${template}.mov` ? 'bg-white text-[#393E46]' : 'text-white'}`}
                >
                  <span className="relative z-10 text-sm font-semibold uppercase">
                    Template {template}
                  </span>
                </button>
                <a
                  href={`https://template${template}.selectedwork.net`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="my-4 w-full max-w-[180px] border-b-2"
                >
                  <div className="text-container m-2 w-[160px] border-[#403A60] p-2">
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
            ))}
          </div>
        </div>
      </section>

      {/* Made for artwork  */}
      <section className="flex h-auto flex-col items-start justify-start bg-[#C7C7B0] p-6 md:min-h-[100vh] md:p-20">
        <div className="w-5/6">
          <h1 className="text-5xl font-semibold uppercase leading-tight md:text-[116px] md:leading-[116px]">
            Made for displaying artwork.
            <br /> <span className="text-white">Nothing else.</span>
          </h1>
          <div className="mt-6 w-full text-lg md:mt-12 md:text-xl">
            <p className="leading-relaxed">
              Unlike Squarespace and Wix which cater to every industry under the
              sun, SelectedWork was purpose built for one thing, and one thing
              only: displaying real, physical artwork, on the web - the right
              way.
            </p>
          </div>
        </div>
      </section>

      {/* Thumbnails */}
      <section className="flex h-auto flex-col items-center justify-center bg-[#D1CEC5] p-5 text-[#283739] md:h-[100vh] md:flex-row md:p-10">
        <div className="flex w-full flex-col justify-center space-y-4 p-5 md:w-1/3">
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
            src="/modal.mov"
            className="h-[300px] rounded-md shadow-md md:h-[450px]"
            autoPlay
            loop
            muted
          ></video>
        </div>
      </section>

      {/* Dashboard */}
      <section className="flex h-auto flex-col items-center justify-center bg-[#EBEBEB] p-5 text-[#393E46] md:h-[100vh] md:flex-row md:p-10">
        <div className="flex w-full flex-col justify-center space-y-4 p-5 md:w-1/3">
          <h2 className="text-2xl md:text-4xl">
            Intuitive dashboard for ease of use
          </h2>
          <p className="text-sm leading-loose md:text-base">
            No complicated website builders. Just upload your work, choose a
            template, and click publish. Get a custom-looking website that is as
            easy to maintain as your Instagram page.
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

      {/* Whitespace  */}
      <section className="flex h-auto flex-col items-start justify-start bg-[#C7CFBE] p-6 md:min-h-[100vh] md:p-20">
        <div className="w-4/6">
          <h1 className="text-6xl font-semibold uppercase leading-tight md:text-[116px] md:leading-[116px]">
            Just the right amount of
            <span className="text-white"> whitespace</span>
          </h1>
          <div className="mt-6 w-full text-lg leading-relaxed md:mt-12 md:text-xl">
            <p className="leading-relaxed">
              Ditch the annoying, jumbled, tile layouts, show your work in a
              clean, neat, grid, and give your work space to breathe.
            </p>
          </div>
        </div>
        <div className="my-10 flex w-full flex-row items-center justify-around">
          <div className="flex flex-col items-center justify-center gap-5">
            <span className="text-sm font-semibold uppercase tracking-wider text-gray-600">
              Before
            </span>
            <video
              src="/beforevideo.mov"
              className="h-[300px] rounded-md shadow-md md:h-[320px]"
              autoPlay
              loop
              muted
            ></video>
          </div>
          <div className="flex flex-col items-center justify-center gap-5">
            <span className="tracking-widetext-sm r font-semibold uppercase text-gray-600">
              After
            </span>
            <video
              src="/aftervideo.mov"
              className="h-[300px] rounded-md shadow-md md:h-[320px]"
              autoPlay
              loop
              muted
            ></video>
          </div>
        </div>
      </section>

      {/* Only the features you need  */}
      <section className="flex h-auto flex-col items-start justify-start bg-[#CDD5E0] p-6 md:min-h-[100vh] md:p-20">
        <div className="w-5/6">
          <h1 className="text-6xl font-semibold uppercase leading-tight md:text-[116px] md:leading-[116px]">
            Only the features you need.
            <br /> <span className="text-white">Nothing you don’t.</span>
          </h1>
          <div className="mt-6 w-full text-lg leading-relaxed md:mt-12 md:text-xl">
            <p className="leading-relaxed">
              Stop overpaying for a ton of features you don't even use.
              SelectedWork offers portfolio website templates that work, right
              out of the box.
            </p>
          </div>
        </div>

        {/* Pricing Section */}
        <section className="flex w-full flex-col items-center justify-center py-20">
          <div className="mt-10 flex flex-col gap-20 md:flex-row">
            {/* Free Tier */}
            <div className="flex h-[470px] w-[320px] max-w-md flex-col rounded-lg border-2 border-gray-600 p-10 text-center md:p-10">
              <h3 className="mb-2 bg-gray-600 p-1 text-xl font-semibold uppercase tracking-wide text-[#CDD5E0] text-gray-600">
                Hobby
              </h3>
              <p className="my-2 text-gray-500">Start Building</p>
              <h3 className="text-2xl font-semibold leading-loose text-gray-600">
                Free
              </h3>
              <ul className="mt-4 h-[150px] space-y-2 text-left text-gray-700">
                <li>All the tools you need to show your work</li>
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
            <div className="flex h-[470px] w-[320px] max-w-md flex-col  rounded-lg border-2 border-gray-600 p-10 text-center md:p-10">
              <h3 className="mb-2 bg-gray-600 p-1 text-xl font-semibold uppercase tracking-wide text-[#CDD5E0] text-gray-600">
                Pro
              </h3>
              <p className="my-2 text-gray-500">Make it your own</p>
              <h3 className="text-2xl font-semibold leading-loose text-gray-600">
                $10/month
              </h3>
              <ul className="mt-4 h-[150px] space-y-2 text-left text-gray-700">
                <li>Custom domains</li>
                <li>No branding</li>
                <li>Pause anytime</li>
                <li>Cancel anytime</li>
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

        <div className="flex w-full flex-col justify-center space-y-6 text-center md:w-1/2 md:text-left lg:p-20">
          <div className="mb-10">
            <h2 className="mb-5 text-2xl font-semibold md:text-4xl">
              Try SelectedWork today
            </h2>
            <p className="text-lg md:text-xl">
              Show your work with confidence with a professional-grade website.
            </p>
          </div>

          {/* CTA Button */}
          <a
            href={`http${process.env.NODE_ENV === 'production' ? 's' : ''}://app.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}`}
            rel="noopener noreferrer"
            className="group relative block h-[70px] w-full max-w-[420px] overflow-hidden bg-[#393E46] p-4 transition-all duration-300 md:w-[420px]"
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
      </section>
    </main>
  );
}
