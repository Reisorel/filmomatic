// Background.jsx
import React from "react";
import "./Background.css";

export default function Background({ children }) {
  return (
    
    <div className="background-container">
      {children} {/* Ceci affiche tout ce qui est à l'intérieur de Background dans App.js */}
    </div>
  );
}
