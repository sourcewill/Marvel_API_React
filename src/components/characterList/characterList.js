import React from "react";
import Utils from "../../services/utils";

export default function CharacterList(props){

    function onClickCharacter(index){
        props.setJsonCharacter(props.jsonCharacterList.data.data.results[index])
    }

    return(
        <>
        {props.jsonCharacterList.data.data.results.map( (character, index) => (
            
            <div className="character" key={character.id} onClick={() => onClickCharacter(index)}>
                <img src={Utils.buildImgUrl(character.thumbnail.path, character.thumbnail.extension)} alt=''></img>
                {character.name}
            </div>
        ))}
        </>
    );
}
