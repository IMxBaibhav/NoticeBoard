import React, { useEffect, useState } from "react";
import { getNotices, createNotice, deleteNotice } from "./services/noticeService";

function App() {
  const [notices, setNotices] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  useEffect(() => {
    loadNotices();
  }, []);

  const loadNotices = async () => {
    try {
      const res = await getNotices();
      console.log("API RESPONSE:", res.data);  // Debug
      setNotices(res.data);   // FIXED
    } catch (err) {
      console.error("Error loading notices:", err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await createNotice({ title, content });
    setTitle("");
    setContent("");
    loadNotices();
  };

  const handleDelete = async (id) => {
    await deleteNotice(id);
    loadNotices();
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center p-4">
      <div className="w-full max-w-xl">

        {/* Header */}
        <h1 className="text-4xl font-bold text-center mb-6 text-blue-600 drop-shadow">
          Notice Board
        </h1>

        {/* Create Notice Form */}
        <form
          className="bg-white shadow-xl rounded-xl p-6 mb-6 space-y-4"
          onSubmit={handleSubmit}
        >
          <input
            type="text"
            placeholder="Notice Title"
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />

          <textarea
            placeholder="Write your notice..."
            className="w-full p-3 border rounded-lg h-28 resize-none focus:ring-2 focus:ring-blue-400 outline-none"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          ></textarea>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white p-3 rounded-lg text-lg hover:bg-blue-700 transition"
          >
            Add Notice
          </button>
        </form>

        {/* Notice List */}
        <div className="space-y-4">
          {Array.isArray(notices) && notices.length > 0 ? (
            notices.map((notice) => (
              <div
                key={notice.id}
                className="bg-white shadow-md p-4 rounded-xl hover:shadow-lg transition"
              >
                <h3 className="text-xl font-semibold text-gray-800">
                  {notice.title}
                </h3>
                <p className="text-gray-600 mt-2">{notice.content}</p>

                <button
                  onClick={() => handleDelete(notice.id)}
                  className="mt-4 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
                >
                  Delete
                </button>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500">No notices available.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
