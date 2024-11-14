import React from 'react';
import './Header.css';

function Header() {
  return (
    <header className='header-container'>
      <h1>Jeu du tirage au sort de film</h1>
      <p>Chaque participant a choisi un film à regarder. À chaque tirage, un participant est sélectionné pour voir son film, jusqu'à ce que chacun ait eu son tour !</p>
    </header>
  );
}

export default Header;
