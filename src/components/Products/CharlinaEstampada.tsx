import React from "react";

function CharlinaEstampada() {
  const charlinas = [
    {
      id: 1,
      name: "White Scarf",
      description:
        "A beautiful white scarf",
      imageUrls: ["/CharlinaEstampada/1.JPG"],
    },
    {
      id: 2,
      name: "Light Blue Scarf with brown pattern",
      description:
        "A vibrant light blue scarf with a brown pattern.",
      imageUrls: ["/CharlinaEstampada/2.JPG"],
    },
    {
      id: 3,
      name: "Brown Scarf",
      description: "A beautiful brown scarf.",
      imageUrls: ["/CharlinaEstampada/3.JPG"],
    },
    {
      id: 4,
      name: "Purple Scarf",
      description: "A stylish purple scarf.",
      imageUrls: ["/CharlinaEstampada/4.JPG"],
    },
    {
      id: 5,
      name: "Vibrant Yellow Scarf",
      description:
        "A beautiful vibrant yellow scarf.",
      imageUrls: ["/CharlinaEstampada/5.JPG"],
    },
    {
      id: 6,
      name: "Purple Scarf",
      description: "A stylish purple scarf.",
      imageUrls: ["/CharlinaEstampada/6.JPG"],
    },
    {
      id: 7,
      name: "White Scarf with brown pattern",
      description: "A lovely white scarf with brown patterns.",
      imageUrls: ["/CharlinaEstampada/7.JPG"],
    },
    {
      id: 8,
      name: "Blue Scarf with light brown pattern",
      description: "A chic blue scarf with light brown patterns.",
      imageUrls: ["/CharlinaEstampada/8.JPG"],
    },
    {
      id: 9,
      name: "Black Scarf",
      description: "A stylish black scarf.",
      imageUrls: ["/CharlinaEstampada/9.JPG"],
    },
    {
      id: 10,
      name: "Blue Scarf with light brown pattern",
      description: "A stylish blue scarf with light brown patterns.",
      imageUrls: ["/CharlinaEstampada/10.JPG"],
    },
    {
      id: 11,
      name: "Brown Scarf",
      description: "A stylish brown scarf.",
      imageUrls: ["/CharlinaEstampada/11.JPG"],
    },
    {
        id: 12,
        name: "Gray Scarf with light brown pattern",
        description: "A stylish gray scarf with light brown patterns.",
        imageUrls: ["/CharlinaEstampada/12.JPG", "/CharlinaEstampada/13.JPG"],
    },
    {
        id: 13,
        name: "Beautiful beige scarf",
        description: "A stylish beige scarf.",
        imageUrls: ["/CharlinaEstampada/14.JPG"],
    },
    {
        id: 14,
        name: "Vibrant Pink Scarf",
        description: "A stylish vibrant pink scarf.",
        imageUrls: ["/CharlinaEstampada/15.JPG"],
    },
    {
        id: 15,
        name: "Vibrant Blue Scarf",
        description: "A stylish vibrant blue scarf.",
        imageUrls: ["/CharlinaEstampada/16.JPG"],
    },
    {
        id: 16,
        name: "Vibrant Green Scarf",
        description: "A stylish vibrant green scarf.",
        imageUrls: ["/CharlinaEstampada/17.JPG"],
    },
    {
        id: 17,
        name: "Light Brown Scarf",
        description: "A stylish light brown scarf with intricate patterns.",
        imageUrls: ["/CharlinaEstampada/18.JPG"],
    },
    {
        id: 18,
        name: "Blue scarf with light brown pattern",
        description: "A stylish blue scarf with light brown patterns.",
        imageUrls: ["/CharlinaEstampada/19.JPG"],
    }
  ];

  const charlinaPrice = 250.0;

  function scrollNext(listId: string, direction: "left" | "right") {
    const list = document.getElementById(listId);
    if (!list) return;

    const children = Array.from(list.children) as HTMLElement[];
    if (!children.length) return;

    // find the currently most visible item
    const containerCenter = list.scrollLeft + list.clientWidth / 2;
    let closestIndex = 0;
    let closestDistance = Infinity;

    children.forEach((child, i) => {
      const childCenter = child.offsetLeft + child.clientWidth / 2;
      const distance = Math.abs(containerCenter - childCenter);
      if (distance < closestDistance) {
        closestDistance = distance;
        closestIndex = i;
      }
    });

    // move to next or previous
    let targetIndex =
      direction === "right"
        ? Math.min(children.length - 1, closestIndex + 1)
        : Math.max(0, closestIndex - 1);

    const target = children[targetIndex];
    const scrollTo =
      target.offsetLeft - list.clientWidth / 2 + target.clientWidth / 2;

    list.scrollTo({ left: scrollTo, behavior: "smooth" });
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      <style>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>

      <h1 className="text-3xl font-semibold text-gray-900 mb-6">Scarves</h1>

      <div className="relative">
        <ul
          id="charlinas-list"
          className="flex overflow-x-auto no-scrollbar snap-x snap-mandatory scroll-smooth gap-6 pb-4"
        >
          {charlinas.map((charlina) => (
            <li
              key={charlina.id}
              className="snap-center flex-none w-full md:w-1/3 lg:w-1/5"
            >
              <div className="bg-white rounded-xl shadow ring-1 ring-gray-100 hover:shadow-md transition-shadow h-full flex flex-col justify-between">
                <div className="aspect-[4/5] w-full overflow-hidden rounded-t-xl bg-gray-100">
                  {charlina.imageUrls.length > 1 ? (
                    <div className="relative h-full w-full">
                      <div
                        id={`charlina-carousel-${charlina.id}`}
                        className="h-full w-full overflow-x-auto overflow-y-hidden no-scrollbar snap-x snap-mandatory scroll-smooth"
                      >
                        <div className="flex h-full">
                          {charlina.imageUrls.map((url, idx) => (
                            <img
                              key={idx}
                              src={url}
                              alt={`${charlina.name} ${idx + 1}`}
                              className="h-full w-full flex-none object-contain snap-center"
                              loading="lazy"
                            />
                          ))}
                        </div>
                      </div>

                      <button
                        type="button"
                        aria-label="Previous image"
                        className="absolute bottom-2 left-[40%] sm:left-[24%] z-10 rounded-full sm:bg-white/80 bg-white sm:hover:bg-white shadow p-2 w-6 h-6 flex items-center justify-center cursor-pointer"
                        onClick={() => {
                          const carousel = document.getElementById(
                            `charlina-carousel-${charlina.id}`
                          );
                          if (carousel) {
                            carousel.scrollBy({
                              left: -carousel.clientWidth,
                              behavior: "smooth",
                            });
                          }
                        }}
                      >
                        ‹
                      </button>
                      <button
                        type="button"
                        aria-label="Next image"
                        className="absolute bottom-2 right-[40%] sm:right-[25%] z-10 rounded-full sm:bg-white/80 bg-white sm:hover:bg-white shadow p-2 w-6 h-6 flex items-center justify-center cursor-pointer"
                        onClick={() => {
                          const carousel = document.getElementById(
                            `charlina-carousel-${charlina.id}`
                          );
                          if (carousel) {
                            carousel.scrollBy({
                              left: carousel.clientWidth,
                              behavior: "smooth",
                            });
                          }
                        }}
                      >
                        ›
                      </button>
                    </div>
                  ) : (
                    <img
                      src={charlina.imageUrls[0]}
                      alt={charlina.name}
                      className="h-full w-full object-contain"
                      loading="lazy"
                    />
                  )}
                </div>

                <div className="p-4 flex flex-col justify-between flex-grow">
                  <h2 className="text-lg font-medium text-gray-900 truncate">
                    {charlina.name}
                  </h2>
                  <p className="mt-1 text-sm text-gray-600">
                    {charlina.description}
                  </p>
                  <p className="mt-3 text-base font-semibold text-gray-900">
                    Price: ${charlinaPrice.toFixed(2)}
                  </p>
                </div>
              </div>
            </li>
          ))}
        </ul>

        <button
          type="button"
          aria-label="Scroll left"
          className="h-34 absolute top-40 sm:top-20 left-0 z-20 rounded-full bg-white/90 hover:bg-white shadow p-2 cursor-pointer"
          onClick={() => scrollNext("charlinas-list", "left")}
        >
          ‹
        </button>
        <button
          type="button"
          aria-label="Scroll right"
          className="h-34 absolute top-40 sm:top-20 right-0 z-20 rounded-full bg-white/90 hover:bg-white shadow p-2 cursor-pointer"
          onClick={() => scrollNext("charlinas-list", "right")}
        >
          ›
        </button>
      </div>
    </div>
  );
}

export default CharlinaEstampada;

