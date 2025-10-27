import React, { useState } from "react";
// import "./FizzyButton.css";

const FizzyButton = () => {
  const [status, setStatus] = useState(""); // '', 'onclic', 'validate'

  const handleClick = () => {
    setStatus("onclic");
    
    setTimeout(() => {
      setStatus("validate");
      
      setTimeout(() => {
        setStatus("");
        const link = document.createElement("a");
        link.href = "/resume/resume_gururaj.pdf"; 
        link.download = "Gururaj_HR_Resume.pdf";
        link.click();
      }, 1250);
    }, 2250);
  };

  return (
    <div>
      <button id="button" className={`${status} download-button`} onClick={handleClick}>
        <strong>{status === "validate" ? "✔" : "Resume"}</strong> 
      </button>
    </div>
  );
};

export default FizzyButton;
