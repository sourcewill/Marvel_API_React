import React from 'react';
import './character.css'

export default function Character({ jsonCharacter }) {

  const defaultDescription = `${jsonCharacter.name} is a Marvel character that doesn't have a definite description yet.`;

  return (
    <div>
      <section className='character'>
                <div className='character-name'>{jsonCharacter.name}</div>
                <div className='character-description'>{jsonCharacter.description.length < 10 ? defaultDescription : jsonCharacter.description}</div>
      </section>
    </div>
  );
}
