// Lancer le server avec l'environnement de production :
// NODE_ENV=production node server.js

const PEOPLE_LIST = [
  {
    nom: "Jim Sharman",
    genreFavori: "Comédie Musicale",
    passe: true,
    isRevealed: true,
    filmName: "Rocky Horror Picture Show",
    photo: "/assets/people_prod/Sharman.png",
    image: "/assets/movies/rocky.png",
    useQuestionIcon: false
  },
  {
    nom: "Jean-Marie Poiré",
    genreFavori: "Historique",
    passe: false,
    isRevealed: false, // Aligné avec la logique du dev
    filmName: "Les Visiteurs",
    photo: "/assets/people_prod/Poire.png",
    image: "/assets/movies/visiteurs.png",
    useQuestionIcon: true
  },
  {
    nom: "Stanley Kubrick",
    genreFavori: "Horreur",
    passe: true,
    isRevealed: true,
    filmName: "The Shining",
    photo: "/assets/people_prod/Kubrick.png",
    image: "/assets/movies/shining.jpg",
    useQuestionIcon: false
  },
  {
    nom: "Steven Spielberg",
    genreFavori: "Science Fiction",
    passe: false,
    isRevealed: false, // Aligné avec la logique du dev
    filmName: "Indiana Jones Et Les Aventuriers De L'Arche Perdue",
    photo: "/assets/people_prod/Spielberg.jpg",
    image: "/assets/movies/Arche.jpg",
    useQuestionIcon: true
  },
  {
    nom: "Joel Coen",
    genreFavori: "Comédie",
    passe: false,
    isRevealed: false, // Aligné avec la logique du dev
    filmName: "The Big Lebowsky",
    photo: "/assets/people_prod/Coen.jpg",
    image: "/assets/movies/Lebowsky.jpg",
    useQuestionIcon: true
  },
  {
    nom: "Jordan Peele",
    genreFavori: "Epouvante",
    passe: false,
    isRevealed: false, // Aligné avec la logique du dev
    filmName: "Nope",
    photo: "/assets/people_prod/Peele.png",
    image: "/assets/movies/nope.png",
    useQuestionIcon: true
  },
  {
    nom: "Ridley Scott",
    genreFavori: "Road Movie",
    passe: false,
    isRevealed: false, // Aligné avec la logique du dev
    filmName: "Thelma & Louise",
    photo: "/assets/people_prod/Ridley.jpg",
    image: "/assets/movies/thelma.jpg",
    useQuestionIcon: true
  }
];

module.exports = { PEOPLE_LIST };
