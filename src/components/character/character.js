import React from 'react';
import Utils from '../../services/utils';

export default function Character(props) {
  
    return (
      <div>
        <section className='character'>
          Name: {props.jsonCharacter.name}
          Description: {props.jsonCharacter.description}
          <img src={Utils.buildImgUrl(props.jsonCharacter.thumbnail.path, props.jsonCharacter.thumbnail.extension)} alt=''></img>
        </section>
      </div>
    );
  }
