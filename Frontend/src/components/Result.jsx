// Result.js
import "./Result.css";

export default function Result({ selectedParticipant }) {
  if (!selectedParticipant) {
    return (
      <div className="result-container">
        <p>Aucun participant n'a été tiré pour l'instant.</p>
      </div>
    );
  }

  return (
    <div className="result-container">
      <h2>Participant tiré :</h2>
      <p><strong>Nom :</strong> {selectedParticipant.nom}</p>
      <p><strong>Film :</strong> {selectedParticipant.filmName}</p>
    </div>
  );
}
