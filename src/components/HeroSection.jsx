import React, { useEffect, useState } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

// Slider Images
import img2 from "../assets/Images/slider02.png";
import img3 from "../assets/Images/slider03.png";
import HomeAbout from "./HomeAbout";




const HeroSection = () => {
  const images = [img2, img3];

  const heroContent = [
    {
      lines: ["Learn Skills", "That Get You", "Hired"],
    },
    {
      lines: ["Upgrade Your Skills", "Upgrade Your", "Career"],
    },
    {
      lines: ["Master In-Demand", "Skills", "Online"],
    },
  ];

  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 3000);

    return () => clearInterval(timer);
  }, [images.length]);

  const arrowBg = "oklch(79.5% 0.184 86.047)";

  return (
    <>
    <section className="relative w-full h-[82vh] overflow-hidden">
      {/* SLIDER IMAGES */}
      {images.map((img, index) => (
        <img
          key={index}
          src={img}
          alt="Hero Slide"
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
            index === current ? "opacity-100" : "opacity-0"
          }`}
        />
      ))}

      {/* OVERLAY */}
      <div className="absolute inset-0 flex items-center justify-start px-6 md:px-24 z-10">
        {/* LEFT SIDE TEXT */}
        <div className="text-left max-w-xl ">
          {heroContent[current].lines.map((line, index) => (
            <h1
              key={index}
              className="text-white text-5xl md:text-7xl font-bold leading-tight"
            >
              {line}
            </h1>
          ))}
        </div>
      </div>

      {/* LEFT ARROW */}
      <button
        className="absolute left-6 top-1/2 -translate-y-1/2 p-4 rounded-full z-20 transition hover:scale-110"
        style={{ backgroundColor: arrowBg }}
        onClick={() =>
          setCurrent((prev) => (prev === 0 ? images.length - 1 : prev - 1))
        }
      >
        <FaArrowLeft className="text-black text-xl" />
      </button>

      {/* RIGHT ARROW */}
      <button
        className="absolute right-6 top-1/2 -translate-y-1/2 p-4 rounded-full z-20 transition hover:scale-110"
        style={{ backgroundColor: arrowBg }}
        onClick={() => setCurrent((prev) => (prev + 1) % images.length)}
      >
        <FaArrowRight className="text-black text-xl" />
      </button>
    </section>
    <HomeAbout/>
    </>
  );
};

export default HeroSection;
