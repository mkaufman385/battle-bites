import React from "react";
import "../styles/Header.css";
import { useNavigate } from "react-router-dom";

function Header() {
  const navigate = useNavigate();

  const handleButtonClick = () => {
    navigate("/");
  };

  return (
    <header className="header">
      <div>
        <button className="logo" onClick={handleButtonClick}>
          Battle Bites
        </button>
      </div>
    </header>
  );
}

export default Header;
