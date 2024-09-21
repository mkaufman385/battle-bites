import React from "react";
import "../styles/Footer.css";

function Footer() {
  const currentYear = new Date().getFullYear(); // Updates current year dynamically

  return (
    <footer className="footer">
      <p>Created by Matthew Kaufman</p>
      <p>&copy; {currentYear} Battle Bites. All rights reserved.</p>
    </footer>
  );
}

export default Footer;
