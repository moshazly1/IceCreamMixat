import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useLogin from "./hooks/useLogin";
import { useAuth } from "../Auth/AuthContext";
import "./Login.css";

export default function Login() {
  const navigate = useNavigate();

  const { login, loading, error } = useLogin();
  const { setLoginData } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      return;
    }

    try {
      const response = await login(email, password);

      setLoginData(response?.user, response?.accessToken);

      navigate("/dashboard", {
        replace: true,
      });
    } catch (err) {
      console.error("Login failed:", err);
    }
  };

  return (
    <div className="dashboard-login-page">
      <div className="dashboard-login-card">
        <div className="dashboard-login-header">
          <h1>Welcome Back</h1>
          <p>Login to access your dashboard</p>
        </div>

        <form className="dashboard-login-form" onSubmit={handleSubmit}>
          <div className="dashboard-login-field">
            <label htmlFor="email">Email</label>

            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              autoComplete="email"
              disabled={loading}
            />
          </div>

          <div className="dashboard-login-field">
            <label htmlFor="password">Password</label>

            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              autoComplete="current-password"
              disabled={loading}
            />
          </div>

          {error && (
            <div className="dashboard-login-error">
              Login failed. Please check your email and password.
            </div>
          )}

          <button
            type="submit"
            className="dashboard-login-button"
            disabled={loading || !email || !password}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
}
