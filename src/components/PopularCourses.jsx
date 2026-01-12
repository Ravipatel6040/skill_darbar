import React from "react";

// IMPORT LOCAL IMAGES
import graphicImg from "../assets/Images/graphic.png";
import videoImg from "../assets/Images/video01.png";
import appImg from "../assets/Images/app.jpg";
import webImg from "../assets/Images/web.jfif";
import metaImg from "../assets/Images/meta.avif";

function PopularCourses() {
  return (
    <div className="max-w-screen-xl mx-auto p-5 sm:p-10 md:p-16">

      {/* Header */}
      <div className="mb-10 text-center">
        <h2 className="text-2xl md:text-3xl font-medium tracking-tight text-gray-900">
          Popular Courses
        </h2>

        {/* Orange underline */}
        <div className="w-60 h-0.5 bg-[#ffb606] mx-auto mt-3 rounded-full"></div>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">

        <CourseCard
          img={graphicImg}
          title="Graphic Designing"
          duration="3 Months"
          fees="₹15,000"
        />

        <CourseCard
          img={videoImg}
          title="Video Editing"
          duration="2 Months"
          fees="₹12,000"
        />

        <CourseCard
          img={appImg}
          title="App Development"
          duration="6 Months"
          fees="₹35,000"
        />

        <CourseCard
          img={webImg}
          title="Web Development"
          duration="5 Months"
          fees="₹30,000"
        />

        <CourseCard
          img={metaImg}
          title="Meta Ads"
          duration="1 Month"
          fees="₹8,000"
        />

        {/* MORE UPCOMING CARD */}
        <UpcomingCard />

      </div>
    </div>
  );
}

/* COURSE CARD */
const CourseCard = ({ img, title, duration, fees }) => {
  return (
    <div className="
      group rounded-xl overflow-hidden bg-white
      border border-black/20
      shadow-md transition-all duration-300
      hover:-translate-y-2 hover:shadow-2xl
    ">

      {/* Image */}
      <div className="relative overflow-hidden">
        <img
          src={img}
          alt={title}
          className="w-full h-56 object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition"></div>
      </div>

      {/* Content */}
      <div className="px-6 py-5">
        <h3 className="font-semibold text-xl text-gray-900">
          {title}
        </h3>

        <p className="mt-2 text-base text-gray-600">
          <span className="font-medium">Duration:</span> {duration}
        </p>

        <p className="mt-1 text-base text-gray-600">
          <span className="font-medium">Fees:</span> {fees}
        </p>

        <button className="mt-5 w-full border border-yellow-400 text-yellow-500 font-medium py-2.5 rounded-md hover:bg-yellow-400 hover:text-black transition">
          View Details
        </button>
      </div>
    </div>
  );
};

/* UPCOMING CARD */
const UpcomingCard = () => {
  return (
    <div className="
      rounded-xl bg-gradient-to-br from-gray-100 to-gray-200
      border border-black/20 border-dashed
      flex items-center justify-center min-h-[420px]
      transition hover:-translate-y-2 hover:shadow-xl
    ">
      <div className="text-center px-6">
        <h3 className="text-2xl font-semibold text-gray-700 mb-2">
          More Courses
        </h3>
        <p className="text-gray-500 mb-4">
          More upcoming...
        </p>

        <button className="px-6 py-2 border border-gray-400 rounded-md text-gray-600 hover:bg-gray-300 hover:text-black transition">
          Stay Tuned
        </button>
      </div>
    </div>
  );
};

export default PopularCourses;
