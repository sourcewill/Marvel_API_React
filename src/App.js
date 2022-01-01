import React, { useState, useEffect } from 'react';
import './App.css';
import APIMarvelService from './services/APIMarvelService';
import Utils from './services/utils';

import Search from './components/search/search'
import CharacterList from './components/characterList/characterList';
import Character from './components/character/character'
import CharacterNetwork from './components/characterGraph/characterNetwork';
import ComicList from './components/comicList/comicList';


export default function App() {

  const [jsonCharacterList, setJsonCharacterList] = useState(null);
  const [jsonCharacter, setJsonCharacter] = useState(null);
  const [jsonComicList, setJsonComicList] = useState(null);

  useEffect(() => {
    async function fetchData() {
      let responseCharacters = await APIMarvelService.getInitialCharacters();
      let responseFiltered = Utils.filterJsonCharacterList(responseCharacters);
      setJsonCharacterList(responseFiltered);
      //setJsonCharacter(Utils.selectRandomCharacter(responseFiltered));
    }
    fetchData();
  }, []);

  useEffect(() => {
    console.log('json character list updated');
    console.log(jsonCharacterList);
  }, [jsonCharacterList]);

  useEffect(() => {
    async function fetchData() {
      console.log('json character updated');
      console.log(jsonCharacter);
      if (jsonCharacter !== null) {
        let comicList = await Utils.getComicListByCharacter(jsonCharacter);
        let filteredComicList = Utils.filterComicList(comicList);
        setJsonComicList(filteredComicList);
      }
    }
    fetchData();
  }, [jsonCharacter]);

  useEffect(() => {
    console.log('json comic list updated');
    console.log(jsonComicList);
  }, [jsonComicList]);

  return (
    <div className="App">
      <Search setJsonCharacterList={setJsonCharacterList} />
      {(jsonCharacterList !== null) && <CharacterList jsonCharacterList={jsonCharacterList} setJsonCharacter={setJsonCharacter} />}
      {(jsonCharacter !== null) && <Character jsonCharacter={jsonCharacter} />}
      {(jsonCharacter !== null) && (jsonComicList !== null) && <CharacterNetwork jsonCharacter={jsonCharacter} jsonComicList={jsonComicList} />}
      {(jsonComicList !== null) && <ComicList jsonComicList={jsonComicList} jsonCharacter={jsonCharacter} />}
    </div>
  );
}
