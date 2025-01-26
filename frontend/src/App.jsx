import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import Auth from "./components/Auth/Auth";
import Landing from "./components/Landing";
import Dash from "./components/Dash/Dash";
import Profile from "./components/Profile/Profile";
import Navbar from "./components/Navbar";
import axios from "axios";

function App() {
  const [currentPage, setCurrentPage] = useState("home");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [currentStuff, setCurrentStuff] = useState("signup");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  // const handleSubmit = async (e) => {
  //   e.preventDefault();

  //   try {
  //     if (currentStuff === "signup") {
  //       // if (password !== confirmPassword) {
  //       //   return alert("Passwords do not match!");
  //       // }
  //       // Send registration request
  //       const response = await axios.post("https://api-backend-projectpal-6gsq.onrender.com/api/v1/auth/register", {
  //         email,
  //         password,
  //         username,
  //         fullName : name,
  //       });

  //       alert(response.data.message || "Registered successfully!");
  //     } else if (currentStuff === "signin") {
  //       // Send login request
  //       const response = await axios.post("https://api-backend-projectpal-6gsq.onrender.com/api/v1/auth/login", {
  //         email,
  //         password,
  //       });

  //       alert(response.data.message || "Logged in successfully!");
  //       console.log("User data:", response.data.user);
  //       // Save token in localStorage or a cookie (if not already set by backend)
  //       localStorage.setItem("accessToken", response.data.accessToken);
  //     }
  //   } catch (error) {
  //     console.error("Error:", error.response?.data?.message || error.message);
  //     alert(error.response?.data?.message || "An error occurred.");
  //   }
  // };

  return (
    <>
      <Navbar isLoggedIn={isLoggedIn} />
      <Routes>
        <Route path="/" element={<Landing setCurrentPage={setCurrentPage} isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />} />
        <Route
          path="/auth"
          element={
            <Auth
              // handleSubmit={handleSubmit}
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
            />
          }
        />
        <Route path="/dash" element={<Dash />} />
        {/* <Route path="/profile" element={<Profile />} /> */}
      </Routes>
    </>
  );
}

export default App;
