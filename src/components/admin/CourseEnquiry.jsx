import React, { useEffect, useState } from "react";
import axiosInstance from "../../utils/axiosInstance";

/* ================= DATE FORMATTER ================= */
const formatDate = (dateStr) => {
  if (!dateStr) return "-";

  const date = new Date(dateStr);
  if (isNaN(date)) return dateStr;

  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();

  return `${day}/${month}/${year}`;
};

function CourseEnquiry() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  /* ================= FETCH ENQUIRIES ================= */
  const fetchEnquiries = async () => {
    try {
      setLoading(true);

      const res = await axiosInstance.get("/admin/enquiries");

      const list = Array.isArray(res.data)
        ? res.data
        : res.data?.data || [];

      setUsers(list); // keep ALL enquiries
    } catch (err) {
      console.error(err);
      setError("Failed to load enquiries");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEnquiries();
  }, []);

  /* ================= ACCEPT ================= */
  const handleAccept = async (id) => {
    try {
      await axiosInstance.post(`/admin/enquiries/${id}/accept`);

      setUsers((prev) =>
        prev.map((u) =>
          u.id === id ? { ...u, status: "accepted" } : u
        )
      );
    } catch (err) {
      console.error(err.response || err);
      alert("Failed to accept enquiry");
    }
  };

  /* ================= REJECT ================= */
  const handleReject = async (id) => {
    if (!window.confirm("Are you sure you want to reject this enquiry?"))
      return;

    try {
      await axiosInstance.post(`/admin/enquiries/${id}/reject`);

      setUsers((prev) =>
        prev.map((u) =>
          u.id === id ? { ...u, status: "rejected" } : u
        )
      );
    } catch (err) {
      console.error(err.response || err);
      alert("Failed to reject enquiry");
    }
  };

  /* ================= STATUS BADGE ================= */
  const StatusBadge = ({ status }) => {
    if (status === "accepted")
      return (
        <span className="text-xs font-semibold text-green-700 bg-green-100 px-2 py-1 rounded">
          Accepted
        </span>
      );

    if (status === "rejected")
      return (
        <span className="text-xs font-semibold text-red-700 bg-red-100 px-2 py-1 rounded">
          Rejected
        </span>
      );

    return (
      <span className="text-xs font-semibold text-yellow-700 bg-yellow-100 px-2 py-1 rounded">
        Pending
      </span>
    );
  };

  return (
    <div className="text-gray-900 min-h-screen p-2 md:p-0">
      <div className="p-4">
        <h1 className="text-3xl font-semibold">Course Enquiries</h1>
      </div>

      {loading && (
        <p className="text-center text-gray-500">Loading enquiries...</p>
      )}

      {error && (
        <p className="text-center text-red-500">{error}</p>
      )}

      {!loading && !error && (
        <div className="px-2 md:px-3 py-4 flex justify-center">
          <div className="w-full overflow-x-auto">
            <table className="w-full text-md bg-white shadow-md rounded mb-4">
              {/* TABLE HEAD */}
              <thead className="hidden md:table-header-group">
                <tr className="border-b bg-gray-50">
                  <th className="text-left p-3 px-5">#</th>
                  <th className="text-left p-3 px-5">Name</th>
                  <th className="text-left p-3 px-5">Phone</th>
                  <th className="text-left p-3 px-5">Email</th>
                  <th className="text-left p-3 px-5">Date</th>
                  <th className="text-left p-3 px-5">Message</th>
                  <th className="text-center p-3 px-5">Status</th>
                  <th className="text-center p-3 px-5">Action</th>
                </tr>
              </thead>

              <tbody>
                {users.map((user, index) => (
                  <tr
                    key={user.id}
                    className="border-b block md:table-row bg-white md:bg-transparent mb-4 md:mb-0 rounded md:rounded-none shadow md:shadow-none"
                  >
                    {/* SERIAL */}
                    <td className="p-3 px-5 md:table-cell flex md:block justify-between">
                      <span className="font-semibold md:hidden">#</span>
                      {index + 1}
                    </td>

                    {/* NAME */}
                    <td className="p-3 px-5 md:table-cell flex md:block justify-between">
                      <span className="font-semibold md:hidden">Name</span>
                      {user.name}
                    </td>

                    {/* PHONE */}
                    <td className="p-3 px-5 md:table-cell flex md:block justify-between">
                      <span className="font-semibold md:hidden">Phone</span>
                      {user.phone}
                    </td>

                    {/* EMAIL */}
                    <td className="p-3 px-5 md:table-cell flex md:block justify-between">
                      <span className="font-semibold md:hidden">Email</span>
                      {user.email}
                    </td>

                    {/* DATE */}
                    <td className="p-3 px-5 md:table-cell flex md:block justify-between">
                      <span className="font-semibold md:hidden">Date</span>
                      {formatDate(user.date)}
                    </td>

                    {/* MESSAGE */}
                    <td className="p-3 px-5 md:table-cell">
                      <span className="font-semibold md:hidden block mb-1">
                        Message
                      </span>
                      <p className="text-sm text-gray-700 leading-relaxed">
                        {user.message || "-"}
                      </p>
                    </td>

                    {/* STATUS */}
                    <td className="p-3 px-5 md:table-cell text-center">
                      <StatusBadge status={user.status} />
                    </td>

                    {/* ACTION */}
                    <td className="p-3 px-5 md:table-cell">
                      <span className="font-semibold md:hidden block mb-2">
                        Action
                      </span>

                      <div className="flex gap-2">
                        <button
                          onClick={() => handleAccept(user.id)}
                          disabled={user.status !== "pending"}
                          className={`text-sm py-1 px-3 rounded text-white
                            ${
                              user.status === "pending"
                                ? "bg-green-500 hover:bg-green-700"
                                : "bg-gray-400 cursor-not-allowed"
                            }`}
                        >
                          Accept
                        </button>

                        <button
                          onClick={() => handleReject(user.id)}
                          disabled={user.status !== "pending"}
                          className={`text-sm py-1 px-3 rounded text-white
                            ${
                              user.status === "pending"
                                ? "bg-red-500 hover:bg-red-700"
                                : "bg-gray-400 cursor-not-allowed"
                            }`}
                        >
                          Reject
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}

                {users.length === 0 && (
                  <tr>
                    <td colSpan="8" className="text-center p-4 text-gray-500">
                      No enquiries found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}

export default CourseEnquiry;
