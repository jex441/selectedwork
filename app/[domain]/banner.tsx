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
          className="fixed bottom-0 my-5 flex w-full flex-col items-start justify-start self-center rounded-full bg-lime-300 px-6 py-1 text-sm shadow-lg lg:m-10 lg:h-[120px] lg:w-[800px] lg:px-10 lg:py-5 lg:text-xl"
        >
          <button
            onClick={handleCloseBanner}
            className="absolute right-5 top-2 text-gray-600 transition-all hover:text-black lg:right-10 lg:top-5"
          >
            <X height={20} width={20} />
          </button>
          <h1 className="lg:mb-2 lg:text-2xl">Want a website like this?</h1>
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
