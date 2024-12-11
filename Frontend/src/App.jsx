import "./App.css";
import React, { useState, useRef, useEffect } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Background from "./components/Background";
import Participant from "./components/Participant";
import Launching from "./components/Launching";
import Result from "./components/Result";
import gsap from "gsap";

function App() {
  const [peopleList, setPeopleList] = useState([]);
  const [isAnonymousMode, setIsAnonymousMode] = useState(false);
  const [selectedParticipant, setSelectedParticipant] = useState(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [isLoading, setIsLoading] = useState(true); // Indicateur de chargement
  const mainContainerRef = useRef(null);
  const centralIndex = Math.floor(peopleList.length / 2);
  const [isSnowing, setIsSnowing] = useState(false); // État de la neige

  // Mélange aléatoire d'un tableau
  const shuffleArray = (array) => array.sort(() => Math.random() - 0.5);

  // Récupérer les données du backend
  useEffect(() => {
    const fetchPeople = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/people");
        if (!response.ok) {
          throw new Error("Erreur lors du chargement des données");
        }
        const data = await response.json();
        const shuffledList = shuffleArray(data);

        // Vérifier et placer un profil `passe: true` au centre
        let centralParticipant = shuffledList.find((person) => person.passe === true);

        if (!centralParticipant) {
          // Si aucun profil `passe: true` n'existe, définir le premier comme central et lui attribuer `passe: true`
          centralParticipant = { ...shuffledList[0], passe: true };
          shuffledList[0] = centralParticipant; // Mettre à jour la liste
        }

        // Placer le participant central au milieu
        const updatedList = shuffledList.filter(
          (person) => person.nom !== centralParticipant.nom
        );
        const centralIndex = Math.floor(shuffledList.length / 2);
        updatedList.splice(centralIndex, 0, centralParticipant);

        setPeopleList(updatedList);
      } catch (error) {
        console.error("Erreur : ", error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPeople();
  }, []);


  const toggleAnonymousMode = () => setIsAnonymousMode((prevState) => !prevState);

  const handleDraw = () => {
    setIsDrawing(true);

    const currentWinner = peopleList[centralIndex];
    setPeopleList((prevList) =>
      prevList.map((person) =>
        person.nom === currentWinner.nom
          ? { ...person, isRevealed: true }
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
          centeredList.splice(centralIndex, 0, chosenPerson);
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
    setPeopleList((prevList) => {
      const remainingPeople = prevList.filter(
        (person) => person.nom !== chosenPerson.nom
      );

      const shuffledRemaining = shuffleArray(remainingPeople);

      const centralIndex = Math.floor(prevList.length / 2);
      const newPeopleList = [
        ...shuffledRemaining.slice(0, centralIndex),
        { ...chosenPerson, passe: true, isRevealed: !isAnonymousMode },
        ...shuffledRemaining.slice(centralIndex),
      ];

      return newPeopleList;
    });

    setSelectedParticipant(chosenPerson);
    setIsDrawing(false);
  };

  if (isLoading) {
    return <div>Chargement des participants...</div>;
  }

  // Fonction pour activer/désactiver la neige
  const toggleSnowing = () => {
    setIsSnowing((prev) => !prev);
  };

  return (
    <div className="app-container">
      <Header />
      <Background
      className="background-container"
      isSnowing={isSnowing}
      >
        <Launching
          handleDraw={handleDraw}
          isDrawing={isDrawing}
          isAnonymousMode={isAnonymousMode}
          toggleAnonymousMode={toggleAnonymousMode}
          toggleSnowing={toggleSnowing} isSnowing={isSnowing}
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
      </Background>
      <Footer />
    </div>
  );
}

export default App;
