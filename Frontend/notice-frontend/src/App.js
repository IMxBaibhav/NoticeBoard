import { useEffect, useState } from "react";
import { getNotices } from "./services/noticeService";

function App() {
  const [notices, setNotices] = useState([]);

  useEffect(() => {
    getNotices()
      .then((res) => {
        setNotices(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div style={{ padding: 20 }}>
      <h1>Notice Board</h1>
      {notices.map((notice) => (
        <div key={notice.id} style={{ border: "1px solid #ccc", padding: 10, margin: 10 }}>
          <h2>{notice.title}</h2>
          <p>{notice.description}</p>
        </div>
      ))}
    </div>
  );
}

export default App;
