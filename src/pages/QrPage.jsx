import { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import axiosInstance from "../utils/axiosInstance";
import qrImage from "../assets/images/qr.jpeg";

const QrPage = () => {
  const { slug } = useParams();
  const { state } = useLocation();

  /* ================= INITIAL DATA ================= */
  const initialAmount = state?.amount || 0;
  const initialCourseName = state?.courseName || "";
  const initialCourseId = state?.courseId || null;

  const [payAmount, setPayAmount] = useState(initialAmount);
  const [courseName, setCourseName] = useState(initialCourseName);
  const [courseId, setCourseId] = useState(initialCourseId);

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    transactionId: "",
    screenshot: null,
  });

  const [errors, setErrors] = useState({});

  /* ================= FETCH COURSE (FALLBACK) ================= */
  useEffect(() => {
    if (!payAmount) {
      const fetchCourse = async () => {
        try {
          const res = await axiosInstance.get("/admin/courses");
          const list = Array.isArray(res.data?.data)
            ? res.data.data
            : res.data;

          const found = list.find((c) => c.slug === slug);
          if (found) {
            setPayAmount(found.fees);
            setCourseName(found.name);
            setCourseId(found.id);
          }
        } catch (err) {
          console.error("Failed to fetch course details", err);
        }
      };

      fetchCourse();
    }
  }, [slug, payAmount]);

  /* ================= VALIDATION ================= */
  const validate = () => {
    const newErrors = {};

    // Name
    if (!formData.name.trim()) {
      newErrors.name = "Full name is required";
    } else if (!/^[A-Za-z ]{3,}$/.test(formData.name)) {
      newErrors.name = "Name must be at least 3 letters";
    }

    // Phone
    if (!formData.phone) {
      newErrors.phone = "Contact number is required";
    } else if (!/^[0-9]{10}$/.test(formData.phone)) {
      newErrors.phone = "Enter valid 10 digit number";
    }

    // Transaction ID
    if (!formData.transactionId) {
      newErrors.transactionId = "Transaction ID is required";
    } else if (formData.transactionId.length < 10) {
      newErrors.transactionId =
        "Transaction ID must be at least 10 characters";
    }

    // Screenshot
    if (!formData.screenshot) {
      newErrors.screenshot = "Payment screenshot is required";
    } else if (
      !["image/jpeg", "image/png"].includes(formData.screenshot.type)
    ) {
      newErrors.screenshot = "Only JPG or PNG images allowed";
    } else if (formData.screenshot.size > 2 * 1024 * 1024) {
      newErrors.screenshot = "Image size must be less than 2MB";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  /* ================= SUBMIT ================= */
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      setLoading(true);

      const payload = new FormData();
      payload.append("course_id", courseId);
      payload.append("course_name", courseName);
      payload.append("amount", payAmount);
      payload.append("name", formData.name);
      payload.append("phone", formData.phone);
      payload.append("transaction_id", formData.transactionId);
      payload.append("payment_image", formData.screenshot);

      // ✅ Correct API route
      await axiosInstance.post(`/courses/${slug}/purchase`, payload);

      setSubmitted(true);
    } catch (err) {
      console.error("Payment failed", err);
      alert("Payment submission failed");
    } finally {
      setLoading(false);
    }
  };

  /* ================= HANDLERS ================= */
  const handleChange = (e) => {
    const { name, value, files } = e.target;

    setFormData({
      ...formData,
      [name]: files ? files[0] : value,
    });
  };

  /* ================= UI ================= */
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-200 px-4">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-md overflow-hidden">

        {/* HEADER */}
        <div className="border-b px-6 py-4">
          <h2 className="text-lg font-semibold">Pay with QR</h2>
          <p className="text-sm text-gray-500 mt-1">
            Amount to Pay:
            <span className="text-blue-600 font-bold ml-2">
              ₹ {payAmount}
            </span>
          </p>
        </div>

        {/* QR SECTION */}
        <div className="bg-[#0f172a] flex flex-col items-center py-6">
          <div className="bg-white p-3 rounded-lg">
            <img src={qrImage} alt="QR" className="w-56 h-56 object-contain" />
          </div>
          <p className="text-white mt-4 font-semibold">Course Payment</p>
          <p className="text-gray-300 text-sm capitalize">
            {courseName || slug.replace("-", " ")}
          </p>
        </div>

        {/* FORM / SUCCESS */}
        <div className="px-6 py-6">
          {submitted ? (
            <div className="text-center py-6">
              <h3 className="text-green-600 text-xl font-semibold mb-2">
                ✅ Payment Submitted Successfully
              </h3>
              <p className="text-gray-600 text-sm">
                We will verify your payment and contact you shortly.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">

              {/* Name */}
              <div>
                <label className="text-sm font-medium">Full Name *</label>
                <input
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full mt-1 border rounded-lg px-3 py-2"
                />
                {errors.name && (
                  <p className="text-red-500 text-xs mt-1">{errors.name}</p>
                )}
              </div>

              {/* Phone */}
              <div>
                <label className="text-sm font-medium">Contact Number *</label>
                <input
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full mt-1 border rounded-lg px-3 py-2"
                />
                {errors.phone && (
                  <p className="text-red-500 text-xs mt-1">{errors.phone}</p>
                )}
              </div>

              {/* Transaction ID */}
              <div>
                <label className="text-sm font-medium">Transaction ID *</label>
                <input
                  name="transactionId"
                  value={formData.transactionId}
                  onChange={handleChange}
                  className="w-full mt-1 border rounded-lg px-3 py-2"
                  placeholder="Minimum 10 characters"
                />
                {errors.transactionId && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.transactionId}
                  </p>
                )}
              </div>

              {/* Screenshot */}
              <div>
                <label className="text-sm font-medium">
                  Payment Screenshot *
                </label>
                <input
                  type="file"
                  name="screenshot"
                  onChange={handleChange}
                  className="w-full mt-1 text-sm"
                />
                {errors.screenshot && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.screenshot}
                  </p>
                )}
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-green-600 text-white rounded-lg py-2 font-semibold hover:bg-green-700 disabled:opacity-60"
              >
                {loading ? "Submitting..." : "Submit Payment"}
              </button>

            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default QrPage;
