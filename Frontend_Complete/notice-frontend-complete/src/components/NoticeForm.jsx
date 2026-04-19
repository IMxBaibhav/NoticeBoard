import { useState } from "react";
import { createNotice } from "../services/noticeService";

export default function NoticeForm({ onSuccess }) {
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [file, setFile] = useState(null);

  const submit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", title);
    formData.append("message", message);
    if (file) formData.append("file", file);

    await createNotice(formData);

    setTitle("");
    setMessage("");
    setFile(null);
    onSuccess();
  };

  return (
    <form
      onSubmit={submit}
      className="bg-gray-900 p-6 rounded-xl space-y-4"
    >
      <input
        className="w-full p-3 bg-gray-800 rounded text-white"
        placeholder="Notice title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />

      <textarea
        className="w-full p-3 bg-gray-800 rounded text-white"
        placeholder="Notice message"
        rows="4"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        required
      />

      <input
        type="file"
        className="text-gray-300"
        onChange={(e) => setFile(e.target.files[0])}
      />

      <button className="bg-blue-600 px-6 py-2 rounded hover:bg-blue-700">
        Publish Notice
      </button>
    </form>
  );
}
