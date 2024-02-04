import React, { useState } from "react";
import { CgProfile } from "react-icons/cg";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/authContext";

function RegisterSubPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isNotConfirmed, setIsNotConfirmed] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (username.length === 0) {
      // Handle empty username case
      return;
    }

    if (password !== confirmPassword) {
      setIsNotConfirmed(true);
      // Handle mismatched passwords case
      return;
    }

    try {
      await register(username, password);
      navigate("/"); // Navigate to home page or other relevant page
    } catch (error) {
      console.error("Registration error:", error);
      // Handle registration errors
    }
  };

  return (
    <div className="bg-white w-4/5 max-w-[620px] p-10 rounded-xl">
      <h1 className="font-herfonty text-4xl text-pink-600 uppercase flex justify-center items-center gap-2">
        Register <CgProfile size={45} />
      </h1>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-10 pt-10 font-herfonty"
      >
        <input
          type="text"
          id="username"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="bg-[rgba(82,182,232,0.3)] rounded-lg p-3 outline-none shadow-md text-pink-500"
        />

        <input
          type="password"
          id="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className={`bg-[rgba(82,182,232,0.3)] rounded-lg p-3 outline-none shadow-md text-pink-500 ${
            isNotConfirmed ? "border-2 border-red-500" : ""
          }`}
        />

        <input
          type="password"
          id="confirmPassword"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className={`bg-[rgba(82,182,232,0.3)] rounded-lg p-3 outline-none shadow-md text-pink-500 ${
            isNotConfirmed ? "border-2 border-red-500" : ""
          }`}
        />
        <button
          type="submit"
          className="bg-pink-600 rounded-lg p-3 text-xl font-bold text-white hover:bg-pink-700"
        >
          Next
        </button>
        <div className="border-b-2"></div>
        <h2 className="flex gap-2 items-center justify-center">
          Already Have an account?
          <Link
            to="/login"
            className="text-lg text-black hover:text-pink-600 hover:underline"
          >
            Login!
          </Link>
        </h2>
      </form>
    </div>
  );
}

export default RegisterSubPage;
