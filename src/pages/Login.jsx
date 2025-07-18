import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const users = [
  { username: "admin", password: "123456" },
  { username: "user1", password: "abc123" },
];

function Login() {
  const [form, setForm] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    const matched = users.find(
      (u) =>
        u.username === form.username.trim() &&
        u.password === form.password.trim()
    );
    if (matched) {
      localStorage.setItem("loggedInUser", matched.username);
      navigate("/"); // chuyển hướng sau khi đăng nhập
    } else {
      setError("Sai tên đăng nhập hoặc mật khẩu!");
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: "auto", marginTop: 80 }}>
      <h2>Đăng nhập</h2>
      <input
        className="form-control mb-2"
        placeholder="Tên đăng nhập"
        value={form.username}
        onChange={(e) => setForm({ ...form, username: e.target.value })}
      />
      <input
        className="form-control mb-2"
        type="password"
        placeholder="Mật khẩu"
        value={form.password}
        onChange={(e) => setForm({ ...form, password: e.target.value })}
      />
      {error && <div style={{ color: "red", marginBottom: 8 }}>{error}</div>}
      <button className="btn btn-primary" onClick={handleLogin}>
        Đăng nhập
      </button>
    </div>
  );
}

export default Login;
