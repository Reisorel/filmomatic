import "./Launching.css";
import Participant from "./Participant";

export default function Launching({ handleDraw, isDrawing, toggleAnonymousMode, isAnonymousMode }) {
  return (
    <div>
      <button className="anonymous-button" onClick={toggleAnonymousMode}>
        {isAnonymousMode ? "Mode normal" : "Mode Anonyme"}
      </button>
      <button
        className="launching-button"
        onClick={handleDraw}
        disabled={isDrawing} // Désactive le bouton pendant le tirage
      >
        {isDrawing ? "Tirage en cours..." : "Lancer le tirage !"}
      </button>
    </div>
  );
}
