import React from "react";
import "../styles/Header.css";
import { useNavigate } from "react-router-dom";
import BattleBitesLogo from "../images/Battle-Bites-Logo.png";

function Header() {
  const navigate = useNavigate();

  const handleButtonClick = () => {
    navigate("/");
  };

  return (
    <header className="header">
      <div
        onClick={handleButtonClick}
        className="logo-container"
        role="button"
        aria-label="Landingpage"
      >
        <img
          className="battle-bites-logo"
          src={BattleBitesLogo}
          alt="battle bites logo"
        />
      </div>
    </header>
  );
}

export default Header;
