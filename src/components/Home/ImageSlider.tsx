'use client';
import React from 'react'

function ImageSlider({setActiveTabFromImageSlider}: {setActiveTabFromImageSlider?: (tab: 'home' | 'products') => void}) {
  return (
    <div className='relative order-1 sm:order-1'>
    {(() => {
        const Slider: React.FC = () => {
            const images: string[] = [
                '/home/blueDress1.jpg',
                '/home/blueDress2.jpg',
                '/home/blueDress3.jpg',
                '/home/brownwhitedress.jpg',
                '/home/fabric.jpg',
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
            const goTo = (i: number) => setIndex(((i % images.length) + images.length) % images.length);

            React.useEffect(() => {
                clear();
                timer.current = window.setTimeout(next, delay);
                return clear;
            }, [index, next]);

            return (
                <div
                    className="relative z-1 group w-full sm:w-114 max-w-4xl mx-auto bg-white/70 rounded-2xl border border-slate-200/60 shadow-lg backdrop-blur-md"
                    onMouseEnter={clear}
                    onMouseLeave={() => {
                        clear();
                        timer.current = window.setTimeout(next, delay);
                    }}
                >
                    <div className="overflow-hidden rounded-2xl">
                        <div
                            className="flex transition-transform duration-700 ease-[cubic-bezier(.2,.8,.2,1)]"
                            style={{ transform: `translateX(-${index * 100}%)` }}
                        >
                            {images.map((src, i) => (
                                <div key={i} className="w-full shrink-0">
                                    <img
                                        src={src}
                                        alt={`Slide ${i + 1}`}
                                        className="block w-full sm:h-84 h-auto md:h-96 object-contain select-none"
                                        draggable={false}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>

                    <button
                        onClick={prev}
                        aria-label="Previous"
                        className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full bg-white/80 hover:bg-white text-gray-900 shadow p-2 backdrop-blur sm:opacity-0 group-hover:opacity-100 transition cursor-pointer"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                    </button>
                    <button
                        onClick={next}
                        aria-label="Next"
                        className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-white/80 hover:bg-white text-gray-900 shadow p-2 backdrop-blur sm:opacity-0 group-hover:opacity-100 transition cursor-pointer"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                    </button>

                    <div className="absolute bottom-12 left-0 right-0 flex justify-center gap-2">
                        {images.map((_, i) => (
                            <button
                                key={i}
                                onClick={() => goTo(i)}
                                aria-label={`Go to slide ${i + 1}`}
                                className={`h-2.5 w-2.5 rounded-full transition cursor-pointer ${
                                    i === index ? 'bg-white shadow ring-2 ring-white/60' : 'bg-white/50 hover:bg-white/80'
                                }`}
                            />
                        ))}
                        
                    </div>
                   
                </div>
            );
        };

        return <Slider />;
    })()}
     <div className="absolute bottom-1 translate-x-[-50%] left-1/2 flex justify-center gap-2 w-30">
                        <p
                            onClick={() => setActiveTabFromImageSlider?.('products')}
                            className="cursor-pointer inline-flex items-center gap-2 rounded-2xl border border-amber-200 bg-amber-50 px-3 py-2 text-sm font-medium text-amber-700 hover:bg-amber-100 hover:border-amber-300 transition"
                        >   
                            View Products
                        </p>
                    </div>
    </div>
  )
}

export default ImageSlider
