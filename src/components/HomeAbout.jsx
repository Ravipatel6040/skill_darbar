import React from "react";

const HomeAbout = () => {
  return (
    <>
      <section className="bg-gray-50 py-16">
        <div className="max-w-5xl mx-auto px-6 text-center">

          {/* Heading */}
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            About <span className="text-yellow-400">Skill Darbar</span>
          </h2>

          {/* Description */}
          <p className="text-gray-600 text-lg md:text-xl leading-relaxed mb-6">
            Skill Darbar is a skill-based e-learning platform focused on
            practical and career-oriented education.
          </p>

          <p className="text-gray-600 text-lg md:text-xl leading-relaxed mb-6">
            We help learners gain real-world skills through simple, hands-on
            courses in design, development, and digital marketing.
          </p>

          <p className="text-gray-600 text-lg md:text-xl leading-relaxed">
            Our goal is to empower individuals to grow, earn, and succeed
            through skills.
          </p>

          {/* Optional Button */}
          <div className="mt-8">
            <button className="bg-yellow-400 text-black font-semibold px-8 py-3 rounded-full hover:bg-yellow-500 transition">
              Explore Courses
            </button>
          </div>

        </div>
      </section>
    </>
  );
};

export default HomeAbout;
