import React, { useState } from 'react';
import SearchIcon from '@material-ui/icons/Search';
import APIMarvelService from '../../services/APIMarvelService';

export default function Search(props) {

    const [text, setText] = useState('');

    const handleSubmit = async (evt) => {
        evt.preventDefault();
        let responseCharacter = await APIMarvelService.getCharactersByNameStartsWith(text);
        props.setJsonCharactersList(responseCharacter)
    }

    return (
      <div>
        <form className="search-form" onSubmit={handleSubmit}>
            <input className="search-field" type="text" placeholder="Character" onChange={(e) => setText(e.target.value)} />
            <div className="search-button" onClick={handleSubmit}>
                <SearchIcon className="search-button-icon"/>
            </div>
        </form>
      </div>
    );
  }