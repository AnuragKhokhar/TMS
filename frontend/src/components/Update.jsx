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
  const [userData, setUserData] = useState(null); // Initialize as null

  const navigate = useNavigate();
  const { id } = useParams();

  const getUserData = async () => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/user/userdetails/${id}`,
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
    } catch (err) {
      console.error("Failed to fetch user data", err);
      setError("Failed to fetch user data");
    }
  };

  useEffect(() => {
    getUserData();
  }, []);

  const handleEdit = async (event) => {
    event.preventDefault();

    const addUser = { name, course, venue, startDate, endDate };
    try {
      const response = await fetch(
        `http://localhost:5000/api/user/updateuser/${id}`,
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
    } catch (err) {
      console.error("Failed to update user data", err);
      setError("Failed to update user data");
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

      <h2>Edit the Data</h2>

      <form onSubmit={handleEdit}>
        <div className="mb-3">
          <label className="form-label">Name of the Staff</label>
          <input
            name="name"
            type="text"
            className="form-control"
            value={name} // Use state variable
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Name of the Course</label>
          <input
            name="course"
            type="text"
            className="form-control"
            value={course} // Use state variable
            onChange={(e) => setCourse(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Venue</label>
          <input
            name="venue"
            type="text"
            className="form-control"
            value={venue} // Use state variable
            onChange={(e) => setVenue(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Start Date</label>
          <input
            name="startDate"
            type="date"
            className="form-control"
            value={startDate} // Use state variable
            onChange={(e) => setStartDate(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">End Date</label>
          <input
            name="endDate"
            type="date"
            className="form-control"
            value={endDate} // Use state variable
            onChange={(e) => setEndDate(e.target.value)}
          />
        </div>

        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
}

export default Update;
