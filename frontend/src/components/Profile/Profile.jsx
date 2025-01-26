import React, { useEffect, useState } from "react";
import { Upload, LogOutIcon } from "lucide-react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Profile = ({ setIsModalOpen, isModalOpen, userData }) => {
  const [profileImage, setProfileImage] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [resumeFile, setResumeFile] = useState(null);
  const [phoneNumber, setPhoneNumber] = useState("");

  const navigate = useNavigate();

  // Handle file input change for profile image
  const handleImageChange = async (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleProfileImageUpload = async () => {
    const file = document.getElementById("profile-upload").files[0];
    if (file) {
      // Create form data
      const formData = new FormData();
      formData.append("profileImage", file);

      const token = localStorage.getItem("accessToken");

      if (!token) {
        alert("Unauthorized. Please log in.");
        return;
      }

      try {
        setIsSubmitting(true);
        const response = await axios.post(
          "https://api-backend-projectpal-6gsq.onrender.com/api/v1/auth/update-profileimage",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        // console.log(response.data.message || "Profile image updated successfully!");
      } catch (error) {
        console.error("Error:", error.response?.data?.message || error.message);
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  // Handle file input change for resume
  const handleResumeChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setResumeFile(file);
    }
  };

  const handleResumeUpload = async () => {
    if (resumeFile) {
      // Create form data
      const formData = new FormData();
      formData.append("resume", resumeFile);

      const token = localStorage.getItem("accessToken");

      if (!token) {
        alert("Unauthorized. Please log in.");
        return;
      }

      try {
        setIsSubmitting(true);
        const response = await axios.post(
          "https://api-backend-projectpal-6gsq.onrender.com/api/v1/auth/upload-Resume",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        // console.log(response.data.message || "Resume uploaded successfully!");
      } catch (error) {
        console.error("Error:", error.response?.data?.message || error.message);
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  // Handle phone number submission
  const handlePhoneNumberSubmit = async (event) => {
    event.preventDefault();

    const token = localStorage.getItem("accessToken");

    if (!token) {
      alert("Unauthorized. Please log in.");
      return;
    }

    try {
      setIsSubmitting(true);
      const response = await axios.post(
        "https://api-backend-projectpal-6gsq.onrender.com/api/v1/auth/add-phone-number",
        { phoneNumber },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      // console.log(response.data.message || "Phone number added successfully!");
    } catch (error) {
      console.error("Error:", error.response?.data?.message || error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const HandleLogout = async () => {
    const confirmLogout = confirm("Are you sure you want to logout?");
    if (confirmLogout) {
      try {
        const token =
          localStorage.getItem("accessToken") ||
          document.cookie.replace(
            /(?:(?:^|.*;\s*)accessToken\s*=\s*([^;]*).*$)|^.*$/,
            "$1"
          );

        if (!token) {
          alert("Unauthorized. you are not login.");
          return;
        }
        const response = await fetch(
          "https://api-backend-projectpal-6gsq.onrender.com/api/v1/auth/logout",
          {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = await response.json();

        if (response.ok) {
          alert("Logged out successfully!");
          localStorage.removeItem("accessToken");
          // navigate("/");
          // window.location.reload();
        } else {
          // Handle error response
          alert(`Error: ${data.message || "Logout failed"}`);
        }
      } catch (error) {
        console.error("Error during logout:", error);
        alert("An error occurred while logging out.");
      }
    }
  };

  if (!isModalOpen) return null;

  // useEffect(() => {
    // console.log(userData);
  // }, []);

  return (
    <div className="modal-overlay" onClick={() => setIsModalOpen(false)}>
      <div
        className="modal-content border border-gray-500 shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-6 space-y-6">
          {/* Profile Section */}
          <div className="flex items-center space-x-4">
            <div className="flex flex-auto items-center space-x-4">
              <div className="w-20 h-20 rounded-full overflow-hidden border border-gray-300">
                <img
                  src={profileImage || userData.profileImage ? userData.profileImage : "https://placehold.co/400"}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h3 className="text-lg font-medium text-white">
                  {userData.fullName}
                </h3>
                <p className="text-sm text-white">{userData.email}</p>
              </div>
            </div>

            <button
              className="text-red-400 text-xs cursor-pointer py-1 rounded"
              type="submit"
              onClick={HandleLogout}
            >
              <LogOutIcon className="inline ml-2" />
            </button>
          </div>
          {/* File Upload Section */}
          <div className="mt-4 flex items-center justify-between">
            <label
              htmlFor="profile-upload"
              className="cursor-pointer text-blue-200 hover:text-blue-800 text-sm"
            >
              <Upload className="inline mr-2" /> Upload Profile Picture
            </label>
            <input
              id="profile-upload"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleImageChange}
              disabled={isSubmitting}
            />
            <button
              className="bg-green-600 text-black px-6 cursor-pointer py-1 rounded w-32 h-10 mt-2"
              type="button"
              onClick={handleProfileImageUpload}
              disabled={isSubmitting}
            >
              Upload
            </button>
          </div>
          {/* Form Section */}
          <form className="space-y-4" onSubmit={handlePhoneNumberSubmit}>
            {/* Name Fields */}
            <div className="my-4 flex items-center gap-3">
              <div className="mb-4 flex-auto">
                <label className="block text-sm font-medium text-gray-400">
                  Full Name
                </label>
                <input
                  type="text"
                  className="w-full block px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Jhon Doe"
                />
              </div>
              <button
                className="bg-green-600 text-black px-6 cursor-pointer py-1 rounded w-32 h-10"
                type="submit"
              >
                Save
              </button>
            </div>

            <div className="my-4 flex items-center gap-3">
              <div className="mb-4 flex-auto">
                <label className="block text-sm font-medium text-gray-400">
                  Phone Number
                </label>
                <input
                  type="number"
                  className="w-full block px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder={`+91 ${userData.phoneNumber || "1234567890"}`}
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                />
              </div>
              <button
                className="bg-green-600 text-black px-6 cursor-pointer py-1 rounded w-32 h-10"
                type="submit"
                disabled={isSubmitting}
              >
                Save
              </button>
            </div>
          </form>

          <form className="space-y-4">
            <div className="my-4 flex items-center gap-3">
              <div className="mb-4 flex-auto">
                <label className="block text-sm font-medium text-gray-400">
                  Upload your CV
                </label>
                <input
                  type="file"
                  accept="application/pdf"
                  className="w-full block cursor-pointer px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  onChange={handleResumeChange}
                  disabled={isSubmitting}
                />
              </div>
              <button
                className="bg-green-600 text-black px-6 cursor-pointer py-1 rounded w-32 h-10"
                type="button"
                onClick={handleResumeUpload}
                disabled={isSubmitting}
              >
                Upload
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Profile;