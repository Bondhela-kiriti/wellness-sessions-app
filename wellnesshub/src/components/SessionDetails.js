import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../api";

export default function SessionDetails() {
  const { id } = useParams(); // gets :id from URL
  const [session, setSession] = useState(null);

  useEffect(() => {
    const fetchSession = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await API.get(`/sessions/my/${id}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setSession(res.data);
      } catch (err) {
        console.error("Error fetching session:", err);
      }
    };
    fetchSession();
  }, [id]);

  if (!session) return <p>Loading session...</p>;

  return (
    <div style={{ padding: "20px" }}>
      <h2>{session.title}</h2>
      <p><b>Status:</b> {session.status}</p>
      <p><b>Tags:</b> {session.tags.join(", ")}</p>
      <p>
        <b>JSON File:</b>{" "}
        <a href={session.json_file_url} target="_blank" rel="noreferrer">
          {session.json_file_url}
        </a>
      </p>
      <p><b>Last Updated:</b> {new Date(session.updated_at).toLocaleString()}</p>
    </div>
  );
}
