import * as motion from "motion/react-client";
import type { Variants } from "motion/react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { BsArrowLeft } from "react-icons/bs";

export default function Features() {
    const { t } = useTranslation();

    const features = [
        {
            icon: "/img/features1.svg",
            title: t("features.feature1.title"),
            sample: t("features.feature1.sample"),
            description: t("features.feature1.description"),
        },
        {
            icon: "/img/features2.svg",
            title: t("features.feature2.title"),
            sample: t("features.feature2.sample"),
            description: t("features.feature2.description"),
        },
        {
            icon: "/img/features3.svg",
            title: t("features.feature3.title"),
            sample: t("features.feature3.sample"),
            description: t("features.feature3.description"),
        },
    ];

    return (
        <div className="py-20 px-6 bg-white">
            <h2 className="text-4xl font-bold text-center text-gray-800">
                {t("features.title")}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
                {features.map((feature, index) => (
                    <motion.div
                        key={index}
                        className="flex flex-col justify-between h-[350px] bg-white shadow-lg rounded-xl p-6 border border-gray-200"
                        initial="offscreen"
                        whileInView="onscreen"
                        viewport={{ amount: 0.5 }}
                        variants={cardVariants}
                    >
                        <div className="flex justify-center items-center">
                            <img src={feature.icon} alt={feature.title} className="w-12 h-12" />
                        </div>

                        <div>
                            <h3 className="text-2xl font-semibold text-gray-900">
                                {feature.title}
                            </h3>
                            <p className="text-md mt-2 text-gray-600">{feature.sample}</p>
                            <p className="text-sm mt-2 text-gray-500">{feature.description}</p>
                        </div>

                        <motion.div
                            className="mt-6 flex bg-gray-200 rounded-full p-2 justify-center w-10 cursor-pointer"
                            whileHover={{ x: -8 }}
                        >
                            <BsArrowLeft className="text-[#32bb68] text-2xl" />
                        </motion.div>
                    </motion.div>
                ))}
            </div>

            <div className="flex justify-center mt-12">
                <Link
                    to="/login"
                    className="w-40 text-center p-3 bg-[#52AE77] text-white font-semibold rounded-lg border-[#000000] border-2 hover:bg-[#7ab993] transition-all duration-300 shadow-md"
                >
                    {t("features.button")}
                </Link>
            </div>
        </div>
    );
}

const cardVariants: Variants = {
    offscreen: {
        opacity: 0,
        y: 50,
    },
    onscreen: {
        opacity: 1,
        y: 0,
        transition: {
            type: "spring",
            bounce: 0.3,
            duration: 0.8,
        },
    },
};