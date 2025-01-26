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

function Signup({ setCurrentStuff }) {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    setIsSubmitting(true);
    e.preventDefault();

    if (username.length < 5) {
      setError("Username must be at least 5 characters long.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match!");
      return;
    }

    setError("");

    try {
      const response = await axios.post(
        "https://api-backend-projectpal-6gsq.onrender.com/api/v1/auth/register",
        {
          email,
          password,
          username,
          fullName: name,
        }
      );

      alert(response.data.message || "Registered successfully!");
      setIsSubmitting(false);
      setCurrentStuff("login");
    } catch (error) {
      setIsSubmitting(false);
      console.error("Error:", error.response?.data?.message || error.message);
      setError(error.response?.data?.message || "An error occurred");
    }
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
          <h1>Join Projectpal</h1>
          <p>Start your journey to success</p>
        </div>

        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label>
              <User size={18} />
              <input
                type="text"
                placeholder="Full name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </label>
          </div>

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
              <User size={18} />
              <input
                type="text"
                placeholder="Username (min. 5 characters)"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
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

          <div className="form-group">
            <label>
              <KeyRound size={18} />
              <input
                type="password"
                placeholder="Confirm password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </label>
          </div>

          {error && <p className="error-message">{error}</p>}

          <button type="submit" className="login-button">
            { isSubmitting ? 'Creating Account...' : 'Create Account'}
          </button>

          <p className="signup-prompt">
            Already have an account?{" "}
            <button
              type="button"
              onClick={() => setCurrentStuff("login")}
              className="text-button"
            >
              Sign in
            </button>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Signup;
