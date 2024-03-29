import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/authContext";
import RegisterSubPage from "./RegistrationSubPage";
import ProfilePicSubPage from "./ProfilePicSubPage";

function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isNotConfirmed, setIsNotConfirmed] = useState(false);
  const [registrationStep, setRegistrationStep] = useState(1);
  const [profileImage, setProfileImage] = useState("");
  const navigate = useNavigate();
  const { register } = useAuth();

  const handleNextStep = () => {
    if (registrationStep === 1 && password !== confirmPassword) {
      setIsNotConfirmed(true);
    } else {
      setIsNotConfirmed(false);
      setRegistrationStep(2);
    }
  };

  const handlePreviousStep = () => {
    setRegistrationStep(1);
  };

  const handleSubmit = async () => {
    if (registrationStep === 2) {
      try {
        await register(profileImage ,username, password );
        navigate("/");
      } catch (error) {
        console.error("Registration error:", error);
      }
    }
  };

  const profileImageOptions = [
    "../assets/pfp_1.png",
    "../assets/pfp_2.png",
    "../assets/pfp_3.png",
    "../assets/pfp_4.png",
  ];
  return (
    <main className="flex justify-center items-center py-40">
      {registrationStep === 1 ? (
        <RegisterSubPage
          setUsername={setUsername}
          setPassword={setPassword}
          username={username}
          password={password}
          isNotConfirmed={isNotConfirmed}
          confirmPassword={confirmPassword}
          setConfirmPassword={setConfirmPassword}
          handleNextStep={handleNextStep}
        />
      ) : (
        <ProfilePicSubPage
          setProfileImage={setProfileImage}
          handleSubmit={handleSubmit}
          profileImageOptions={profileImageOptions}
          handlePreviousStep={handlePreviousStep}
        />
      )}
    </main>
  );
}

export default Register;
