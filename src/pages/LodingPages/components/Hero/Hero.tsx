import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

export default function Hero() {
    const { t } = useTranslation();
  
  return (
    <div className="relative w-full h-screen">
      <div className="absolute inset-0 bg-black/60"></div>
      <img
        src="/img/hero.jpg"
        alt="Hero"
        className="w-full h-full object-cover"
      />

      <div className="absolute inset-0 flex flex-col  justify-center  text-white px-6">
        <h1 className="text-4xl md:text-6xl font-bold leading-tight">
          {t("hero.title")}
        </h1>
        <p className="text-lg md:text-xl mt-4 max-w-md">
        {t("hero.placeholder")}
        </p>
        <Link to={'/login'} className="mt-6 w-40 p-3 bg-[#52AE77] text-white font-semibold  hover:bg-[#419a66] transition-transform transform ">
        {t("hero.button")}
        </Link>
      </div>
    </div>
  );
}
