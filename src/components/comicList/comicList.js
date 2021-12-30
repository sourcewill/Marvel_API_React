import React from "react";
import Utils from "../../services/utils";

export default function ComicList(props){

    return(
        <>
        {props.jsonComicList.map( (comic, index) => (
            <div key={index}>
                <img src={Utils.buildImgUrl(comic.data.data.results[0].thumbnail.path, comic.data.data.results[0].thumbnail.extension)} alt='err'></img>
                {comic.data.data.results[0].title}
            </div>
        ))}
        </>
    );
}
