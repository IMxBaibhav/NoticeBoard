import { useState } from "react";
import api from "../api/axios";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const res = await api.post("/auth/login", {
        username,
        password
      });
      localStorage.setItem("token", res.data.token);
      alert("Login successful");
    } catch {
      alert("Invalid credentials");
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center">
      <div className="bg-gray-800 p-6 rounded w-80">
        <h2 className="text-xl mb-4">Login</h2>
        <input
          className="w-full mb-2 p-2 bg-gray-700"
          placeholder="Username"
          onChange={e => setUsername(e.target.value)}
        />
        <input
          className="w-full mb-4 p-2 bg-gray-700"
          type="password"
          placeholder="Password"
          onChange={e => setPassword(e.target.value)}
        />
        <button
          onClick={handleLogin}
          className="w-full bg-blue-600 p-2 rounded"
        >
          Login
        </button>
      </div>
    </div>
  );
}
