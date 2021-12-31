import React from 'react';
import './character.css'
import Utils from '../../services/utils';

export default function Character({ jsonCharacter }) {

  return (
    <div>
      <section className='character' style={{
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundImage: `url(${Utils.buildImgUrl(jsonCharacter.thumbnail.path, jsonCharacter.thumbnail.extension)})`
      }}>
        <div className='character-vertical-gradient-top'>
          <div className='character-vertical-gradient-bottom'>
            <div className='character-horizontal-gradient-left'>
              <div className='character-name'>{jsonCharacter.name}</div>
              <div className='character-description'>{jsonCharacter.description}</div>
            </div>
          </div>
        </div>


      </section>
    </div>
  );
}