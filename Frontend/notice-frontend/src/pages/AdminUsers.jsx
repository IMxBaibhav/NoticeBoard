import { useState } from "react";
import axios from "axios";

export default function AdminUsers() {
  const [form, setForm] = useState({
    username: "",
    password: "",
    fullName: "",
    email: "",
    role: "TEACHER",
  });

  const submit = async (e) => {
    e.preventDefault();

    await axios.post(
      "http://localhost:8080/api/admin/create-user",
      form,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );

    alert("User created");
    setForm({ ...form, username: "", password: "" });
  };

  return (
    <div className="p-6 max-w-lg mx-auto">
      <h1 className="text-2xl mb-4">Create User</h1>

      <form onSubmit={submit} className="space-y-3">
        <input placeholder="Username" className="input" 
          onChange={(e)=>setForm({...form,username:e.target.value})} />

        <input placeholder="Password" type="password" className="input"
          onChange={(e)=>setForm({...form,password:e.target.value})} />

        <input placeholder="Full Name" className="input"
          onChange={(e)=>setForm({...form,fullName:e.target.value})} />

        <input placeholder="Email" className="input"
          onChange={(e)=>setForm({...form,email:e.target.value})} />

        <select className="input"
          onChange={(e)=>setForm({...form,role:e.target.value})}>
          <option value="TEACHER">Teacher</option>
          <option value="STUDENT">Student</option>
        </select>

        <button className="bg-blue-600 px-4 py-2 rounded">
          Create
        </button>
      </form>
    </div>
  );
}
