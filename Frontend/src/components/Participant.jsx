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
  isAnonymousMode,  // Utilisation de l'état du mode anonyme en props
}) {
  const faQuestion = <FaQuestion className="participant-film-icon" />

  const anonymouseProfile = {
    nom: "Anne O'Nyme",
    filmName: "Film Mystère",
    genreFavori: "Genre Mystère",
    photo: "/assets/anonyme/anonyme.png",
    image: faQuestion,
    useQuestionIcon: true
  };

  const [isFilmRevealed, setIsFilmRevealed] = useState(passe); // Par défaut, révélé si passe est true
  const [isIdentityRevealed, setIsIdentityRevealed] = useState(!isAnonymousMode || passe); // Identité révélée par défaut si non anonyme ou si "passe" est true

  useEffect(() => {
    // Si le mode anonyme change, réinitialiser les états en conséquence
    if (isAnonymousMode) {
      // En mode anonyme, cacher l'identité sauf si passe est true
      setIsIdentityRevealed(passe); // Si passe est true, l'identité reste révélée
    } else {
      setIsIdentityRevealed(true); // En mode normal, toujours révéler l'identité
    }

    if (passe) {
      setIsFilmRevealed(true); // Toujours révéler le film pour les participants ayant passe:true
    } else if (isAnonymousMode) {
      setIsFilmRevealed(false); // Réinitialiser le film en mode anonyme si non révélé
    }
  }, [isAnonymousMode, passe]);

  const handleRevealFilm = () => {
    // Si le film n'est pas encore révélé, le révéler
    if (!isFilmRevealed) {
      setIsFilmRevealed(true);
      console.log("clic1");

    } else {
      // Si le film est déjà révélé, remettre le mode anonyme
      setIsFilmRevealed(false);
      console.log("clic2");

    }
  };

  const handleRevealIdentity = () => {
    if (!isIdentityRevealed) {
      setIsIdentityRevealed(true); // Révéler manuellement l'identité
    }
  };

  // Affichage conditionnel basé sur l'état
  const displayedPhoto = isIdentityRevealed ? photo : anonymouseProfile.photo;
  const displayedName = isIdentityRevealed ? nom : anonymouseProfile.nom;
  const displayedGenre = isIdentityRevealed ? genreFavori : anonymouseProfile.genreFavori;
  const displayedFilmName = isFilmRevealed ? filmName : anonymouseProfile.filmName;

  // Affichage conditionnel de l'image ou de l'icône de question
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
      {/* Affichage de la photo, avec bascule d'identité au clic */}
      <div
        className="participant-photo-container"
        onClick={!isIdentityRevealed ? handleRevealIdentity : undefined}
      >
        <img src={displayedPhoto} alt={displayedName} className="participant-photo" />
      </div>

      {/* Nom et genre conditionnels */}
      <h1 className={passe ? "passed" : "not-passed"}>{displayedName}</h1>
      <h2>{displayedGenre}</h2>

      {/* Image du film ou icône de question */}
      <div>{imageDisplay}</div>

      {/* Titre du film */}
      <h3>{displayedFilmName}</h3>
    </div>
  );
}
