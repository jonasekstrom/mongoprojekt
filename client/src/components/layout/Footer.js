import React from "react";
import "./landing.css";
const Footer = () => {
  return (
    <footer className="footer bg-dark text-white mt-5 p-4 text-center">
      Copyright &copy; {new Date().getFullYear()} Hackerman - Pedro - Rasmus
      - thatzita
    </footer>
  );
};
export default Footer;
