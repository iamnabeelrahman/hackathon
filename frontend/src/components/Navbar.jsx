import { Trophy } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Profile from "./Profile/Profile";

function Navbar({ isLoggedIn, userData }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <nav className="nav">
        <Link to={"/"} className="nav-brand">
          <Trophy size={24} />
          AuraConnect
        </Link>

        <div className="nav-links">
          {isLoggedIn ? (
            <>
              <button
                className="nav-link login-btn"
              >
                <Link to={"/dash"}>Join Latest Projects</Link>
              </button>
              <button
                className="nav-link login-btn"
                onClick={() => setIsModalOpen(!isModalOpen)}
              >
                Account
              </button>
            </>
          ) : (
            <button className="nav-link login-btn">
              <Link to={"/auth"}>SIGNUP</Link>
            </button>
          )}
        </div>
      </nav>

      {isModalOpen && (
        <Profile isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} userData={userData} />
      )}
    </>
  );
}

export default Navbar;
