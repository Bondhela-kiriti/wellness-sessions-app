import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../api";

export default function SessionDetails() {
  const { id } = useParams();
  const [session, setSession] = useState(null);

  useEffect(() => {
    const fetchSession = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await API.get(`/sessions/my/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
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
    <div style={{ maxWidth: "600px", margin: "auto" }}>
      <h2>{session.title}</h2>
      <p>Status: {session.status}</p>
      <p>Tags: {session.tags.join(", ")}</p>
      <a href={session.json_file_url} target="_blank" rel="noreferrer">
        View JSON File
      </a>
    </div>
  );
}
