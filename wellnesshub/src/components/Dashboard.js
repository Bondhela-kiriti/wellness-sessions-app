import { useEffect, useState } from "react";
import API from "../api";

export default function Dashboard() {
  const [sessions, setSessions] = useState([]);

  useEffect(() => {
    const fetchSessions = async () => {
      try {
        const res = await API.get("/sessions");
        setSessions(res.data);
      } catch (err) {
        console.error("Error fetching sessions:", err);
      }
    };
    fetchSessions();
  }, []);

  return (
    <div style={{ maxWidth: "600px", margin: "auto" }} className="sessions-container">
      <h2>Published Wellness Sessions</h2>
      {sessions.length === 0 ? (
        <p>No sessions published yet.</p>
      ) : (
        sessions.map((s) => (
          <div
            key={s._id}
            style={{ border: "1px solid gray", margin: "8px", padding: "10px"  }}
        className="session-card"  >
            <h3>{s.title}</h3>
            <p>Tags: {s.tags.join(", ")}</p>
            <a href={s.json_file_url} target="_blank" rel="noreferrer">
              JSON File
            </a>
          </div>
        ))
      )}
    </div>
  );
}


