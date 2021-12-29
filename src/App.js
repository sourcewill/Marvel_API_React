import React, { useState, useEffect } from 'react';
import './App.css';
import APIMarvelService from './services/APIMarvelService';

import Character from './components/character/character'
import Search from './components/search/search'
import CharacterList from './components/characterList/characterList';

export default function App() {

  const [jsonCharacterList, setJsonCharacterList] = useState(null);
  const [jsonCharacter, setJsonCharacter] = useState(null);

  useEffect( () => {
    async function fetchData(){
      let responseCharacters = await APIMarvelService.getCharacters();
      setJsonCharacterList(responseCharacters);
    }
    fetchData();
  }, []);

  useEffect(() => {
    console.log('atualizou')
    console.log(jsonCharacterList);
  }, [jsonCharacterList])

  return (
    <div className="App">
    <Search setJsonCharacterList={setJsonCharacterList}/>
    {(jsonCharacterList !== null) && <CharacterList jsonCharacterList={jsonCharacterList} setJsonCharacter={setJsonCharacter}/> }
    {(jsonCharacter !== null) && <Character jsonCharacter={jsonCharacter}/> }
    </div>
  );
}
