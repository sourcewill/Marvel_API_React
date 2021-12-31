import React from 'react';
import Utils from '../../services/utils';

export default function Character({jsonCharacter}) {
  
    return (
      <div>
        <section className='character'>
          Name: {jsonCharacter.name}
          Description: {jsonCharacter.description}
          <img src={Utils.buildImgUrl(jsonCharacter.thumbnail.path, jsonCharacter.thumbnail.extension)} alt=''></img>
        </section>
      </div>
    );
  }
