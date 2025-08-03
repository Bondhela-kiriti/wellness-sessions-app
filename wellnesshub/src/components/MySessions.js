import API from "../api";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function MySessions() {
  const [sessions, setSessions] = useState([]);

  const fetchMySessions = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await API.get("/sessions/my", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setSessions(res.data);
    } catch (err) {
      console.error("Error fetching my sessions:", err);
    }
  };

  useEffect(() => {
    fetchMySessions();
  }, []);

  const handlePublish = async (id) => {
    try {
      const token = localStorage.getItem("token");
      await API.post(
        "/sessions/publish",
        { _id: id },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert("✅ Session published!");
      fetchMySessions();
    } catch (err) {
      console.error("Publish error:", err);
      alert("❌ Failed to publish");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this session?")) return;

    try {
      const token = localStorage.getItem("token");
      await API.delete(`/sessions/my/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert("✅ Session deleted!");
      fetchMySessions();
    } catch (err) {
      console.error("Delete error:", err);
      alert("❌ Failed to delete");
    }
  };

  return (
    <div style={{ maxWidth: "600px", margin: "auto" }} className="my-sessions-container">
      <h2>My Sessions</h2>
      {sessions.length === 0 ? (
        <p>You have no sessions yet.</p>
      ) : (
        sessions.map((s) => (
          <div
            key={s._id}
            style={{
              border: "1px solid gray",
              margin: "8px",
              padding: "10px",
              borderRadius: "8px",
            }}
        className="session-item"   >
            <h3>{s.title}</h3>
            <p>Status: {s.status}</p>
            <p>Tags: {s.tags.join(", ")}</p>
            <Link to={`/my-sessions/${s._id}`}>View Details</Link>
            <Link to={`/editor/${s._id}`} style={{ marginLeft: "10px" }}>
              Edit
            </Link>
            {s.status === "draft" && (
              <button
                onClick={() => handlePublish(s._id)}
                style={{ marginLeft: "10px" }}
              >
                Publish Now
              </button>
            )}
            <button
              onClick={() => handleDelete(s._id)}
              style={{
                marginLeft: "10px",
                background: "red",
                color: "white",
                border: "none",
                padding: "6px 12px",
                cursor: "pointer",
                borderRadius: "4px",
              }}
            >
              Delete
            </button>
          </div>
        ))
      )}
    </div>
  );
}
