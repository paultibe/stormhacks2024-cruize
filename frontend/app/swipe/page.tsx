"use client";

import Image from "next/image";
import { useState } from "react";
import { useSwipeable } from "react-swipeable";

export default function RidePage() {
  const [currentView, setCurrentView] = useState("rating");
  const [rating, setRating] = useState(0);

  const handlers = useSwipeable({
    onSwipedRight: () => setCurrentView("match"),
    trackMouse: true,
  });

  const handleStarClick = (starIndex: number) => {
    setRating(starIndex + 1);
  };

  return (
    <div className="relative w-[393px] h-[852px]" {...handlers}>
      <Image
        src={
          currentView === "rating"
            ? "/assets/Rating completed.png"
            : "/assets/It's a match.png"
        }
        alt={currentView === "rating" ? "Rating completed" : "It's a match"}
        layout="fill"
        objectFit="cover"
        priority
      />
      {currentView === "rating" && (
        <>
          <div className="absolute top-[21%] left-[46%] transform -translate-x-1/2 flex space-x-2">
            {[...Array(5)].map((_, index) => (
              <Image
                key={index}
                src="/assets/Star 1.png"
                alt={`Star ${index + 1}`}
                width={40}
                height={40}
                onClick={() => handleStarClick(index)}
                className={`cursor-pointer transition-all duration-200 ${
                  index < rating 
                    ? 'brightness-100 invert-[100%] sepia-[100%] saturate-[1000%] hue-rotate-[180deg] brightness-[20%] contrast-[100%]' 
                    : 'brightness-0 saturate-100 invert-[50%]'
                }`}
              />
            ))}
          </div>
          <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 text-white text-xl">
            Swipe right to see your match!
          </div>
        </>
      )}
    </div>
  );
}