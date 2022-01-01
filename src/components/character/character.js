import React, {useState} from 'react';
import './character.css'
import Utils from '../../services/utils';

export default function Character({ jsonCharacter, parallaxCoef }) {

  return (
    <div>
      <section className='character' style={{
        backgroundSize: 'cover',
        backgroundPosition: `0% ${parallaxCoef}%`,
        backgroundImage: `url(${Utils.buildImgUrl(jsonCharacter.thumbnail.path, 'detail', jsonCharacter.thumbnail.extension)})`
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
