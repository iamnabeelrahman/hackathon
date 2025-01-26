import { Rocket, Trophy } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";

function Landing({ setCurrentPage, isLoggedIn }) {
  return (
    <>
      <main className="hero">
        <Rocket className="rocket rocket-1" size={48} />
        <Rocket className="rocket rocket-2" size={48} />

        <h2 className="hero-subtitle">AURACONNECT.VERCEL.APP</h2>
        <h1 className="hero-title">
          Find your Team Members and Grow your Project Idea
        </h1>

        <button className="join-btn">
          {isLoggedIn ? (
            <Link className={""} to={"/dash"}>
              Participate in Projects
            </Link>
          ) : (
            <Link className={""} to={"/auth"}>
              Join AuraConnect
            </Link>
          )}
        </button>

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
            <div className="members-count">many action takers</div>
            <div>have joined AuraConnect</div>
          </div>
        </div>
      </main>

      <footer className="footer">
        <h2 className="footer-title">
          From <span>Idea</span> to the <span>Execution</span><span className="roc"> 🚀 </span><u>Build</u>{" "}
          or <u>Join</u> Your <span>Dream Team</span>
        </h2>
        <p className="footer-subtitle">
          Kickstart your hackathon journey by finding the perfect teammates,
          guidance, and collaboration opportunities — All in one place.
        </p>
        <div className="footer-links">
          <a href="/privacy" className="footer-link">
            Privacy Policy
          </a>
          <a href="/terms" className="footer-link">
            Terms and Conditions
          </a>
          <a href="/community" className="footer-link">
            Join our community!
          </a>
        </div>
      </footer>
    </>
  );
}

export default Landing;
