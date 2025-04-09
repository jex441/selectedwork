'use client';

import { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';

import { X } from 'lucide-react';
export default function Banner() {
  const [isBannerVisible, setBannerVisible] = useState(true);

  const handleCloseBanner = () => {
    setBannerVisible(false);
  };

  return (
    <AnimatePresence>
      {isBannerVisible && (
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
          exit={{ y: 200 }}
          className="fixed bottom-0 my-5 flex w-full flex-col items-start justify-start self-center rounded-full bg-lime-300 p-4 px-10 shadow-lg lg:m-10 lg:h-[120px] lg:w-[800px] lg:text-xl"
        >
          <button
            onClick={handleCloseBanner}
            className="absolute right-10 top-5 text-gray-600 transition-all hover:text-black"
          >
            <X />
          </button>
          <h1 className="leading-loose text-gray-600 lg:text-2xl">
            Want a website like this?
          </h1>
          <p>
            Get started on
            <a href="https://selectedwork.net" className="mx-1 underline">
              SelectedWork
            </a>
            and show your work with confidence.
          </p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
