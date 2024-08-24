import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Create() {
  const [name, setName] = useState("");
  const [course, setCourse] = useState("");
  const [venue, setVenue] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [error, setError] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false); // Loading state

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Frontend validation
    if (!name || !course || !venue || !startDate || !endDate) {
      setError("All fields are required.");
      return;
    }

    try {
      setLoading(true); // Start loading
      const addUser = { name, course, venue, startDate, endDate };
      const apiResponse = await fetch("https://tms-st89.onrender.com/api/user/createuser", {
        method: "POST",
        body: JSON.stringify(addUser),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const result = await apiResponse.json();

      if (!apiResponse.ok) {
        setError(result.error || "Something went wrong");
        setLoading(false); // Stop loading
        return;
      }

      setResponse(result.message);
      setError("");
      setName("");
      setCourse("");
      setVenue("");
      setStartDate("");
      setEndDate("");
      setLoading(false); // Stop loading
      navigate("/");
    } catch (err) {
      console.error(err);
      setError("Failed to submit the form. Please try again.");
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

      <h2 className="text-2xl font-semibold mb-4">Enter the Data</h2>

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Name of the Staff</label>
          <input
            name="name"
            type="text"
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
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
            required
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
            required
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
            required
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
            required
          />
        </div>

        <button
          type="submit"
          className={`w-full p-2 rounded ${
            loading ? "bg-gray-400 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-600 text-white"
          }`}
          disabled={loading}
        >
          {loading ? "Submitting..." : "Submit"}
        </button>
      </form>
    </div>
  );
}

export default Create;
