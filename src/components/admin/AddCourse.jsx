import { useState, useEffect } from "react";
import axiosInstance from "../../utils/axiosInstance";
import Modelbox from "./Modelbox";

const AddCourse = () => {
  const [formData, setFormData] = useState({
    courseName: "",
    duration: "",
    fees: "",
    description: "",
    image: null,
    syllabus_pdf: null,
  });

  const [courses, setCourses] = useState([]);
  const [successMessage, setSuccessMessage] = useState("");
  const [updateMessage, setUpdateMessage] = useState("");
  const [deleteMessage, setDeleteMessage] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editCourse, setEditCourse] = useState(null);

  /* ================= FETCH COURSES ================= */
  const fetchCourses = async () => {
    try {
      const res = await axiosInstance.get("/admin/courses");
      const list = Array.isArray(res.data?.data)
        ? res.data.data
        : Array.isArray(res.data)
        ? res.data
        : [];
      setCourses(list);
    } catch (err) {
      console.error("Fetch failed", err);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  /* ================= FORM HANDLING ================= */
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      setFormData((p) => ({ ...p, [name]: files[0] }));
    } else {
      setFormData((p) => ({ ...p, [name]: value }));
    }
  };

  /* ================= ADD COURSE ================= */
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = new FormData();
      data.append("name", formData.courseName);
      data.append("duration", formData.duration);
      data.append("fees", formData.fees);
      data.append("description", formData.description);

      if (formData.image) data.append("image", formData.image);
      if (formData.syllabus_pdf) data.append("syllabus_pdf", formData.syllabus_pdf);

      await axiosInstance.post("/admin/courses", data, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      await fetchCourses();

      setFormData({
        courseName: "",
        duration: "",
        fees: "",
        description: "",
        image: null,
        syllabus_pdf: null,
      });

      setSuccessMessage("Course added successfully ✅");
      setTimeout(() => setSuccessMessage(""), 3000);
    } catch (err) {
      console.error("Add failed", err);
    }
  };

  /* ================= DELETE ================= */
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this course?")) return;
    try {
      await axiosInstance.delete(`/admin/courses/${id}`);
      await fetchCourses();
      setDeleteMessage("Course deleted successfully 🗑️");
      setTimeout(() => setDeleteMessage(""), 3000);
    } catch (err) {
      console.error("Delete failed", err);
    }
  };

  /* ================= EDIT ================= */
  const handleEdit = (course) => {
    setEditCourse(course);
    setIsModalOpen(true);
  };

  /* ================= UPDATE ================= */
  const handleUpdate = async (updated) => {
    if (!editCourse?.id) return;
    try {
      const data = new FormData();
      data.append("_method", "PATCH");
      data.append("name", updated.courseName || "");
      data.append("duration", updated.duration || "");
      data.append("fees", updated.fees || "");
      data.append("description", updated.description || "");

      // Append files only if they are actual new File objects
      if (updated.image instanceof File) data.append("image", updated.image);
      if (updated.syllabus_pdf instanceof File) data.append("syllabus_pdf", updated.syllabus_pdf);

      await axiosInstance.post(`/admin/courses/${editCourse.id}`, data, {
        headers: { "Content-Type": "multipart/form-data", Accept: "application/json" },
      });

      await fetchCourses();
      setIsModalOpen(false);
      setEditCourse(null);
      setUpdateMessage("Course updated successfully ✨");
      setTimeout(() => setUpdateMessage(""), 3000);
    } catch (err) {
      console.error("Update failed", err);
    }
  };

  /* ================= UTILITY: Get full syllabus link ================= */
  const getSyllabusLink = (course) => {
    if (!course.syllabus_pdf) return null;
    return course.syllabus_pdf.startsWith("http")
      ? course.syllabus_pdf
      : `http://192.168.1.13:8000/storage/${course.syllabus_pdf}`;
  };

  /* ================= UI ================= */
  return (
    <div className="min-h-screen p-6 bg-gray-100">
      {/* ================= ADD FORM ================= */}
      <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-lg p-8 mb-10">
        {successMessage && (
          <div className="mb-4 text-center text-green-600 font-medium">
            {successMessage}
          </div>
        )}

        <h2 className="text-2xl font-semibold text-center mb-6">Add Course</h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          <input
            type="text"
            name="courseName"
            value={formData.courseName}
            onChange={handleChange}
            placeholder="Course Name"
            className="w-full border rounded px-4 py-2"
            required
          />

          <div className="grid md:grid-cols-2 gap-4">
            <input
              type="text"
              name="duration"
              value={formData.duration}
              onChange={handleChange}
              placeholder="Duration"
              className="border rounded px-4 py-2"
              required
            />
            <input
              type="number"
              name="fees"
              value={formData.fees}
              onChange={handleChange}
              placeholder="Fees"
              className="border rounded px-4 py-2"
              required
            />
          </div>

          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Course Description"
            className="w-full border rounded px-4 py-2 min-h-[100px]"
            required
          />

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Course Image</label>
            <input
              type="file"
              name="image"
              accept="image/*"
              onChange={handleChange}
              className="w-full border rounded px-3 py-2 bg-white"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Syllabus PDF</label>
            <input
              type="file"
              name="syllabus_pdf"
              accept="application/pdf"
              onChange={handleChange}
              className="w-full border rounded px-3 py-2 bg-white"
            />
          </div>

          <div className="text-right">
            <button className="bg-slate-700 text-white px-6 py-2 rounded">Add Course</button>
          </div>
        </form>
      </div>

      {/* ================= COURSES TABLE ================= */}
      <div className="max-w-6xl mx-auto bg-white rounded-xl shadow-lg p-6 overflow-x-auto">
        {updateMessage && (
          <div className="mb-3 text-center text-blue-600 font-medium">{updateMessage}</div>
        )}
        {deleteMessage && (
          <div className="mb-3 text-center text-red-600 font-medium">{deleteMessage}</div>
        )}

        <h2 className="text-xl font-semibold mb-4">Courses</h2>

        <table className="w-full min-w-[900px] border">
          <thead className="bg-gray-50">
            <tr>
              <th className="p-3 text-left">Image</th>
              <th className="p-3 text-left">Name</th>
              <th className="p-3 text-left">Fees</th>
              <th className="p-3 text-left">Duration</th>
              <th className="p-3 text-left">Description</th>
              <th className="p-3 text-left">Syllabus PDF</th>
              <th className="p-3 text-center">Action</th>
            </tr>
          </thead>

          <tbody>
            {courses.map((course) => (
              <tr key={course.id} className="border-t align-top">
                <td className="p-3">
                  {course.image && (
                    <img
                      src={`http://192.168.1.13:8000/storage/${course.image}`}
                      alt={course.name}
                      className="w-16 h-16 object-cover rounded"
                    />
                  )}
                </td>

                <td className="p-3 font-medium">{course.name}</td>
                <td className="p-3">₹{course.fees}</td>
                <td className="p-3">{course.duration}</td>

                <td className="p-3 max-w-[250px]">
                  <p className="line-clamp-3 text-sm text-gray-700">
                    {course.description || "—"}
                  </p>
                </td>

   <td className="p-3">
  {course.syllabus_pdf ? (
    <a
      href={
        course.syllabus_pdf.startsWith("http")
          ? course.syllabus_pdf
          : `http://192.168.1.13:8000/storage/${course.syllabus_pdf}`
      }
      target="_blank"
      rel="noopener noreferrer"
      className="text-blue-600 underline text-sm"
    >
      View PDF
    </a>
  ) : (
    <span className="text-gray-400 text-sm">No PDF</span>
  )}
</td>

                <td className="p-3 text-center space-x-2">
                  <button
                    onClick={() => handleEdit(course)}
                    className="bg-blue-600 text-white px-3 py-1 rounded"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(course.id)}
                    className="bg-red-600 text-white px-3 py-1 rounded"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ================= MODAL ================= */}
      <Modelbox
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        course={editCourse}
        onUpdate={handleUpdate}
      />
    </div>
  );
};

export default AddCourse;
