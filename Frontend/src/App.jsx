import "./App.css";
import React, { useState, useRef, useEffect } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Background from "./components/Background";
import Participant from "./components/Participant";
import Launching from "./components/Launching";
import Result from "./components/Result";
import gsap from "gsap";
import { FaQuestion } from "react-icons/fa6";

const peopleListData = [
  {
    nom: "Alice",
    genreFavori: "Comédie Musicale",
    passe: true,
    isRevealed: true,
    filmName: "Rocky Horror Picture Show",
    photo: "/assets/people/alice.png",
    image: "/assets/movies/rocky.png",
    useQuestionIcon: false,
  },
  {
    nom: "Cassandre",
    genreFavori: "Historique",
    passe: false,
    isRevealed: false,
    filmName: "Les Visiteurs",
    photo: "/assets/people/cassandre.png",
    image: "/assets/movies/visiteurs.png",
    useQuestionIcon: true,
  },
  {
    nom: "Franz",
    genreFavori: "Horreur",
    passe: true,
    isRevealed: true,
    filmName: "The Shining",
    photo: "/assets/people/franz.png",
    image: "/assets/movies/shining.jpg",
    useQuestionIcon: false,
  },
  {
    nom: "Julie",
    genreFavori: "Comédie Romantique",
    passe: false,
    isRevealed: false,
    filmName: "Amélie Poulain",
    photo: "/assets/people/julie.png",
    image: "/assets/movies/poulain.png",
    useQuestionIcon: true,
  },
  {
    nom: "Léa",
    genreFavori: "Fantasy",
    passe: false,
    isRevealed: false,
    filmName: "Le Coeur Des Hommes",
    photo: "/assets/people/lea.png",
    image: "/assets/movies/coeur.jpg",
    useQuestionIcon: true,
  },
  {
    nom: "Louis",
    genreFavori: "Science Fiction",
    passe: false,
    isRevealed: false,
    filmName: "Nope",
    photo: "/assets/people/louis.png",
    image: "/assets/movies/nope.png",
    useQuestionIcon: true,
  },
  {
    nom: "Peheme",
    genreFavori: "Comédie US",
    passe: false,
    isRevealed: false,
    filmName: "American Pie 1",
    photo: "/assets/people/peheme.png",
    image: "/assets/movies/american.png",
    useQuestionIcon: true,
  },
];

function App() {
  // Mélange aléatoire de la liste
  const shuffleArray = (array) => {
    return array.sort(() => Math.random() - 0.5); // Mélange aléatoire
  };

  // Initialiser peopleList avec un mélange aléatoire de participants
  const [peopleList, setPeopleList] = useState(() => {
    // Mélange les participants au départ
    const shuffledList = shuffleArray([...peopleListData]);

    // Cherche un participant déjà marqué comme "passe" pour le mettre au centre
    const centralParticipant = shuffledList.find(
      (person) => person.passe === true
    );

    // Si un participant "passe=true" est trouvé, le mettre au centre
    if (centralParticipant) {
      const centralIndex = Math.floor(shuffledList.length / 2);

      // On s'assure que ce participant "passe=true" reste au centre, en l'échangeant si nécessaire
      const updatedList = shuffledList.filter(
        (person) => person.nom !== centralParticipant.nom
      );
      updatedList.splice(centralIndex, 0, centralParticipant); // Place le participant au centre

      return updatedList;
    } else {
      // Si aucun participant "passe=true", on laisse la liste mélangée sans modifier
      return shuffledList;
    }
  });

  const [isAnonymousMode, setIsAnonymousMode] = useState(false);

  const toggleAnonymousMode = () => {
    setIsAnonymousMode((prevState) => !prevState);
  };

  const [selectedParticipant, setSelectedParticipant] = useState(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const mainContainerRef = useRef(null);
  const centralIndex = Math.floor(peopleList.length / 2);

  const handleDraw = () => {
    setIsDrawing(true);

    // Révéler complètement le participant central avant le prochain tirage
    const currentWinner = peopleList[centralIndex];
    setPeopleList((prevList) =>
      prevList.map((person) =>
        person.nom === currentWinner.nom
          ? { ...person, isRevealed: true } // Révéler film et identité
          : person
      )
    );

    const availablePeople = peopleList.filter((person) => !person.passe);

    if (availablePeople.length === 0) {
      alert("Tous les participants ont déjà été tirés !");
      setIsDrawing(false);
      return;
    }

    startDraw(availablePeople);
  };

  // Fonction fléchée lançant le tirage avec AvailablePeople comme argument.
  const startDraw = (availablePeople) => {
    const timeline = gsap.timeline({
      onComplete: () => {
        clearInterval(shuffleInterval);

        const randomIndex = Math.floor(Math.random() * availablePeople.length);
        const chosenPerson = availablePeople[randomIndex];

        setPeopleList((prevList) => {
          const centeredList = prevList.filter(
            (person) => person.nom !== chosenPerson.nom
          );
          centeredList.splice(centralIndex, 0, chosenPerson); // Place le participant tiré au centre
          return centeredList;
        });
        finalizeDraw(chosenPerson);
      },
    });

    timeline
      .to(mainContainerRef.current, {
        rotation: "+=720",
        duration: 2,
        ease: "power2.in",
      })
      .to(mainContainerRef.current, {
        rotation: "+=1440",
        duration: 3,
        ease: "none",
      })
      .to(mainContainerRef.current, {
        rotation: "+=360",
        duration: 3,
        ease: "power2.out",
      });

    const shuffleInterval = setInterval(() => {
      setPeopleList((prevList) => {
        const newOrder = [...prevList];
        newOrder.unshift(newOrder.pop());
        return newOrder;
      });
    }, 200);
  };

  const finalizeDraw = (chosenPerson) => {
    setPeopleList((prevList) =>
      prevList.map((person) =>
        person.nom === chosenPerson.nom
          ? { ...person, passe: true, isRevealed: !isAnonymousMode }
          : person
      )
    );
    setSelectedParticipant(chosenPerson);
    setIsDrawing(false);
  };

  return (
    <div className="app-container">
      <Header />
      <Background className="background-container">
        <Launching
          handleDraw={handleDraw}
          isDrawing={isDrawing}
          isAnonymousMode={isAnonymousMode}
          toggleAnonymousMode={toggleAnonymousMode}
        />
        <div className="main-container" ref={mainContainerRef}>
          {peopleList.map((person, index) => (
            <Participant
              key={index}
              isCentral={index === centralIndex}
              nom={person.nom}
              photo={person.photo}
              filmName={person.filmName}
              genreFavori={person.genreFavori}
              image={person.image}
              useQuestionIcon={person.useQuestionIcon}
              passe={person.passe}
              isRevealed={person.isRevealed}
              isAnonymousMode={isAnonymousMode}
            />
          ))}
        </div>
        {/* <Result selectedParticipant={selectedParticipant} /> */}
      </Background>
      <Footer />
    </div>
  );
}

export default App;
