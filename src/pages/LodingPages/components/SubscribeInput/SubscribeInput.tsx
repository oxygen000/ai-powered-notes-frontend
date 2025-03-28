import { useTranslation } from "react-i18next";
import { MdEmail } from "react-icons/md";

export default function SubscribeInput() {
      const { t } = useTranslation();
  return (
    <div className="flex flex-col items-center mt-6 w-full px-4">
      <p className="text-gray-600 mb-2 text-lg">{t("subscribe.title")}</p>

      <div className="flex items-center w-full max-w-md gap-2">
        <div className="relative flex-1">
          <MdEmail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 text-xl" />
          <input
            type="email"
            placeholder={t("subscribe.placeholder")}
            className="pl-10 pr-4 py-3 w-full  rounded-md bg-gray-300 text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#52AE77]"
          />
        </div>

        <button className="bg-[#52AE77] px-5 py-3 rounded-md text-white font-medium hover:bg-[#419a66] transition">
            {t("subscribe.button")}
        </button>
      </div>
    </div>
  );
}
