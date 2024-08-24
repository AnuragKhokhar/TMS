import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

function Read() {
  const [data, setData] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false); // Loading state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 15;
  const navigate = useNavigate();

  async function getData() {
    const response = await fetch("https://tms-st89.onrender.com/api/user/userlist", {
      method: "GET",
    });
    const result = await response.json();

    if (!response.ok) {
      setError(result.error);
    }
    if (response.ok) {
      setData(result.data);
      setError("");
    }
  }

  useEffect(() => {
    getData();
  }, []);

  const handleDelete = async (id) => {
    setLoading(true); // Start loading
    const response = await fetch(
      `https://tms-st89.onrender.com/api/user/deleteuser/${id}`,
      {
        method: "DELETE",
      }
    );
    const result = await response.json();

    if (!response.ok) {
      setError(result.error);
    }
    if (response.ok) {
      setError("Deleted Successfully");

      setTimeout(() => {
        setError("");
        getData();
      }, 2000);
    }
    setLoading(false); // Stop loading
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(data.length / itemsPerPage);

  const formatDateRange = (date) => {
    const dateParts = date.split("-");
    if (dateParts.length === 2) {
      const startDate = new Date(dateParts[0]);
      const endDate = new Date(dateParts[1]);

      const options = { day: "numeric", month: "long", year: "numeric" };
      const formattedStartDate = startDate.toLocaleDateString("en-US", options);
      const formattedEndDate = endDate.toLocaleDateString("en-US", options);

      const startDay = formattedStartDate.split(" ")[0];
      const [endDay, endMonthYear] = formattedEndDate.split(" ", 2);

      return `${startDay}-${endDay} ${endMonthYear}`;
    } else {
      const options = { day: "numeric", month: "long", year: "numeric" };
      return new Date(date).toLocaleDateString("en-US", options);
    }
  };

  return (
    <div className="container mx-auto my-8 p-4">
      {error && (
        <div className="bg-red-500 text-white p-4 rounded mb-4">
          {error}
        </div>
      )}

      <h2 className="text-3xl font-semibold text-center mb-6">Participation In Training Programs</h2>

      <div className="overflow-x-auto p-4 rounded-lg shadow-lg bg-white">
        <div className="flex justify-end mb-4">
          <button
            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
            onClick={() => navigate("/create")}
          >
            ADD STAFF
          </button>
        </div>
        <div className="px-5">
        <table className="min-w-full border-collapse border border-gray-300 rounded-lg overflow-hidden">
          <thead>
            <tr className="bg-green-400 text-white h-1">
              <th className="px-6 py-3 text-left border-b border-r border-gray-300">S.No.</th>
              <th className="px-6 py-3 text-left border-b border-r border-gray-300">Name of the Staff</th>
              <th className="px-6 py-3 text-left border-b border-r border-gray-300">Name of the Course</th>
              <th className="px-6 py-3 text-left border-b border-r border-gray-300">Venue</th>
              <th className="px-6 py-3 text-left border-b border-r border-gray-300 whitespace-nowrap">Start Date</th>
              <th className="px-6 py-3 text-left border-b border-r border-gray-300 whitespace-nowrap">End Date</th>
              <th className="px-6 py-3 text-left border-b border-gray-300">Action</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((training, index) => (
              <tr key={training._id} className="border-b border-gray-300 hover:bg-gray-100">
                <td className="px-6 py-4 border-r border-gray-300 font-semibold">{indexOfFirstItem + index + 1}</td>
                <td className="px-6 py-4 border-r border-gray-300 font-semibold">{training.name}</td>
                <td className="px-6 py-4 border-r border-gray-300 font-semibold">{training.course}</td>
                <td className="px-6 py-4 border-r border-gray-300 font-semibold">{training.venue}</td>
                <td className="px-6 py-4 border-r border-gray-300 font-semibold">
                  {formatDateRange(training.startDate)}
                </td>
                <td className="px-6 py-4 border-r border-gray-300 font-semibold">
                  {formatDateRange(training.endDate)}
                </td>
                <td className="px-6 py-4 flex space-x-4">
                  <Link
                    to={`/update/${training._id}`}
                    className="text-blue-500 hover:underline"
                  >
                    Edit
                  </Link>
                  <button
                    className="text-red-500 hover:underline"
                    onClick={() => handleDelete(training._id)}
                    disabled={loading} // Disable delete button when loading
                  >
                    {loading ? "Deleting..." : "Delete"} {/* Show loading text */}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        </div>
      </div>

      {/* Pagination */}
      <div className="flex justify-center mt-6">
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNumber) => (
          <button
            key={pageNumber}
            className={`px-3 py-1 mx-1 rounded ${
              pageNumber === currentPage
                ? "bg-blue-500 text-white"
                : "bg-gray-200 text-gray-700"
            }`}
            onClick={() => handlePageChange(pageNumber)}
          >
            {pageNumber}
          </button>
        ))}
      </div>
    </div>
  );
}

export default Read;
