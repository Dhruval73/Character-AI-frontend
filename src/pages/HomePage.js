import React from 'react';
import CharacterGrid from '../components/CharacterGrid';

function HomePage() {
  return (
    <div>
      <h1 style={{ textAlign: 'center' }}>Choose a Character</h1>
      <CharacterGrid />
    </div>
  );
}

export default HomePage;
