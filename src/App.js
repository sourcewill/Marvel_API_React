import React, { useState, useEffect } from 'react';
import './App.css';
import APIMarvelService from './services/APIMarvelService';
import Utils from './services/utils';

import Header from './components/header/header';
import Search from './components/search/search'
import CharacterList from './components/lists/characterList';
import Character from './components/character/character'
import CharacterNetwork from './components/characterGraph/characterNetwork';
import ComicList from './components/lists/comicList';


export default function App() {

  const [jsonCharacterList, setJsonCharacterList] = useState(null);
  const [jsonCharacter, setJsonCharacter] = useState(null);
  const [jsonComicList, setJsonComicList] = useState(null);
  const [parallaxCoef, setParallaxCoef] = useState(20);

  useEffect(() => {
    async function fetchData() {
      let responseCharacters = await APIMarvelService.getInitialCharacters();
      let responseFiltered = Utils.filterJsonCharacterList(responseCharacters);
      setJsonCharacterList(responseFiltered);
      //setJsonCharacter(Utils.selectRandomCharacter(responseFiltered));
      window.addEventListener("scroll", handleScroll);
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

  function handleScroll() {
    var parallaxCoef = Math.round((window.pageYOffset / 5) + 20);
    if(parallaxCoef < 20){
      parallaxCoef = 20;
    }
    if(parallaxCoef > 100){
      parallaxCoef = 100;
    }
    setParallaxCoef(parallaxCoef);
  }

  return (
    <div className="App">
      <Header/>
      <Search setJsonCharacterList={setJsonCharacterList} />
      {(jsonCharacterList !== null) && <CharacterList jsonCharacterList={jsonCharacterList} setJsonCharacter={setJsonCharacter} />}
      {(jsonCharacter !== null) && <div className='bg-character' style={{
        backgroundPosition: `0% ${parallaxCoef}%`,
        backgroundImage: `url(${Utils.buildImgUrl(jsonCharacter.thumbnail.path, 'detail', jsonCharacter.thumbnail.extension)})`
      }}>
        <div className='bg-blur'>
          <div className='character-vertical-gradient-top'>
            <div className='character-vertical-gradient-bottom'>
              <div className='character-horizontal-gradient-left'></div>
              <Character jsonCharacter={jsonCharacter} />
              {(jsonCharacter !== null) && (jsonComicList !== null) && <CharacterNetwork jsonCharacter={jsonCharacter} jsonComicList={jsonComicList} />}
            </div>
          </div>
        </div>
      </div>}
      {(jsonComicList !== null) && <ComicList jsonComicList={jsonComicList} jsonCharacter={jsonCharacter} />}
    </div>
  );
}
