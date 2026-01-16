import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axiosInstance from "../utils/axiosInstance";

const EnquiryPage = () => {
  const { slug } = useParams();
  const navigate = useNavigate();

  const [courseId, setCourseId] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    message: "",
    date: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  /* ================= FETCH COURSE ID BY SLUG ================= */
  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const res = await axiosInstance.get("/admin/courses");
        const list = Array.isArray(res.data?.data)
          ? res.data.data
          : res.data;

        const found = list.find((c) => c.slug === slug);
        if (!found) throw new Error("Course not found");

        setCourseId(found.id);
      } catch (err) {
        console.error(err);
        setError("Invalid course");
      }
    };

    fetchCourse();
  }, [slug]);

  /* ================= INPUT HANDLER ================= */
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  /* ================= SUBMIT ================= */
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!courseId) return;

    setLoading(true);
    setError("");

    try {
      const res = await axiosInstance.post(
        `/courses/${courseId}/enquiry`,
        formData
      );

      if (!res.data?.success) {
        throw new Error(res.data?.message || "Submission failed");
      }

      navigate(`/qr/${slug}`);
    } catch (err) {
      console.error(err);
      setError(
        err.response?.data?.message ||
        "Something went wrong. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-xl bg-white rounded-xl shadow-lg p-6 sm:p-8">

        {/* HEADER */}
        <h2 className="text-2xl sm:text-3xl font-semibold text-center mb-2">
          Course Enquiry
        </h2>

        <p className="text-center text-gray-500 mb-6 capitalize">
          Enquiry for: <b>{slug.replace("-", " ")}</b>
        </p>

        {/* ERROR */}
        {error && (
          <p className="text-red-500 text-center mb-4">{error}</p>
        )}

        {/* FORM */}
        <form onSubmit={handleSubmit} className="space-y-4">

          <div>
            <label className="block text-sm font-medium mb-1">Name</label>
            <input
              type="text"
              name="name"
              required
              value={formData.name}
              onChange={handleChange}
              className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-yellow-400"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Phone</label>
            <input
              type="tel"
              name="phone"
              required
              value={formData.phone}
              onChange={handleChange}
              className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-yellow-400"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              type="email"
              name="email"
              required
              value={formData.email}
              onChange={handleChange}
              className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-yellow-400"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Preferred Date
            </label>
            <input
              type="date"
              name="date"
              required
              value={formData.date}
              onChange={handleChange}
              className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-yellow-400"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Message</label>
            <textarea
              name="message"
              rows="4"
              value={formData.message}
              onChange={handleChange}
              className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-yellow-400"
            />
          </div>

          <button
            type="submit"
            disabled={loading || !courseId}
            className="w-full bg-yellow-400 text-black py-3 rounded-lg font-semibold text-lg hover:bg-yellow-500 transition disabled:opacity-60"
          >
            {loading ? "Submitting..." : "Submit Enquiry"}
          </button>

        </form>
      </div>
    </div>
  );
};

export default EnquiryPage;
