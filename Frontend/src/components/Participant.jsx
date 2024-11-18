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
  isRevealed,
  isCentral,
  isAnonymousMode,
}) {
  const anonymousProfile = {
    nom: "Anne O'Nyme",
    genreFavori: "Genre Mystère",
    filmName: "Film Mystère",
    photo: "/assets/anonyme/anonyme.png",
    image: <FaQuestion className="participant-film-icon" />,
  };

  const [filmRevealed, setFilmRevealed] = useState(isRevealed); // Contrôle le film
  const [identityRevealed, setIdentityRevealed] = useState(isRevealed); // Contrôle l'identité
  const [photoFlipClass, setPhotoFlipClass] = useState(""); // Classe d'animation pour la photo
  const [filmFlipClass, setFilmFlipClass] = useState(""); // Classe d'animation pour le film

  useEffect(() => {
    // Synchronise les états locaux avec les props initiales
    setFilmRevealed(isRevealed);
    setIdentityRevealed(isRevealed);

    // Définit la classe de flip selon le mode anonyme
    if (isAnonymousMode) {
      setPhotoFlipClass("flip-to-anonymous");
    } else {
      setPhotoFlipClass("flip-to-normal");
    }
  }, [isRevealed, isAnonymousMode]);

  const toggleReveal = (stateSetter, flipSetter) => {
    // Ajoute ou retire les classes de flip
    flipSetter((prev) =>
      prev === "flip-to-anonymous" ? "flip-to-normal" : "flip-to-anonymous"
    );
    // Bascule l'état local
    stateSetter((prevState) => !prevState);
  };

  // Logique d'affichage pour l'identité
  const displayedIdentity =
    isAnonymousMode && !identityRevealed
      ? anonymousProfile
      : { nom, genreFavori, photo };

  // Logique d'affichage pour le film
  const displayedFilmName = filmRevealed ? filmName : anonymousProfile.filmName;
  const displayedFilmImage = filmRevealed ? (
    <img
      src={image}
      alt={displayedFilmName}
      className={`participant-film-image ${filmFlipClass}`}
    />
  ) : (
    anonymousProfile.image
  );

  return (
    <div className={`profile ${isCentral ? "central" : ""}`}>
      {/* Affichage de l'identité */}
      <div
        className={`participant-photo-container ${photoFlipClass}`}
        onClick={() => toggleReveal(setIdentityRevealed, setPhotoFlipClass)}
      >
        <img
          src={displayedIdentity.photo}
          alt={displayedIdentity.nom}
          className={`participant-photo ${photoFlipClass}`}
        />
      </div>

      <h1 className={passe ? "passed" : "not-passed"}>
        {displayedIdentity.nom}
      </h1>
      <h2>{displayedIdentity.genreFavori}</h2>

      {/* Affichage du film */}
      <div
        className="film-container"
        onClick={() => toggleReveal(setFilmRevealed, setFilmFlipClass)}
      >
        {displayedFilmImage}
      </div>
      <h3>{displayedFilmName}</h3>
    </div>
  );
}
