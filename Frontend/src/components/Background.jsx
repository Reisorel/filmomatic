import React from "react";
import "./Background.css";

export default function Background({ children, isSnowing }) {
  return (
    <div className="background-container">
      {children}
      {/* Ceci affiche la neige uniquement si isSnowing est true */}
      {isSnowing && (
        <div className="snowflakes" aria-hidden="true">
          <div className="snowflake">❅</div>
          <div className="snowflake">❅</div>
          <div className="snowflake">❆</div>
          <div className="snowflake">❄</div>
          <div className="snowflake">❅</div>
          <div className="snowflake">❆</div>
          <div className="snowflake">❄</div>
          <div className="snowflake">❅</div>
          <div className="snowflake">❆</div>
          <div className="snowflake">❄</div>
        </div>
      )}
    </div>
  );
}

