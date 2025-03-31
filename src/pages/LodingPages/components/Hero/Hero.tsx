import { useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import gsap from "gsap";

export default function Hero() {
  const { t } = useTranslation();
  const titleRef = useRef(null);
  const textRef = useRef(null);
  const buttonRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(
      titleRef.current,
      { opacity: 0, y: -50 },
      { opacity: 1, y: 0, duration: 1, ease: "power3.out", delay: 0.5 }
    );

    gsap.fromTo(
      textRef.current,
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 1, ease: "power3.out", delay: 1 }
    );

    gsap.fromTo(
      buttonRef.current,
      { opacity: 0, scale: 0.8 },
      { opacity: 1, scale: 1, duration: 0.8, ease: "back.out(1.7)", delay: 1.5 }
    );
  }, []);

  return (
    <div className="relative w-full h-screen">
      <div className="absolute inset-0 bg-black/60"></div>
      <img src="/img/hero.jpg" alt="Hero" className="w-full h-full object-cover" />

      <div className="absolute inset-0 flex flex-col justify-center text-white px-6">
        <h1 ref={titleRef} className="text-4xl md:text-6xl font-bold leading-tight">
          {t("hero.title")}
        </h1>
        <p ref={textRef} className="text-lg md:text-xl mt-4 max-w-md">
          {t("hero.placeholder")}
        </p>
        <Link
          ref={buttonRef}
          to={'/login'}
          className="mt-6 w-40 p-3 bg-[#52AE77] text-white font-semibold rounded-lg border-[#000000] border-2 hover:bg-[#7ab993] transition-opacity delay-150 transform"
        >
          {t("hero.button")}
        </Link>
      </div>
    </div>
  );
}