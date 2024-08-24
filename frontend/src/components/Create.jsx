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

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Frontend validation
    if (!name || !course || !venue || !startDate || !endDate) {
      setError("All fields are required.");
      return;
    }

    try {
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
        return;
      }

      setResponse(result.message);
      setError("");
      setName("");
      setCourse("");
      setVenue("");
      setStartDate("");
      setEndDate("");
      navigate("/");
    } catch (err) {
      console.error(err);
      setError("Failed to submit the form. Please try again.");
    }
  };

  return (
    <div className="container my-2">
      {error && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}
      {response && (
        <div className="alert alert-success" role="alert">
          {response}
        </div>
      )}

      <h2>Enter the Data</h2>

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Name of the Staff</label>
          <input
            name="name"
            type="text"
            className="form-control"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Name of the Course</label>
          <input
            name="course"
            type="text"
            className="form-control"
            value={course}
            onChange={(e) => setCourse(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Venue</label>
          <input
            name="venue"
            type="text"
            className="form-control"
            value={venue}
            onChange={(e) => setVenue(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Start Date</label>
          <input
            name="startDate"
            type="date"
            className="form-control"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">End Date</label>
          <input
            name="endDate"
            type="date"
            className="form-control"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            required
          />
        </div>

        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
}

export default Create;
