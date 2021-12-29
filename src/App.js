import React, { useState, useEffect } from 'react';
import './App.css';
import APIMarvelService from './services/APIMarvelService';

import Character from './components/character/character'
import Search from './components/search/search'
import CharactersList from './components/charactersList/charactersList';

export default function App() {

  const [jsonCharactersList, setJsonCharactersList] = useState(null);
  const [jsonCharacter, setJsonCharacter] = useState(null);

  useEffect( () => {
    async function fetchData(){
      let responseCharacters = await APIMarvelService.getCharacters();
      setJsonCharactersList(responseCharacters);
    }
    fetchData();
  }, []);

  useEffect(() => {
    console.log('atualizou')
    console.log(jsonCharactersList);
  }, [jsonCharactersList])

  return (
    <div className="App">
    <Search setJsonCharactersList={setJsonCharactersList}/>
    {(jsonCharactersList !== null) && <CharactersList jsonCharactersList={jsonCharactersList} setJsonCharacter={setJsonCharacter}/> }
    {(jsonCharacter !== null) && <Character jsonCharacter={jsonCharacter}/> }
    </div>
  );
}
