import React, { useRef, useEffect } from "react";
import './list.css'
import './characterList.css'
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import Utils from "../../services/utils";
import { isMobile } from 'react-device-detect';

export default function CharacterList({ jsonCharacterList, setJsonCharacter }) {

    const refCharacterList = useRef(null);

    useEffect(() => {
        refCharacterList.current.scrollTo(0, 0);
    }, [jsonCharacterList]);

    function handleClickCharacter(index) {
        setJsonCharacter(jsonCharacterList[index])
    }

    function handleClickRightButton() {
        refCharacterList.current.scrollLeft += Math.round(window.innerWidth / 1.5);
    }

    function handleClickLeftButton() {
        refCharacterList.current.scrollLeft -= Math.round(window.innerWidth / 1.5);
    }

    function needNavigationButtons() {
        if (isMobile) {
            return false;
        }
        let listWidth = jsonCharacterList.length * 150;
        if (window.innerWidth < listWidth) {
            return true;
        } else {
            return false;
        }
    }

    return (
        <section className='characters'>
            <h2>Marvel Characters</h2>
            <div className='list' ref={refCharacterList}>
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


                {jsonCharacterList.map((character, index) => (
                    <div className="list-item" key={index} onClick={() => handleClickCharacter(index)}>
                        <img src={Utils.buildImgUrl(character.thumbnail.path, 'standard_amazing', character.thumbnail.extension)} alt={character.name}></img>
                        <div className="list-item-name">{character.name}</div>
                    </div>
                ))}
            </div>
        </section>
    );
}
