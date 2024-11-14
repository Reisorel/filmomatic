// Lancer le server avec l'environnement de production :
// NODE_ENV=production node server.js

const PEOPLE_LIST = [
  {
    nom: "Jim Sharman",
    genreFavori: "Comédie Musicale",
    passe: true,
    film: "Rocky Horror Picture Show",
    photo: "/assets/people_prod/Sharman.png",
    image: "/assets/movies/rocky.png",
    useQuestionIcon: false
  },
  {
    nom: "Jean-Marie Poiré",
    genreFavori: "Historique",
    passe: false,
    film: "Les Visiteurs",
    photo: "/assets/people_prod/Poire.png",
    image: "/assets/movies/visiteurs.png",
    useQuestionIcon: true
  },
  {
    nom: "Stanley Kubrick",
    genreFavori: "Horreur",
    passe: true,
    film: "The Shining",
    photo: "/assets/people_prod/Kubrick.png",
    image: "/assets/movies/shining.jpg",
    useQuestionIcon: false
  },
  {
    nom: "Jean-Pierre Jeunet",
    genreFavori: "Comédie Romantique",
    passe: false,
    film: "Amélie Poulain",
    photo: "/assets/people_prod/Jeunet.png",
    image: "/assets/movies/poulain.png",
    useQuestionIcon: true
  },
  {
    nom: "Marc Esposito",
    genreFavori: "Fantasy",
    passe: false,
    film: "Le Coeur Des Hommes",
    photo: "/assets/people_prod/Esposito.png",
    image: "/assets/movies/coeur.jpg",
    useQuestionIcon: true
  },
  {
    nom: "Jordan Peele",
    genreFavori: "Science Fiction",
    passe: false,
    film: "Nope",
    photo: "/assets/people_prod/Peele.png",
    image: "/assets/movies/nope.png",
    useQuestionIcon: true
  },
  {
    nom: "Paul Weitz",
    genreFavori: "Comédie US",
    passe: false,
    film: "American Pie 1",
    photo: "/assets/people_prod/Weitz.png",
    image: "/assets/movies/american.png",
    useQuestionIcon: true
  }
];

module.exports = { PEOPLE_LIST };
