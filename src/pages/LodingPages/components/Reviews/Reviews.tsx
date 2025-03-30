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
  ];

  return (
    <div className="py-16 px-4 bg-white">
      <h2 className="text-3xl font-bold text-center text-gray-800">{t('reviews')}</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
        {reviews.map((review, index) => (
          <div 
            key={index} 
            className="flex flex-col bg-white shadow-lg rounded-lg p-6 border border-gray-200 min-h-[200px]"
          >
            <div className="flex items-center gap-4">
              <img src={review.icon} alt={review.author} className=" bg-[#CCE7D7]  rounded-full " />
              <div className="space-y-1">
                <p className="text-lg font-semibold text-gray-900">{review.author}</p>
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    i < review.rating ? 
                    <FaStar key={i} className="text-yellow-500 text-lg mx-0.5" /> : 
                    <FaRegStar key={i} className="text-gray-400 text-lg mx-0.5" />
                  ))}
                </div>
              </div>
            </div>
            <p className="text-sm text-gray-600 italic  mt-1">"{review.comment}"</p>
          </div>
        ))}
      </div>

      <div className="flex justify-center items-center gap-6 mt-10">
        <MdOutlineKeyboardArrowLeft className="text-gray-700 text-4xl bg-gray-300 rounded-full  cursor-pointer hover:text-gray-900 transition-transform hover:-translate-x-1" />
        <MdOutlineKeyboardArrowRight className="text-gray-700 text-4xl bg-gray-300 rounded-full cursor-pointer hover:text-gray-900 transition-transform hover:translate-x-1" />
      </div>
    </div>
  );
}
