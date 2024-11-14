import { useState } from "react";
import { FaQuestion } from "react-icons/fa6";
import "./Participant.css";

export default function Participant({ nom, film, genreFavori, photo, image, passe, isCentral }) {
  // État pour suivre si le film est révélé pour un participant non tiré
  const [isFilmRevealed, setIsFilmRevealed] = useState(false);

  // Affichage du contenu du film
  const filmContent = passe || isFilmRevealed ? (
    <img src={image} alt={film} className="participant-film-image" />
  ) : (
    <div onClick={() => !passe && setIsFilmRevealed(true)} className="mystery-content">
      <FaQuestion className="participant-film-icon" />
    </div>
  );

  return (
    <div className={`profile ${isCentral ? "central" : ""}`}>
      <img src={photo} alt={nom} className="participant-photo" />
      <div className="participant-info">
        <h1 className={passe ? "passed" : "not-passed"}>{nom}</h1>
        <h2>{genreFavori}</h2>
        <h3>{passe || isFilmRevealed ? film : "Non-révélé"}</h3>
        {filmContent}
      </div>
    </div>
  );
}
