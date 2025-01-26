import React, { useState } from "react";
import Signup from "./Signup";
import Login from "./Login";

function Auth({
  handleSubmit,
  setCurrentPage,
  name,
  setName,
  username,
  setUsername,
  email,
  setEmail,
  password,
  setPassword,
  confirmPassword,
  setConfirmPassword,
  currentStuff,
  setCurrentStuff,
}) {
  return (
    <>
      {currentStuff === "signup" ? (
        <Signup
          handleSubmit={handleSubmit}
          setCurrentPage={setCurrentPage}
          name={name}
          setName={setName}
          email={email}
          username={username}
          setUsername={setUsername}
          setEmail={setEmail}
          password={password}
          setPassword={setPassword}
          confirmPassword={confirmPassword}
          setConfirmPassword={setConfirmPassword}
          setCurrentStuff={setCurrentStuff}
        />
      ) : (
        <Login
          handleSubmit={handleSubmit}
          setCurrentPage={setCurrentPage}
          name={name}
          setName={setName}
          email={email}
          setEmail={setEmail}
          password={password}
          setPassword={setPassword}
          confirmPassword={confirmPassword}
          setConfirmPassword={setConfirmPassword}
          setCurrentStuff={setCurrentStuff}
        />
      )}
    </>
  );
}

export default Auth;
