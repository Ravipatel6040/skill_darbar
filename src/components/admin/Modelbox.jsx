import { useState, useEffect } from "react";

const Modelbox = ({ isOpen, onClose, course, onUpdate }) => {
  const [formData, setFormData] = useState({
    courseName: "",
    duration: "",
    fees: "",
    description: "",
    image: null,
    syllabus_pdf: null,
  });

  useEffect(() => {
    if (course) {
      setFormData({
        courseName: course.name || "",
        duration: course.duration || "",
        fees: course.fees || "",
        description: course.description || "",
        image: null,
        syllabus_pdf: null, // keep null until replaced
      });
    }
  }, [course]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      setFormData((p) => ({ ...p, [name]: files[0] }));
    } else {
      setFormData((p) => ({ ...p, [name]: value }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdate(formData); // pass updated data including files
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-lg p-6 overflow-auto max-h-[90vh]">
        <h2 className="text-xl font-semibold mb-4 text-center">Edit Course</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="courseName"
            value={formData.courseName}
            onChange={handleChange}
            placeholder="Course Name"
            className="w-full border rounded px-3 py-2"
            required
          />
          <div className="grid md:grid-cols-2 gap-4">
            <input
              type="text"
              name="duration"
              value={formData.duration}
              onChange={handleChange}
              placeholder="Duration"
              className="border rounded px-3 py-2"
              required
            />
            <input
              type="number"
              name="fees"
              value={formData.fees}
              onChange={handleChange}
              placeholder="Fees"
              className="border rounded px-3 py-2"
              required
            />
          </div>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Course Description"
            className="w-full border rounded px-3 py-2 min-h-[80px]"
            required
          />

          {/* Course Image */}
          <div>
            <label className="block text-sm font-medium">Course Image</label>
            <input
              type="file"
              name="image"
              accept="image/*"
              onChange={handleChange}
              className="w-full border rounded px-3 py-2 bg-white"
            />
          </div>

          {/* Syllabus PDF */}
          <div>
            <label className="block text-sm font-medium">Syllabus PDF</label>
            {course?.syllabus_pdf && !formData.syllabus_pdf && (
              <p className="mb-2 text-sm text-gray-700">
                Current PDF:{" "}
                <a
                  href={`http://192.168.1.13:8000/storage/${course.syllabus_pdf}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 underline"
                >
                  View
                </a>
              </p>
            )}
            <input
              type="file"
              name="syllabus_pdf"
              accept="application/pdf"
              onChange={handleChange}
              className="w-full border rounded px-3 py-2 bg-white"
            />
          </div>

          <div className="flex justify-end space-x-2 mt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700"
            >
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Modelbox;
