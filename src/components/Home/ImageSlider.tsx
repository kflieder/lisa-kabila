"use client";
import React from "react";
import { useLanguage } from "@/context/LanguageContext";

function ImageSlider({
  setActiveTabFromImageSlider,
}: {
  setActiveTabFromImageSlider?: (tab: "home" | "products") => void;
}) {
  const { lang, t } = useLanguage();
  return (
    <div className="relative w-full order-1 sm:order-1">
      {(() => {
        const Slider: React.FC = () => {
          const images: string[] = [
            "/home/blueDress1.jpg",
            "/home/blueDress2.jpg",
            "/home/blueDress3.jpg",
            "/home/brownwhitedress.jpg",
            "/home/fabric.jpg",
          ];

          const bgColors = [
            "bg-gradient-to-r from-rose-200/50 via-amber-200/40 to-yellow-100/50",
            "bg-gradient-to-r from-orange-200/50 via-red-200/40 to-rose-100/50",
            "bg-gradient-to-r from-lime-200/50 via-amber-100/40 to-orange-100/50",
            "bg-gradient-to-r from-indigo-200/50 via-purple-200/40 to-pink-100/50",
          ];

          const textAnimations = ["bounceUp", "bounceDown", "shake", "swing", "bounceUp"];
          const textClasses = ["text-rose-500", "text-orange-500", "text-lime-500", "text-indigo-500", "text-rose-500"];


          const textForSlides = [
            t("sliderPhrase1", lang),
            t("sliderPhrase2", lang),
            t("sliderPhrase3", lang),
            t("sliderPhrase4", lang),
            t("sliderPhrase5", lang),
          ];

          const [index, setIndex] = React.useState(0);
          const timer = React.useRef<number | null>(null);
          const delay = 5000;

          const clear = () => {
            if (timer.current) window.clearTimeout(timer.current);
            timer.current = null;
          };

          const next = React.useCallback(
            () => setIndex((i) => (i + 1) % images.length),
            [images.length]
          );
          const prev = React.useCallback(
            () => setIndex((i) => (i - 1 + images.length) % images.length),
            [images.length]
          );
          const goTo = (i: number) =>
            setIndex(((i % images.length) + images.length) % images.length);

          React.useEffect(() => {
            clear();
            timer.current = window.setTimeout(next, delay);
            return clear;
          }, [index, next]);

          return (
            <div
              className="relative w-full z-1 group mx-auto rounded-2xl border border-slate-200/60 shadow-lg backdrop-blur-md"
              onMouseEnter={clear}
              onMouseLeave={() => {
                clear();
                timer.current = window.setTimeout(next, delay);
              }}
            >
              <div className="relative w-full overflow-hidden">
                {images.map((src, i) => {
                  const isActive = i === index;
                  return (
                    <div
                      key={i}
                      className={`transition-opacity duration-700 ease-in-out w-full ${
                        bgColors[i % bgColors.length]
                      } flex justify-center items-center ${
                        isActive
                          ? "relative opacity-100"
                          : "absolute inset-0 opacity-0 pointer-events-none"
                      }`}
                    >
                    
                        <div
                          key={index}
                          className={`w-full justify-center items-center text-center text-7xl p-6 ${
                            textAnimations[i % textAnimations.length]
                          } ${textClasses[i % textClasses.length]}`}
                        >
                          {textForSlides[i]}
                        </div>
                    

                      <img
                        src={src}
                        alt={`Slide ${i + 1}`}
                        className="block w-auto max-h-[80vh] object-contain select-none"
                        draggable={false}
                      />
                    </div>
                  );
                })}
              </div>

              <button
                onClick={prev}
                aria-label="Previous"
                className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full bg-white/80 hover:bg-white text-gray-900 shadow p-2 backdrop-blur sm:opacity-0 group-hover:opacity-100 transition cursor-pointer"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
              </button>
              <button
                onClick={next}
                aria-label="Next"
                className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-white/80 hover:bg-white text-gray-900 shadow p-2 backdrop-blur sm:opacity-0 group-hover:opacity-100 transition cursor-pointer"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>

              <div className="absolute bottom-12 left-0 right-0 flex justify-center gap-2">
                {images.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => goTo(i)}
                    aria-label={`Go to slide ${i + 1}`}
                    className={`h-2.5 w-2.5 rounded-full transition cursor-pointer ${
                      i === index
                        ? "bg-white shadow ring-2 ring-white/60"
                        : "bg-white/50 hover:bg-white/80"
                    }`}
                  />
                ))}
              </div>
            </div>
          );
        };

        return <Slider />;
      })()}
      <div className="absolute z-49 bottom-1 translate-x-[-50%] left-1/2 flex justify-center gap-2 w-30">
        <p
          onClick={() => setActiveTabFromImageSlider?.("products")}
          className="cursor-pointer inline-flex items-center gap-2 rounded-2xl border border-amber-200 bg-amber-50 px-3 py-2 text-sm font-medium text-amber-700 hover:bg-amber-100 hover:border-amber-300 transition"
        >
          {t("viewProducts", lang)}
        </p>
      </div>
    </div>
  );
}

export default ImageSlider;
