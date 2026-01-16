import React from "react";
import { Link } from "react-router-dom";
import { FaFacebookF, FaInstagram, FaTiktok } from "react-icons/fa";

import logo from "../assets/Images/logo.png";

const Footer = () => {
  return (
    <footer className="bg-black text-gray-300">
      {/* TOP SECTION */}
      <div className="max-w-7xl mx-auto px-6 py-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">

        {/* BRAND */}
        <div>
          <div className="flex items-start ">
            <img
              src={logo}
              alt="Skill Darbar Logo"
              className="w-40 h-40 object-contain "
            />
          </div>

          <p className="text-lg leading-relaxed">
            Learn in-demand skills with expert-led courses and boost your career
            with practical knowledge.
          </p>

          <div className="flex gap-4 mt-2 text-xl">
            <a
              href="https://www.facebook.com/profile.php?id=61581912482367"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Skill Darbar Facebook"
            >
              <FaFacebookF className="hover:text-yellow-400 cursor-pointer transition" />
            </a>

            <a
              href="https://www.instagram.com/skill_darbar/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Skill Darbar Instagram"
            >
              <FaInstagram className="hover:text-yellow-400 cursor-pointer transition" />
            </a>

            <a
              href="https://www.tiktok.com/@skill.darbar"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Skill Darbar TikTok"
            >
              <FaTiktok className="hover:text-yellow-400 cursor-pointer transition" />
            </a>
          </div>
        </div>

        {/* COURSES */}
        <div>
          <h3 className="text-xl font-semibold text-white mb-4">
            Popular Courses
          </h3>
          <ul className="space-y-2 text-lg">
            <li>
              <Link
                to="/courses/graphic-designing"
                className="hover:text-yellow-400 cursor-pointer transition"
              >
                Graphic Designing
              </Link>
            </li>
            <li>
              <Link
                to="/courses/video-editing"
                className="hover:text-yellow-400 cursor-pointer transition"
              >
                Video Editing
              </Link>
            </li>
            <li>
              <Link
                to="/courses/web-development"
                className="hover:text-yellow-400 cursor-pointer transition"
              >
                Web Development
              </Link>
            </li>
            <li>
              <Link
                to="/courses/app-development"
                className="hover:text-yellow-400 cursor-pointer transition"
              >
                App Development
              </Link>
            </li>
            <li>
              <Link
                to="/courses/meta-ads"
                className="hover:text-yellow-400 cursor-pointer transition"
              >
                Meta Ads
              </Link>
            </li>
            <li className="hover:text-yellow-400 cursor-pointer transition">
              More upcoming...
            </li>
          </ul>
        </div>

        {/* QUICK LINKS */}
        <div>
          <h3 className="text-xl font-semibold text-white mb-4">
            Quick Links
          </h3>
          <ul className="space-y-2 text-lg">
            <li>
              <Link
                to="/"
                className="hover:text-yellow-400 cursor-pointer transition"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/about"
                className="hover:text-yellow-400 cursor-pointer transition"
              >
                About
              </Link>
            </li>
            <li>
              <Link
                to="/courses"
                className="hover:text-yellow-400 cursor-pointer transition"
              >
                All Courses
              </Link>
            </li>
            <li>
              <Link
                to="/contact"
                className="hover:text-yellow-400 cursor-pointer transition"
              >
                Contact Us
              </Link>
            </li>
          </ul>
        </div>

        {/* SUPPORT */}
        <div>
          <h3 className="text-xl font-semibold text-white mb-4">
            Support
          </h3>
          <ul className="space-y-2 text-lg">
            <li>
              <Link
                to="/help-center"
                className="hover:text-yellow-400 cursor-pointer transition"
              >
                Help Center
              </Link>
            </li>
            <li>
              <Link
                to="/terms"
                className="hover:text-yellow-400 cursor-pointer transition"
              >
                Terms & Conditions
              </Link>
            </li>
            <li>
              <Link
                to="/privacy-policy"
                className="hover:text-yellow-400 cursor-pointer transition"
              >
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link
                to="/faqs"
                className="hover:text-yellow-400 cursor-pointer transition"
              >
                FAQs
              </Link>
            </li>
          </ul>
        </div>
      </div>

      {/* BOTTOM BAR */}
      <div className="border-t border-gray-700 py-5 text-center text-sm text-gray-400">
        © {new Date().getFullYear()} SkillDarbar. All Rights Reserved.
      </div>
    </footer>
  );
};

export default Footer;
