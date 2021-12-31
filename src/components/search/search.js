import React, { useState } from 'react';
import './search.css'
import Utils from '../../services/utils';
import SearchIcon from '@material-ui/icons/Search';
import APIMarvelService from '../../services/APIMarvelService';

export default function Search({setJsonCharacterList}) {

    const [text, setText] = useState('');

    const handleSubmit = async (evt) => {
        evt.preventDefault();
        let responseCharacters = await APIMarvelService.getCharactersByNameStartsWith(text);
        let responseFiltered = Utils.filterJsonCharacterList(responseCharacters);
        setJsonCharacterList(responseFiltered)
    }

    return (
      <>
        <form className="search-form" onSubmit={handleSubmit}>
            <input className="search-field" type="text" placeholder="Character" onChange={(e) => setText(e.target.value)} />
            <div className="search-button" onClick={handleSubmit}>
                <SearchIcon className="search-button-icon"/>
            </div>
        </form>
      </>
    );
  }