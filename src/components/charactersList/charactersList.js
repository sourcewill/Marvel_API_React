import React, {useEffect} from "react";

export default function CharactersList(props){

    useEffect( () => {
        console.log('json recebido')
        console.log(props.jsonCharactersList)
    }, [props.jsonCharactersList]);

    return(
        <>
        {props.jsonCharactersList.data.data.results.map( (character) => (
            <div className="character" key={character.id}>{character.name}</div>
        ))}
        </>
    );
}