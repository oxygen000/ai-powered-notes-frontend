'use client';

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { MdOutlineKeyboardArrowLeft, MdOutlineKeyboardArrowRight } from "react-icons/md";
import { FaStar, FaRegStar } from "react-icons/fa";
import { useTranslation } from "react-i18next";

export default function Reviews() {
  const { t } = useTranslation();
  const reviews = [
    {
      icon: "/img/user1.svg",
      author: "Ahmed Khaled",
      rating: 5,
      comment: "Amazing experience! This product changed my life for the better.",
    },
    {
      icon: "/img/user2.svg",
      author: "Laila Abdullah",
      rating: 4,
      comment: "Excellent service, and the support team is very helpful!",
    },
    {
      icon: "/img/user1.svg",
      author: "Mohammed Noor",
      rating: 5,
      comment: "I highly recommend it, great quality and affordable prices.",
    },
    {
      icon: "/img/user2.svg",
      author: "Sara Mahmoud",
      rating: 4,
      comment: "Very satisfied with the quality and customer service.",
    },
    {
      icon: "/img/user1.svg",
      author: "Omar Tarek",
      rating: 5,
      comment: "Fantastic product! I will definitely buy again.",
    },
    {
      icon: "/img/user2.svg",
      author: "Omar Tarek",
      rating: 5,
      comment: "Fantastic product! I will definitely buy again.",
    },
  ];

  const [startIndex, setStartIndex] = useState(0);
  const [direction, setDirection] = useState(1);

  function changeReview(dir: 1 | -1) {
    const newIndex = startIndex + dir * 3;
    if (newIndex < 0 || newIndex >= reviews.length) return;
    setDirection(dir);
    setStartIndex(newIndex);
  }

  return (
    <div className="py-16 px-4 bg-white">
      <h2 className="text-3xl font-bold text-center text-gray-800">{t("reviews")}</h2>
      <div className="flex justify-center mt-10 overflow-hidden">
        <AnimatePresence mode="popLayout" custom={direction}>
          <motion.div
            key={startIndex}
            initial={{ opacity: 0, x: direction * 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -direction * 100 }}
            transition={{ type: "spring", bounce: 0.4, duration: 0.5 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {reviews.slice(startIndex, startIndex + 3).map((review, index) => (
              <div key={index} className="flex flex-col bg-white shadow-lg rounded-lg p-6 border border-gray-200 min-h-[200px]">
                <div className="flex items-center gap-4">
                  <img src={review.icon} alt={review.author} className="bg-[#CCE7D7] rounded-full" />
                  <div className="space-y-1">
                    <p className="text-lg font-semibold text-gray-900">{review.author}</p>
                    <div className="flex">
                      {[...Array(5)].map((_, i) =>
                        i < review.rating ? (
                          <FaStar key={i} className="text-yellow-500 text-lg mx-0.5" />
                        ) : (
                          <FaRegStar key={i} className="text-gray-400 text-lg mx-0.5" />
                        )
                      )}
                    </div>
                  </div>
                </div>
                <p className="text-sm text-gray-600 italic mt-1">"{review.comment}"</p>
              </div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
      <div className="flex justify-center items-center gap-6 mt-10">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => changeReview(-1)}
          disabled={startIndex === 0}
          className="text-gray-700 text-4xl bg-gray-300 rounded-full p-2 cursor-pointer hover:text-gray-900 disabled:opacity-50"
        >
          <MdOutlineKeyboardArrowLeft />
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => changeReview(1)}
          disabled={startIndex + 3 >= reviews.length}
          className="text-gray-700 text-4xl bg-gray-300 rounded-full p-2 cursor-pointer hover:text-gray-900 disabled:opacity-50"
        >
          <MdOutlineKeyboardArrowRight />
        </motion.button>
      </div>
    </div>
  );
}