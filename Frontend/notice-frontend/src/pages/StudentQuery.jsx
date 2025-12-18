import { useState } from "react";
import api from "../services/api";

const StudentQuery = () => {
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [studentName, setStudentName] = useState("");
  const [studentEmail, setStudentEmail] = useState("");
  const [file, setFile] = useState(null);

  const token = localStorage.getItem("token");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append(
      "data",
      new Blob(
        [
          JSON.stringify({
            subject,
            message,
            studentName,
            studentEmail,
          }),
        ],
        { type: "application/json" }
      )
    );

    if (file) {
      formData.append("file", file);
    }

    try {
      await api.post("/api/queries", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      alert("Query submitted successfully ✅");
      setSubject("");
      setMessage("");
      setFile(null);
    } catch (err) {
      alert("Failed to submit query ❌");
      console.error(err);
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10 bg-zinc-900 p-6 rounded-lg">
      <h2 className="text-xl text-white mb-4">Raise a Query</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          className="w-full p-2 rounded bg-zinc-800 text-white"
          placeholder="Subject"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
        />

        <textarea
          className="w-full p-2 rounded bg-zinc-800 text-white"
          placeholder="Message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />

        <input
          className="w-full p-2 rounded bg-zinc-800 text-white"
          placeholder="Your Name"
          value={studentName}
          onChange={(e) => setStudentName(e.target.value)}
        />

        <input
          className="w-full p-2 rounded bg-zinc-800 text-white"
          placeholder="Your Email"
          value={studentEmail}
          onChange={(e) => setStudentEmail(e.target.value)}
        />

        <input
          type="file"
          className="text-white"
          accept=".pdf,image/*"
          onChange={(e) => setFile(e.target.files[0])}
        />

        <button
          type="submit"
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white p-2 rounded"
        >
          Submit Query
        </button>
      </form>
    </div>
  );
};

export default StudentQuery;
