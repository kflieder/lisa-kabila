import React from "react";
import ProductCard from "./ProductCard";

function CharlinaEstampada() {
  const charlinaPrice = 250.0;
  const charlinas = [
    {
      id: "scarf1",
      name: "White Scarf",
      description:
        "A beautiful white scarf",
      imageUrls: ["/CharlinaEstampada/1.JPG"],
      price: charlinaPrice,
    },
    {
      id: "scarf2",
      name: "Light Blue Scarf with brown pattern",
      description:
        "A vibrant light blue scarf with a brown pattern.",
      imageUrls: ["/CharlinaEstampada/2.JPG"],
      price: charlinaPrice,
    },
    {
      id: "scarf3",
      name: "Brown Scarf",
      description: "A beautiful brown scarf.",
      imageUrls: ["/CharlinaEstampada/3.JPG"],
      price: charlinaPrice,
    },
    {
      id: "scarf4",
      name: "Purple Scarf",
      description: "A stylish purple scarf.",
      imageUrls: ["/CharlinaEstampada/4.JPG"],
      price: charlinaPrice,
    },
    {
      id: "scarf5",
      name: "Vibrant Yellow Scarf",
      description:
        "A beautiful vibrant yellow scarf.",
      imageUrls: ["/CharlinaEstampada/5.JPG"],
      price: charlinaPrice,
    },
    {
      id: "scarf6",
      name: "Purple Scarf",
      description: "A stylish purple scarf.",
      imageUrls: ["/CharlinaEstampada/6.JPG"],
      price: charlinaPrice,
    },
    {
      id: "scarf7",
      name: "White Scarf with brown pattern",
      description: "A lovely white scarf with brown patterns.",
      imageUrls: ["/CharlinaEstampada/7.JPG"],
      price: charlinaPrice,
    },
    {
      id: "scarf8",
      name: "Blue Scarf with light brown pattern",
      description: "A chic blue scarf with light brown patterns.",
      imageUrls: ["/CharlinaEstampada/8.JPG"],
      price: charlinaPrice,
    },
    {
      id: "scarf9",
      name: "Black Scarf",
      description: "A stylish black scarf.",
      imageUrls: ["/CharlinaEstampada/9.JPG"],
      price: charlinaPrice,
    },
    {
      id: "scarf10",
      name: "Blue Scarf with light brown pattern",
      description: "A stylish blue scarf with light brown patterns.",
      imageUrls: ["/CharlinaEstampada/10.JPG"],
      price: charlinaPrice,
    },
    {
      id: "scarf11",
      name: "Brown Scarf",
      description: "A stylish brown scarf.",
      imageUrls: ["/CharlinaEstampada/11.JPG"],
      price: charlinaPrice,
    },
    {
        id: "scarf12",
        name: "Gray Scarf with light brown pattern",
        description: "A stylish gray scarf with light brown patterns.",
        imageUrls: ["/CharlinaEstampada/12.JPG", "/CharlinaEstampada/13.JPG"],
        price: charlinaPrice,
    },
    {
        id: "scarf13",
        name: "Beautiful beige scarf",
        description: "A stylish beige scarf.",
        imageUrls: ["/CharlinaEstampada/14.JPG"],
        price: charlinaPrice,
    },
    {
        id: "scarf14",
        name: "Vibrant Pink Scarf",
        description: "A stylish vibrant pink scarf.",
        imageUrls: ["/CharlinaEstampada/15.JPG"],
        price: charlinaPrice,
    },
    {
        id: "scarf15",
        name: "Vibrant Blue Scarf",
        description: "A stylish vibrant blue scarf.",
        imageUrls: ["/CharlinaEstampada/16.JPG"],
        price: charlinaPrice,
    },
    {
        id: "scarf16",
        name: "Vibrant Green Scarf",
        description: "A stylish vibrant green scarf.",
        imageUrls: ["/CharlinaEstampada/17.JPG"],
        price: charlinaPrice,
    },
    {
        id: "scarf17",
        name: "Light Brown Scarf",
        description: "A stylish light brown scarf with intricate patterns.",
        imageUrls: ["/CharlinaEstampada/18.JPG"],
        price: charlinaPrice,
    },
    {
        id: "scarf18",
        name: "Blue scarf with light brown pattern",
        description: "A stylish blue scarf with light brown patterns.",
        imageUrls: ["/CharlinaEstampada/19.JPG"],
        price: charlinaPrice,
    }
  ];

  

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
            <ProductCard key={charlina.id} product={charlina} />
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

