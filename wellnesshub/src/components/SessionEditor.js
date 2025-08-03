import { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../api";

export default function SessionEditor() {
  const { id } = useParams(); // session id if editing
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [tags, setTags] = useState("");
  const [jsonUrl, setJsonUrl] = useState("");
  const [status, setStatus] = useState("draft");
  const [message, setMessage] = useState("");
  const saveTimer = useRef(null);

  // Load session if editing
  useEffect(() => {
    const fetchSession = async () => {
      if (!id) return;
      try {
        const token = localStorage.getItem("token");
        const res = await API.get(`/sessions/my/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setTitle(res.data.title);
        setTags(res.data.tags.join(", "));
        setJsonUrl(res.data.json_file_url);
        setStatus(res.data.status);
      } catch (err) {
        console.error("Error loading session:", err.response?.data || err.message);
        setMessage("❌ Failed to load session");
      }
    };
    fetchSession();
  }, [id]);

  // Auto-save after 5s inactivity
  const handleAutoSave = () => {
    if (saveTimer.current) clearTimeout(saveTimer.current);
    saveTimer.current = setTimeout(() => saveDraft(), 5000);
  };

  const saveDraft = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setMessage("❌ You must be logged in");
        return;
      }

      const payload = {
        title,
        tags: tags ? tags.split(",").map((t) => t.trim()) : [],
        json_file_url: jsonUrl,
      };

      if (id) payload._id = id;

      const res = await API.post("/sessions/save-draft", payload, {
        headers: { Authorization: `Bearer ${token}` },
      });

      console.log("✅ Draft saved:", res.data);
      setMessage("✅ Draft saved");
      setStatus("draft");

      if (!id) navigate(`/editor/${res.data._id}`);
    } catch (err) {
      console.error("Error saving draft:", err.response?.data || err.message);
      setMessage("❌ Failed to save draft");
    }
  };

  const handlePublish = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setMessage("❌ You must be logged in");
        return;
      }

      const payload = {
        _id: id, // required for publish
        title,
        tags: tags ? tags.split(",").map((t) => t.trim()) : [],
        json_file_url: jsonUrl,
      };

      const res = await API.post("/sessions/publish", payload, {
        headers: { Authorization: `Bearer ${token}` },
      });

      console.log("✅ Session published:", res.data);
      alert("✅ Session published!");
      navigate("/my-sessions");
    } catch (err) {
      console.error("Publish error:", err.response?.data || err.message);
      setMessage("❌ Failed to publish session");
    }
  };

  return (
    <div style={{ maxWidth: "500px", margin: "auto", padding: "20px" }}>
      <h2>{id ? "Edit Session" : "Create Session"}</h2>
      {message && (
        <p style={{ color: message.includes("❌") ? "red" : "green" }}>{message}</p>
      )}
      <form>
        <input
          type="text"
          placeholder="Session Title"
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
            handleAutoSave();
          }}
          required
          style={{ width: "100%", marginBottom: "10px", padding: "8px" }}
        />
        <input
          type="text"
          placeholder="Tags (comma separated)"
          value={tags}
          onChange={(e) => {
            setTags(e.target.value);
            handleAutoSave();
          }}
          style={{ width: "100%", marginBottom: "10px", padding: "8px" }}
        />
        <input
          type="text"
          placeholder="JSON File URL"
          value={jsonUrl}
          onChange={(e) => {
            setJsonUrl(e.target.value);
            handleAutoSave();
          }}
          style={{ width: "100%", marginBottom: "10px", padding: "8px" }}
        />
        <div>
          <button
            type="button"
            onClick={saveDraft}
            style={{ marginRight: "10px", padding: "8px 16px" }}
          >
            Save Draft
          </button>
          <button
            type="button"
            onClick={handlePublish}
            style={{
              padding: "8px 16px",
              background: "green",
              color: "white",
              border: "none",
              cursor: "pointer",
            }}
          >
            Publish
          </button>
        </div>
      </form>
      <p>Status: {status}</p>
    </div>
  );
}
