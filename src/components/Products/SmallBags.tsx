import React from "react";

function SmallBags() {
  const smallBags = [
    {
      id: 1,
      name: "Multicolor Change Purse",
      description:
        "A beautiful multicolor change purse.",
      imageUrls: ["/SmallBags/1.JPG"],
    },
    {
      id: 2,
      name: "Dark Blue with Multicolor Pattern Change Purse",
      description:
        "A vibrant dark blue change purse with a multicolor pattern.",
      imageUrls: ["/SmallBags/2.JPG"],
    },
    {
      id: 3,
      name: "Dark Blue with Pink Pattern Change Purse",
      description: "A beautiful dark blue change purse with a pink pattern.",
      imageUrls: ["/SmallBags/3.JPG", "/SmallBags/4.JPG"],
    },
    {
      id: 4,
      name: "Red and White Pattern Change Purse",
      description: "A stylish red and white patterned change purse.",
      imageUrls: ["/SmallBags/4.JPG"],
    },
    {
      id: 5,
      name: "Dark Yellow with White Pattern Change Purse",
      description:
        "A beautiful dark yellow change purse with a white pattern.",
      imageUrls: ["/SmallBags/5.JPG"],
    },
  ];

  const smallBagPrice = 250.0;

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

      <h1 className="text-3xl font-semibold text-gray-900 mb-6">Small Bags</h1>

      <div className="relative">
        <ul
          id="smallBags-list"
          className="flex overflow-x-auto no-scrollbar snap-x snap-mandatory scroll-smooth gap-6 pb-4"
        >
          {smallBags.map((smallBag) => (
            <li
              key={smallBag.id}
              className="snap-center flex-none w-full md:w-1/3 lg:w-1/5"
            >
              <div className="bg-white rounded-xl shadow ring-1 ring-gray-100 hover:shadow-md transition-shadow h-full flex flex-col justify-between">
                <div className="aspect-[4/5] w-full overflow-hidden rounded-t-xl bg-gray-100">
                  {smallBag.imageUrls.length > 1 ? (
                    <div className="relative h-full w-full">
                      <div
                        id={`smallBag-carousel-${smallBag.id}`}
                        className="h-full w-full overflow-x-auto overflow-y-hidden no-scrollbar snap-x snap-mandatory scroll-smooth"
                      >
                        <div className="flex h-full">
                          {smallBag.imageUrls.map((url, idx) => (
                            <img
                              key={idx}
                              src={url}
                              alt={`${smallBag.name} ${idx + 1}`}
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
                            `smallBag-carousel-${smallBag.id}`
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
                            `smallBag-carousel-${smallBag.id}`
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
                      src={smallBag.imageUrls[0]}
                      alt={smallBag.name}
                      className="h-full w-full object-contain"
                      loading="lazy"
                    />
                  )}
                </div>

                <div className="p-4 flex flex-col justify-between flex-grow">
                  <h2 className="text-lg font-medium text-gray-900 truncate">
                    {smallBag.name}
                  </h2>
                  <p className="mt-1 text-sm text-gray-600">
                    {smallBag.description}
                  </p>
                  <p className="mt-3 text-base font-semibold text-gray-900">
                    Price: ${smallBagPrice.toFixed(2)}
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
          onClick={() => scrollNext("smallBags-list", "left")}
        >
          ‹
        </button>
        <button
          type="button"
          aria-label="Scroll right"
          className="h-34 absolute top-40 sm:top-20 right-0 z-20 rounded-full bg-white/90 hover:bg-white shadow p-2 cursor-pointer"
          onClick={() => scrollNext("smallBags-list", "right")}
        >
          ›
        </button>
      </div>
    </div>
  );
}

export default SmallBags;

