import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import API from "../api";

export default function SessionEditor() {
  const { id } = useParams(); // editing existing if id exists
  const [title, setTitle] = useState("");
  const [tags, setTags] = useState("");
  const [jsonFileUrl, setJsonFileUrl] = useState("");
  const [message, setMessage] = useState("");

  // If editing, load session data
  useEffect(() => {
    const fetchSession = async () => {
      if (!id) return;
      try {
        const token = localStorage.getItem("token");
        const res = await API.get(`/sessions/my/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const s = res.data;
        setTitle(s.title);
        setTags(s.tags.join(", "));
        setJsonFileUrl(s.json_file_url);
      } catch (err) {
        console.error("Error fetching session:", err);
      }
    };
    fetchSession();
  }, [id]);

  // Auto-save draft (new or existing)
  useEffect(() => {
    if (!title && !tags && !jsonFileUrl) return;

    const timeout = setTimeout(async () => {
      try {
        const token = localStorage.getItem("token");
        await API.post(
          "/sessions/save-draft",
          {
            _id: id, // pass id if editing
            title,
            tags: tags.split(",").map((t) => t.trim()),
            json_file_url: jsonFileUrl,
          },
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setMessage("✅ Draft auto-saved!");
      } catch (err) {
        console.error("Auto-save error:", err);
        setMessage("❌ Failed to auto-save");
      }
    }, 5000);

    return () => clearTimeout(timeout);
  }, [title, tags, jsonFileUrl, id]);

  const handlePublish = async () => {
    try {
      const token = localStorage.getItem("token");
      await API.post(
        "/sessions/publish",
        {
          _id: id, // publish existing draft if editing
          title,
          tags: tags.split(",").map((t) => t.trim()),
          json_file_url: jsonFileUrl,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert("✅ Session published!");
    } catch (err) {
      console.error("Publish error:", err);
      alert("❌ Failed to publish");
    }
  };

  return (
    <div style={{ maxWidth: "500px", margin: "auto" }}>
      <h2>{id ? "Edit Session" : "Create New Session"}</h2>

      <input
        type="text"
        placeholder="Session Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        style={{ width: "100%", marginBottom: "10px" }}
      />

      <input
        type="text"
        placeholder="Tags (comma-separated)"
        value={tags}
        onChange={(e) => setTags(e.target.value)}
        style={{ width: "100%", marginBottom: "10px" }}
      />

      <input
        type="text"
        placeholder="JSON File URL"
        value={jsonFileUrl}
        onChange={(e) => setJsonFileUrl(e.target.value)}
        style={{ width: "100%", marginBottom: "10px" }}
      />

      <button onClick={handlePublish} style={{ padding: "10px 20px" }}>
        Publish
      </button>

      {message && <p>{message}</p>}
    </div>
  );
}
