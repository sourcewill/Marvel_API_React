import React, { useRef, useEffect } from "react";
import './list.css'
import './comicList.css'
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import Utils from "../../services/utils";
import {isMobile} from 'react-device-detect';

export default function ComicList({ jsonComicList, jsonCharacter }) {

    const refComicList = useRef(null);

    useEffect(() => {
        refComicList.current.scrollTo(0, 0);
    });

    function handleClickComic(index) {

    }

    function handleClickRightButton() {
        refComicList.current.scrollLeft += Math.round(window.innerWidth / 1.5);
    }

    function handleClickLeftButton() {
        refComicList.current.scrollLeft -= Math.round(window.innerWidth / 1.5);
    }

    function needNavigationButtons() {
        if(isMobile){
            return false;
        }
        let listWidth = jsonComicList.length * 150;
        if (window.innerWidth < listWidth) {
            return true
        } else {
            return false
        }
    }

    return (
        <section className='comics'>
            <h2>{jsonCharacter.name} Comics</h2>
            <div className='list' ref={refComicList}>
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
                {jsonComicList.map((comic, index) => (
                    <div className="list-item" key={index} onClick={() => handleClickComic(index)}>
                        <img src={Utils.buildImgUrl(comic.data.data.results[0].thumbnail.path, 'standard_amazing', comic.data.data.results[0].thumbnail.extension)} alt={comic.data.data.results[0].title}></img>
                        <div className="list-item-name">{comic.data.data.results[0].title}</div>
                    </div>
                ))}
            </div>
        </section>
    );
}
