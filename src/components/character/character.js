import React from 'react';
import './character.css'

export default function Character({ jsonCharacter }) {

  return (
    <div>
      <section className='character'>
                <div className='character-name'>{jsonCharacter.name}</div>
                <div className='character-description'>{jsonCharacter.description}</div>
      </section>
    </div>
  );
}
