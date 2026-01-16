import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

// Slider Images
import img2 from "../assets/images/slider02.png";
import img3 from "../assets/images/slider03.png";
import HomeAbout from "./HomeAbout";

const HeroSection = () => {
  const images = [img2, img3];

  const heroContent = [
    {
      lines: [
        "Learn Skills",
        "That Get You Hired",
        "Build Your Future Today",
      ],
    },
    {
      lines: [
        "Upgrade Your Skills",
        "Upgrade Your Career",
        "Learn From Industry Experts",
      ],
    },
  ];

  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 3500);
    return () => clearInterval(timer);
  }, []);

  return (
    <>
      {/* HERO SECTION */}
      <section className="relative w-full overflow-hidden">
        {/* HEIGHT CONTROL (same idea as working slider) */}
        <div className="relative h-[30vh] sm:h-[70vh] md:h-[85vh] lg:h-[95vh] xl:h-screen bg-black">
          
          {/* SLIDER IMAGES */}
          {images.map((img, index) => (
            <img
              key={index}
              src={img}
              alt="Hero Slide"
              className={`
                absolute inset-0 w-full h-full
                object-cover
                transition-opacity duration-1000 ease-in-out
                ${index === current ? "opacity-100 z-20" : "opacity-0 z-10"}
              `}
            />
          ))}

          {/* DARK OVERLAY */}
          <div className="absolute inset-0 bg-black/40 z-20"></div>

          {/* TEXT CONTENT */}
          <div className="absolute inset-0 z-30 flex items-center px-4 sm:px-20">
            <div className="text-left max-w-2xl">
              {heroContent[current].lines.map((line, index) => (
                <h1
                  key={index}
                  className="
                    text-white font-extrabold uppercase
                    text-2xl sm:text-4xl md:text-5xl lg:text-6xl
                    leading-tight
                  "
                >
                  {line}
                </h1>
              ))}

              {/* CTA */}
              <Link to="/courses">
                <button className="
                  mt-6 px-6 py-3
                  bg-yellow-400 text-black
                  font-semibold uppercase
                  hover:bg-yellow-500
                  transition
                ">
                  Explore Courses
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ABOUT SECTION */}
      <HomeAbout />
    </>
  );
};

export default HeroSection;