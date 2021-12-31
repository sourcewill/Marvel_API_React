import React, { useRef, useEffect } from "react";
import './characterList.css'
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import Utils from "../../services/utils";

export default function CharacterList({ jsonCharacterList, setJsonCharacter }) {

    const refCharacterList = useRef(null);

    useEffect(() => {
        refCharacterList.current.scrollTo(0, 0);
    });

    function handleClickCharacter(index) {
        setJsonCharacter(jsonCharacterList.data.data.results[index])
    }

    function handleClickRightButton() {
        refCharacterList.current.scrollLeft += Math.round(window.innerWidth / 1.5);
    }

    function handleClickLeftButton() {
        refCharacterList.current.scrollLeft -= Math.round(window.innerWidth / 1.5);
    }

    function needNavigationButtons() {
        let listWidth = jsonCharacterList.data.data.results.length * 150;
        if (window.innerWidth < listWidth) {
            return true
        } else {
            return false
        }
    }

    return (
        <section className='characters'>
            <h2>Marvel Characters</h2>
            <div className='character-list' ref={refCharacterList}>
                {needNavigationButtons() &&
                    <>
                        <div className='left-navigate-button' onClick={handleClickLeftButton}>
                            <NavigateBeforeIcon className="left-icon" style={{ fontSize: 50 }} />
                        </div>
                        <div className='right-navigate-button' onClick={handleClickRightButton}>
                            <NavigateNextIcon className="right-icon" style={{ fontSize: 50 }} />
                        </div>
                    </>
                }
                {jsonCharacterList.data.data.results.map((character, index) => (
                    <div className="character-list-item" key={index} onClick={() => handleClickCharacter(index)}>
                        <img src={Utils.buildImgUrl(character.thumbnail.path, character.thumbnail.extension)} alt={character.name}></img>
                        <div className="character-list-item-name">{character.name}</div>
                    </div>
                ))}
            </div>
        </section>
    );
}
