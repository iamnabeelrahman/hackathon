import { useEffect, useState } from "react";
import { Routes, Route, } from "react-router-dom";
import Auth from "./components/Auth/Auth";
import Landing from "./components/Landing";
import Dash from "./components/Dash/Dash";
import Navbar from "./components/Navbar";
import axios from "axios";
import PrivacyPolicy from "./components/PrivacyPolicy";
import TermsAndConditions from "./components/TermsCondition";

function App() {
  const [currentPage, setCurrentPage] = useState("home");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [currentStuff, setCurrentStuff] = useState("signup");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState({});

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      setIsLoggedIn(true);
      fetchUserData(token);
    }
  }, []);

  const fetchUserData = async (token) => {
    try {
      const response = await axios.get(
        "https://api-backend-projectpal-6gsq.onrender.com/api/v1/auth/user",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setUserData(response.data.user);
    } catch (error) {
      console.error("Error fetching user data:", error.response?.data?.message || error.message);
    }
  };

  return (
    <>
      <Navbar isLoggedIn={isLoggedIn} userData={userData} />
      <Routes>
        <Route
          path="/"
          element={
            <Landing
              setCurrentPage={setCurrentPage}
              isLoggedIn={isLoggedIn}
              setIsLoggedIn={setIsLoggedIn}
            />
          }
        />
        <Route
          path="/auth"
          element={
            <Auth
              setCurrentPage={setCurrentPage}
              name={name}
              setName={setName}
              username={username}
              setUsername={setUsername}
              email={email}
              setEmail={setEmail}
              password={password}
              setPassword={setPassword}
              confirmPassword={confirmPassword}
              setConfirmPassword={setConfirmPassword}
              currentStuff={currentStuff}
              setCurrentStuff={setCurrentStuff}
              userData={userData}
              setUserData={setUserData}
            />
          }
        />
        <Route path="/dash" element={<Dash userData={userData} />} />
        <Route path="/privacy" element={<PrivacyPolicy />} />
        <Route path="/termsandcondition" element={<TermsAndConditions />} />
      </Routes>
    </>
  );
}

export default App;