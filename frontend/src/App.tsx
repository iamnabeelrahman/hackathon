import React, { useState } from 'react';
import { Rocket, Trophy, ArrowLeft, Mail, Lock } from 'lucide-react';

function App() {
  const [isLoginPage, setIsLoginPage] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle login logic here
  };

  if (isLoginPage) {
    return (
      <div className="login-container">
        <Rocket className="rocket rocket-1" size={48} />
        <Rocket className="rocket rocket-2" size={48} />
        
        <div className="login-card">
          <button onClick={() => setIsLoginPage(false)} className="back-button">
            <ArrowLeft size={20} /> Back to Home
          </button>
          
          <div className="login-header">
            <Trophy size={32} className="login-logo" />
            <h1>Welcome Back</h1>
            <p>Continue your journey to success</p>
          </div>

          <form onSubmit={handleSubmit} className="login-form">
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
              <a href="/forgot-password" className="forgot-password">Forgot password?</a>
            </div>

            <button type="submit" className="login-button">
              Sign In
            </button>

            <p className="signup-prompt">
              Don't have an account? <a href="/signup">Sign up</a>
            </p>
          </form>
        </div>
      </div>
    );
  }

  return (
    <>
      <nav className="nav">
        <a href="/" className="nav-brand">
          <Trophy size={24} />
          Solvearn
        </a>
        <div className="nav-links">
          <a href="/faqs" className="nav-link">FAQs</a>
          <a href="/blogs" className="nav-link">Blogs</a>
          <a href="/login" className="nav-link login-btn" onClick={(e) => {
            e.preventDefault();
            setIsLoginPage(true);
          }}>LOGIN</a>
        </div>
      </nav>

      <main className="hero">
        <Rocket className="rocket rocket-1" size={48} />
        <Rocket className="rocket rocket-2" size={48} />
        
        <h2 className="hero-subtitle">SOLVEARN.NET</h2>
        <h1 className="hero-title">
          Find your Team Members and Grow your Startup Idea
        </h1>
        
        <a href="/join" className="join-btn">
          Join Solvearn
        </a>

        <div className="members">
          <div className="members-avatars">
            <img 
              src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop" 
              alt="Member" 
              className="member-avatar"
            />
            <img 
              src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop" 
              alt="Member" 
              className="member-avatar"
            />
            <img 
              src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop" 
              alt="Member" 
              className="member-avatar"
            />
            <img 
              src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop" 
              alt="Member" 
              className="member-avatar"
            />
          </div>
          <div className="members-text">
            <div className="members-count">50262 action takers</div>
            <div>have joined Solvearn</div>
          </div>
        </div>
      </main>

      <footer className="footer">
        <h2 className="footer-title">
          From <span style={{ color: '#ffd700' }}>Idea</span> to Funded <span style={{ color: '#ffd700' }}>Startup</span> 🚀 <u>Build</u> or <u>Join</u> Your <span style={{ color: '#ffd700' }}>Dream Team</span>
        </h2>
        <p className="footer-subtitle">
          Kickstart your journey with the right team, advice and investor exposure - All in one place.
        </p>
        <div className="footer-links">
          <a href="/privacy" className="footer-link">Privacy Policy</a>
          <a href="/terms" className="footer-link">Terms and Conditions</a>
          <a href="/community" className="footer-link">Join our community!</a>
        </div>
      </footer>
    </>
  );
}

export default App;
