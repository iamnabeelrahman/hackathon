import React, { useState } from "react";
import {
  Rocket,
  Trophy,
  ArrowLeft,
  Mail,
  Lock,
  User,
  KeyRound,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function Login({
  // handleSubmit,
  setCurrentPage,
  // name,
  // setName,
  // email,
  // setEmail,
  // password,
  // setPassword,
  // confirmPassword,
  // setConfirmPassword,
  setCurrentStuff,
}) {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    setIsSubmitting(true);
    e.preventDefault();
    const response = await axios.post(
      "https://api-backend-projectpal-6gsq.onrender.com/api/v1/auth/login",
      {
        email: email,
        password,
      }
    );

    alert(response.data.message || "Logged in successfully!");
    setIsSubmitting(false);
    console.log("User data:", response.data.user);
    localStorage.setItem("accessToken", response.data.accessToken);
    return navigate("/dash");
  };
  return (
    <div className="login-container">
      <Rocket className="rocket rocket-1" size={48} />
      <Rocket className="rocket rocket-2" size={48} />

      <div className="login-card">
        <button className="back-button">
          <Link to={"/"} className="flex gap-2">
            <ArrowLeft size={20} /> Back to Home
          </Link>
        </button>

        <div className="login-header">
          <Trophy size={32} className="login-logo" />
          <h1>Welcome Back</h1>
          <p>Continue your journey to success</p>
        </div>

        <form onSubmit={handleLogin} className="login-form">
          <div className="form-group">
            <label>
              <Mail size={18} />
              <input
                type="email"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </label>
          </div>

          <div className="form-group">
            <label>
              <Lock size={18} />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </label>
          </div>

          <div className="form-options">
            <label className="remember-me">
              <input type="checkbox" />
              <span>Remember me</span>
            </label>
            <button
              type="button"
              onClick={() => setCurrentPage("forgot")}
              className="forgot-password"
            >
              Forgot password?
            </button>
          </div>

          <button type="submit" className="login-button">
            {isSubmitting ? "Signing in..." : "Sign In"}
          </button>

          <p className="signup-prompt">
            Don't have an account?{" "}
            <button
              type="button"
              onClick={() => setCurrentStuff("signup")}
              className="text-button"
            >
              Sign up
            </button>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Login;
