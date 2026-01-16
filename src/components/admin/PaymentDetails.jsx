import React, { useEffect, useState } from "react";
import axiosInstance from "../../utils/axiosInstance";

/* ================= DATE FORMAT ================= */
const formatDate = (dateStr) => {
  const date = new Date(dateStr);
  return date.toLocaleDateString("en-GB");
};

/* ================= STATUS BADGE ================= */
const StatusBadge = ({ status }) => {
  const base = "px-3 py-1 rounded text-xs font-semibold";

  if (status === "approved")
    return <span className={`${base} bg-green-100 text-green-700`}>Approved</span>;

  if (status === "rejected")
    return <span className={`${base} bg-red-100 text-red-700`}>Rejected</span>;

  return <span className={`${base} bg-yellow-100 text-yellow-700`}>Pending</span>;
};

const PaymentDetails = () => {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);

  /* ================= FETCH PAYMENTS ================= */
  const fetchPayments = async () => {
    try {
      const res = await axiosInstance.get("/admin/payments");
      setPayments(res.data || []);
    } catch (err) {
      console.error("Fetch payments failed", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPayments();
  }, []);

  /* ================= UPDATE STATUS ================= */
  const updateStatus = async (id, action) => {
    try {
      if (action === "approved") {
        await axiosInstance.post(`/admin/payments/${id}/approve`);
      } else if (action === "rejected") {
        await axiosInstance.post(`/admin/payments/${id}/reject`);
      }

      // update UI without reload
      setPayments((prev) =>
        prev.map((p) =>
          p.id === id ? { ...p, status: action } : p
        )
      );
    } catch (err) {
      console.error("Status update failed", err);
      alert("Failed to update payment status");
    }
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-semibold mb-6">Payment Details</h1>

      {loading ? (
        <p className="text-gray-500">Loading payments...</p>
      ) : (
        <div className="overflow-x-auto bg-white shadow rounded-lg">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-100 border-b text-left">
                <th className="p-4">#</th>
                <th className="p-4">Name</th>
                <th className="p-4">Phone</th>
                <th className="p-4">Transaction ID</th>
                <th className="p-4">Course</th>
                <th className="p-4">Amount</th>
                <th className="p-4">Date</th>
                <th className="p-4 text-center">Status</th>
                <th className="p-4 text-center">Screenshot</th>
              </tr>
            </thead>

            <tbody>
              {payments.length === 0 && (
                <tr>
                  <td colSpan="9" className="p-4 text-center text-gray-500">
                    No payment records found
                  </td>
                </tr>
              )}

              {payments.map((p, index) => (
                <tr key={p.id} className="border-b hover:bg-gray-50">
                  <td className="p-4">{index + 1}</td>
                  <td className="p-4">{p.name}</td>
                  <td className="p-4">{p.phone}</td>
                  <td className="p-4">{p.transaction_id}</td>
                  <td className="p-4">{p.course?.name}</td>
                  <td className="p-4 font-semibold">
                    ₹{p.course?.fees}
                  </td>
                  <td className="p-4">{formatDate(p.created_at)}</td>

                  {/* STATUS COLUMN */}
                  <td className="p-4 text-center">
                    {p.status === "pending" ? (
                      <select
                        className="border rounded px-2 py-1 text-sm"
                        defaultValue=""
                        onChange={(e) =>
                          updateStatus(p.id, e.target.value)
                        }
                      >
                        <option value="" disabled>
                          Select
                        </option>
                        <option value="approved">Approve</option>
                        <option value="rejected">Reject</option>
                      </select>
                    ) : (
                      <StatusBadge status={p.status} />
                    )}
                  </td>

                  {/* SCREENSHOT */}
                  <td className="p-4 text-center">
                    {p.payment_image ? (
                      <a
                        href={`http://192.168.1.13:8000/storage/${p.payment_image}`}
                        target="_blank"
                        rel="noreferrer"
                        className="text-blue-600 underline"
                      >
                        View
                      </a>
                    ) : (
                      "-"
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default PaymentDetails;
