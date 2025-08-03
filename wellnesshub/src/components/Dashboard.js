


import { useEffect, useState } from "react";
import API from "../api";

 const  Dashboard=()=> {
  const [sessions, setSessions] = useState([]);

  useEffect(() => {
    API.get("/sessions").then((res) => setSessions(res.data));
  }, []);

  return (
    <div>
      <h2>Published Sessions</h2>
      <ul>
        {sessions.map((s) => (
          <li key={s._id}>
            {s.title} — {s.tags.join(", ")}
          </li>
        ))}
      </ul>
    </div>
  );
}


export default Dashboard