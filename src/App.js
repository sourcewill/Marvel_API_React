import React, { useState, useEffect } from 'react';
import './App.css';
import APIMarvelService from './services/APIMarvelService';
import Utils from './services/utils';

import Search from './components/search/search'
import CharacterList from './components/characterList/characterList';
import Character from './components/character/character'
import ComicList from './components/comicList/comicList';

export default function App() {

  const [jsonCharacterList, setJsonCharacterList] = useState(null);
  const [jsonCharacter, setJsonCharacter] = useState(null);
  const [jsonComicList, setJsonComicList] = useState(null);

  useEffect( () => {
    async function fetchData(){
      let responseCharacters = await APIMarvelService.getCharacters();
      let responseFiltered = Utils.filterJsonCharacterList(responseCharacters);
      setJsonCharacterList(responseFiltered);
    }
    fetchData();
  }, []);

  useEffect(() => {
    console.log('json character list updated')
    console.log(jsonCharacterList);
  }, [jsonCharacterList])

  useEffect(() => {
    async function fetchData(){
      console.log('json character updated')
      console.log(jsonCharacter);
      if(jsonCharacter !== null){
        setJsonComicList(await Utils.getComicListByCharacter(jsonCharacter))
      }
    }
    fetchData();
  }, [jsonCharacter]);

  useEffect(() => {
    console.log('json comic list updated')
    console.log(jsonComicList);
  }, [jsonComicList])

  return (
    <div className="App">
    <Search setJsonCharacterList={setJsonCharacterList}/>
    {(jsonCharacterList !== null) && <CharacterList jsonCharacterList={jsonCharacterList} setJsonCharacter={setJsonCharacter}/> }
    {(jsonCharacter !== null) && <Character jsonCharacter={jsonCharacter}/> }
    {(jsonComicList !== null) && <ComicList jsonComicList={jsonComicList} jsonCharacter={jsonCharacter}/> }
    </div>
  );
}
