import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

function Update() {
  const [name, setName] = useState("");
  const [course, setCourse] = useState("");
  const [venue, setVenue] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [error, setError] = useState("");
  const [response, setResponse] = useState("");
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(false); // Loading state

  const navigate = useNavigate();
  const { id } = useParams();

  const getUserData = async () => {
    try {
      setLoading(true); // Start loading
      const response = await fetch(
        `https://tms-st89.onrender.com/api/user/userdetails/${id}`,
        {
          method: "GET",
        }
      );
      const result = await response.json();

      if (!response.ok) {
        console.error(result.error);
        setError(result.error);
      } else {
        console.log(result);
        setUserData(result.data);

        // Set default form values from the fetched data
        setName(result.data?.name || "");
        setCourse(result.data?.course || "");
        setVenue(result.data?.venue || "");
        setStartDate(result.data?.startDate || "");
        setEndDate(result.data?.endDate || "");
      }
      setLoading(false); // Stop loading
    } catch (err) {
      console.error("Failed to fetch user data", err);
      setError("Failed to fetch user data");
      setLoading(false); // Stop loading
    }
  };

  useEffect(() => {
    getUserData();
  }, []);

  const handleEdit = async (event) => {
    event.preventDefault();

    const addUser = { name, course, venue, startDate, endDate };
    try {
      setLoading(true); // Start loading
      const response = await fetch(
        `https://tms-st89.onrender.com/api/user/updateuser/${id}`,
        {
          method: "PATCH",
          body: JSON.stringify(addUser),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const result = await response.json();

      if (!response.ok) {
        console.error(result.error);
        setError(result.error);
      } else {
        console.log(result);
        setResponse(result.message);
        setError("");

        // Clear form fields
        setName("");
        setCourse("");
        setVenue("");
        setStartDate("");
        setEndDate("");

        navigate("/");
      }
      setLoading(false); // Stop loading
    } catch (err) {
      console.error("Failed to update user data", err);
      setError("Failed to update user data");
      setLoading(false); // Stop loading
    }
  };

  return (
    <div className="container mx-auto my-4 p-4 max-w-lg">
      {error && (
        <div className="mb-4 p-4 text-red-700 bg-red-100 border border-red-400 rounded">
          {error}
        </div>
      )}
      {response && (
        <div className="mb-4 p-4 text-green-700 bg-green-100 border border-green-400 rounded">
          {response}
        </div>
      )}

      <h2 className="text-2xl font-semibold mb-4">Edit the Data</h2>

      <form onSubmit={handleEdit}>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Name of the Staff</label>
          <input
            name="name"
            type="text"
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
            value={name}
            onChange={(e) => setName(e.target.value)}
            disabled={loading} // Disable input during loading
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Name of the Course</label>
          <input
            name="course"
            type="text"
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
            value={course}
            onChange={(e) => setCourse(e.target.value)}
            disabled={loading} // Disable input during loading
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Venue</label>
          <input
            name="venue"
            type="text"
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
            value={venue}
            onChange={(e) => setVenue(e.target.value)}
            disabled={loading} // Disable input during loading
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Start Date</label>
          <input
            name="startDate"
            type="date"
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            disabled={loading} // Disable input during loading
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">End Date</label>
          <input
            name="endDate"
            type="date"
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            disabled={loading} // Disable input during loading
          />
        </div>

        <button
          type="submit"
          className={`w-full p-2 rounded ${
            loading ? "bg-gray-400 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-600 text-white"
          }`}
          disabled={loading} // Disable button during loading
        >
          {loading ? "Loading..." : "Submit"}
        </button>
      </form>
    </div>
  );
}

export default Update;
