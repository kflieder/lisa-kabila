import React from "react";
import ProductCard from "./ProductCard";

function Bags() {
  const bagPrice = 300.0;
  const bags = [
    {
      id: "bag1",
      name: "Pink Bag",
      description:
        "A beautiful pink and white striped bag with braided straps.",
      imageUrls: ["/Bags/2.JPG", "/Bags/1.JPG"],
      price: bagPrice,
    },
    {
      id: "bag2",
      name: "Orange Bag",
      description:
        "A vibrant orange bag with a sleek design and sturdy handles.",
      imageUrls: ["/Bags/3.JPG"],
      price: bagPrice,
    },
    {
      id: "bag3",
      name: "Pink Bag",
      description: "A beautiful pink bag with braided straps.",
      imageUrls: ["/Bags/4.JPG"],
      price: bagPrice,
    },
    {
      id: "bag4",
      name: "Light Blue Bag",
      description: "A stylish light blue bag bag with braided straps.",
      imageUrls: ["/Bags/5.JPG"],
      price: bagPrice,
    },
    {
      id: "bag5",
      name: "Burnt Orange and White Bag",
      description:
        "A beautiful burnt orange and white striped bag with braided straps.",
      imageUrls: ["/Bags/6.JPG"],
      price: bagPrice,
    },
    {
      id: "bag6",
      name: "Light Green Bag",
      description: "A stylish light green bag with braided straps.",
      imageUrls: ["/Bags/7.JPG"],
      price: bagPrice,
    },
    {
      id: "bag7",
      name: "Pink Bag",
      description: "A lovely pink bag with braided straps.",
      imageUrls: ["/Bags/8.JPG", "/Bags/11.JPG"],
      price: bagPrice,
    },
    {
      id: "bag8",
      name: "Black and White Striped Bag",
      description: "A chic black and white striped bag with braided straps.",
      imageUrls: ["/Bags/9.JPG"],
      price: bagPrice,
    },
    {
      id: "bag9",
      name: "Light Blue Bag",
      description: "A stylish light blue bag with braided straps.",
      imageUrls: ["/Bags/10.JPG"],
      price: bagPrice,  
    },
    {
      id: "bag10",
      name: "Black and White Striped Bag",
      description: "A stylish black and white striped bag with braided straps.",
      imageUrls: ["/Bags/12.JPG"],
      price: bagPrice,
    },
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

      <h1 className="text-3xl font-semibold text-gray-900 mb-6">Bags</h1>

      <div className="relative">
        <ul
          id="bags-list"
          className="flex overflow-x-auto no-scrollbar snap-x snap-mandatory scroll-smooth gap-6 pb-4"
        >
          {bags.map((bag) => (
            <ProductCard key={bag.id} product={bag} />
          ))}
        </ul>

        <button
          type="button"
          aria-label="Scroll left"
          className="h-34 absolute top-40 sm:top-20 left-0 z-20 rounded-full bg-white/90 hover:bg-white shadow p-2 cursor-pointer"
          onClick={() => scrollNext("bags-list", "left")}
        >
          ‹
        </button>
        <button
          type="button"
          aria-label="Scroll right"
          className="h-34 absolute top-40 sm:top-20 right-0 z-20 rounded-full bg-white/90 hover:bg-white shadow p-2 cursor-pointer"
          onClick={() => scrollNext("bags-list", "right")}
        >
          ›
        </button>
      </div>
    </div>
  );
}

export default Bags;
