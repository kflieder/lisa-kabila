import React from 'react'

function Bags() {

    const bags = [
        {
            id: 1,
            name: "Pink Bag",
            description: "A beautiful pink and white striped bag with braided straps.",
            imageUrls: ['/Bags/2.JPG', '/Bags/1.JPG'],
        },
        {
            id: 2,
            name: "Orange Bag",
            description: "A vibrant orange bag with a sleek design and sturdy handles.",
            imageUrls: ['/Bags/3.JPG'],
        },
        {
            id: 3,
            name: "Pink Bag",
            description: "A beautiful pink bag with braided straps.",
            imageUrls: ['/Bags/4.JPG'],
        },
        {
            id: 4,
            name: "Light Blue Bag",
            description: "A stylish light blue bag bag with braided straps.",
            imageUrls: ['/Bags/5.JPG'],
        },
        {
            id: 5,
            name: "Burnt Orange and White Bag",
            description: "A beautiful burnt orange and white striped bag with braided straps.",
            imageUrls: ['/Bags/6.JPG'],
        },
        {
            id: 6,
            name: "Light Green Bag",
            description: "A stylish light green bag with braided straps.",
            imageUrls: ['/Bags/7.JPG'],
        },
        {
            id: 7,
            name: "Pink Bag",
            description: "A lovely pink bag with braided straps.",
            imageUrls: ['/Bags/8.JPG', '/Bags/11.JPG'],
        },
        {
            id: 8,
            name: "Black and White Striped Bag",
            description: "A chic black and white striped bag with braided straps.",
            imageUrls: ['/Bags/9.JPG'],
        },
        {
            id: 9,
            name: "Light Blue Bag",
            description: "A stylish light blue bag with braided straps.",
            imageUrls: ['/Bags/10.JPG'],
        },
        {
            id: 10,
            name: "Black and White Striped Bag",
            description: "A stylish black and white striped bag with braided straps.",
            imageUrls: ['/Bags/12.JPG'],
        }

    ]

    const bagPrice = 300.00;

    function scrollNext(listId: string, direction: 'left' | 'right') {
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
    direction === 'right'
      ? Math.min(children.length - 1, closestIndex + 1)
      : Math.max(0, closestIndex - 1);

  const target = children[targetIndex];
  const scrollTo = target.offsetLeft - list.clientWidth / 2 + target.clientWidth / 2;

  list.scrollTo({ left: scrollTo, behavior: 'smooth' });
}

    

  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      <style>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>

      <h1 className="text-3xl font-semibold text-gray-900 mb-6">Bags</h1>

      <div className="relative">
        <ul
          id="bags-list"
          className="flex overflow-x-auto no-scrollbar snap-x snap-mandatory scroll-smooth gap-6 pb-4"
        >
          {bags.map((bag) => (
            <li key={bag.id} className="snap-center flex-none w-full md:w-1/3 lg:w-1/5">
              <div className="bg-white rounded-xl shadow ring-1 ring-gray-100 hover:shadow-md transition-shadow h-full flex flex-col justify-between">
                <div className="aspect-[4/5] w-full overflow-hidden rounded-t-xl bg-gray-100">
                  {bag.imageUrls.length > 1 ? (
                    <div className="relative h-full w-full">
                      <div
                        id={`bag-carousel-${bag.id}`}
                        className="h-full w-full overflow-x-auto overflow-y-hidden no-scrollbar snap-x snap-mandatory scroll-smooth"
                      >
                        <div className="flex h-full">
                          {bag.imageUrls.map((url, idx) => (
                            <img
                              key={idx}
                              src={url}
                              alt={`${bag.name} ${idx + 1}`}
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
                        onClick={() =>
                          scrollNext(`bag-carousel-${bag.id}`, 'left')
                        }
                      >
                        ‹
                      </button>
                      <button
                        type="button"
                        aria-label="Next image"
                        className="absolute bottom-2 right-[40%] sm:right-[25%] z-10 rounded-full sm:bg-white/80 bg-white sm:hover:bg-white shadow p-2 w-6 h-6 flex items-center justify-center cursor-pointer"
                        onClick={() =>
                          scrollNext(`bag-carousel-${bag.id}`, 'right')
                        }
                      >
                        ›
                      </button>
                    </div>
                  ) : (
                    <img
                      src={bag.imageUrls[0]}
                      alt={bag.name}
                      className="h-full w-full object-contain"
                      loading="lazy"
                    />
                  )}
                </div>

                <div className="p-4 flex flex-col justify-between flex-grow">
                  <h2 className="text-lg font-medium text-gray-900 truncate">{bag.name}</h2>
                  <p className="mt-1 text-sm text-gray-600">{bag.description}</p>
                  <p className="mt-3 text-base font-semibold text-gray-900">
                    Price: ${bagPrice.toFixed(2)}
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
          onClick={() =>
            scrollNext('bags-list', 'left')
          }
        >
          ‹
        </button>
        <button
          type="button"
          aria-label="Scroll right"
          className="h-34 absolute top-40 sm:top-20 right-0 z-20 rounded-full bg-white/90 hover:bg-white shadow p-2 cursor-pointer"
          onClick={() =>
            scrollNext('bags-list', 'right')
          }
        >
          ›
        </button>
      </div>
    </div>
    
  )
}

export default Bags
