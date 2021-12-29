import React, {useEffect} from "react";

export default function CharacterList(props){

    useEffect( () => {
        console.log('json recebido')
        console.log(props.jsonCharacterList)
    }, [props.jsonCharacterList]);

    return(
        <>
        {props.jsonCharacterList.data.data.results.map( (character) => (
            <div className="character" key={character.id}>{character.name}</div>
        ))}
        </>
    );
}