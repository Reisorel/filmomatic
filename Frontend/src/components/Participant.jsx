import { useState, useEffect } from "react";
import { FaQuestion } from "react-icons/fa6";
import "./Participant.css";

export default function Participant({
  nom,
  filmName,
  genreFavori,
  photo,
  image,
  passe,
  isCentral,
  anonymouse,
  anonymouseProfile,
}) {
  const [isFilmRevealed, setIsFilmRevealed] = useState(passe);

  useEffect(() => {
    // Si le participant a "passe: true", le film doit être toujours révélé
    if (passe) {
      setIsFilmRevealed(true);
    } else if (anonymouse) {
      setIsFilmRevealed(false); // En mode anonyme, réinitialiser pour les autres
    }
  }, [passe, anonymouse]);

  const handleRevealFilm = () => {
    if (!passe) setIsFilmRevealed(true); // Permet de révéler manuellement si non déjà révélé
  };

  // Affichage conditionnel du titre du film
  const filmNameDisplay = isFilmRevealed ? filmName : "Non-film";

  // Affichage de l'image du film ou de l'icône de question
  const imageDisplay = isFilmRevealed ? (
    <img src={image} alt="Film" className="participant-film-image" />
  ) : (
    <FaQuestion
      className="participant-film-icon"
      onClick={handleRevealFilm} // Active le clic pour révéler le film
    />
  );
  

  return (
    <div className={`profile ${isCentral ? "central" : ""}`}>
      <img src={photo} alt={nom} className="participant-photo" />
      <h1 className={passe ? "passed" : "not-passed"}>{nom}</h1>
      <h2>{genreFavori}</h2>
      <div>{imageDisplay}</div>
      <h3>{filmNameDisplay}</h3>
    </div>
  );
}




//   <img src={photo} alt={nom} className="participant-photo" />
//   <div className="participant-info">
//     <h2>{genreFavori}</h2>
//     <h3>{passe || isFilmRevealed ? film : "Non-révélé"}</h3>
//     {filmContent}
//   </div>
// </div>
// const filmContent = passe || isFilmRevealed ? (
// ) : (
//   <div
//     onClick={() => !passe && setIsFilmRevealed(true)}
//     className="participant-film-icon"
//   >
//     <FaQuestion className="participant-film-icon" />
// );


// {isAnonymousMode ? (
//   <FaQuestion className="participant-film-icon" />
// ) : (
//   <img src={image} alt={filmName} className="participant-film-image" />
// )}
