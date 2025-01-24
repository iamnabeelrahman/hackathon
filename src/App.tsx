import React from 'react';
import { Rocket, Trophy } from 'lucide-react';

function App() {
  return (
    <>
      <nav className="nav">
        <a href="/" className="nav-brand">
          <Trophy size={24} />
          Projectpal
        </a>
        <div className="nav-links">
          <a href="/login" className="nav-link login-btn">owifncwn</a>
        </div>
      </nav>

      <main className="hero">
        <Rocket className="rocket rocket-1" size={48} />
        <Rocket className="rocket rocket-2" size={48} />
        
        <h2 className="hero-subtitle">PROJECTPAL.NET</h2>
        <h1 className="hero-title">
          Find your Team Members and Grow your Startup Idea
        </h1>
        
        <a href="/join" className="join-btn">
          Join Projectpal
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
            <div>have joined Projectpal</div>
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