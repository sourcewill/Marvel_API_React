import React, { useEffect, useRef } from 'react';
import { Network } from 'vis-network/standalone/esm/vis-network';
import './characterNetwork.css'
import Utils from '../../services/utils';
import APIMarvelService from '../../services/APIMarvelService';

export default function CharacterNetwork({ jsonCharacter, jsonComicList, setJsonCharacter }) {

    const limitNodes = 9;
    const domNode = useRef(null);
    const network = useRef(null);
    const networkOptions = {
        edges: {
            color: '#FFFFFF',
            smooth: {
                type: "continuous",
            }
        },
        nodes: {
            shape: "box",
            color: "#FFB500",
            size: 20,
            borderWidth: 1,
            shadow: { color: "#151517" },
            font: {
                size: 16,
                align: "center",
                color: "#000110",
            }
        },
        interaction: {
            hover: true,
            zoomView: false,
            dragView: false
        }
    };

    async function handleClickCharacter(characterId) {
        let responseCharacter = await APIMarvelService.getCharacterByAPIUrl(characterId);
        setJsonCharacter(responseCharacter.data.data.results[0]);
        console.log(responseCharacter)
    }

    useEffect(() => {
        network.current = new Network(domNode.current, { nodes: [], edges: [] }, networkOptions);

        //Network Events
        network.current.on('click', function (event) {
            if (event.nodes[0] !== undefined) {
                handleClickCharacter(event.nodes[0])
            }
        });
        network.current.on('hoverNode', function(event){
            document.getElementsByTagName('canvas')[0].style.cursor = 'pointer';
        });
        network.current.on('blurNode', function(event){
            document.getElementsByTagName('canvas')[0].style.cursor = 'default';
        });
        network.current.on('dragStart', function(event){
            document.getElementsByTagName('canvas')[0].style.cursor = 'grabbing';
        });
        network.current.on('dragEnd', function(event){
            document.getElementsByTagName('canvas')[0].style.cursor = 'grab';
        });

    }, []);

    useEffect(() => {
        let characterNamesList = getCharacterConectionsList();
        network.current.setData({
            nodes: getNetworkNodes(characterNamesList),
            edges: getNetworkEdges(characterNamesList)
        });
    }, [jsonComicList]);

    function getCharacterConectionsList() {
        let conectionsList = [];
        conectionsList.push({ name: jsonCharacter.name, id: jsonCharacter.resourceURI })
        for (var i in jsonComicList) {
            for (var j in jsonComicList[i].data.data.results[0].characters.items) {
                conectionsList.push({
                    name: jsonComicList[i].data.data.results[0].characters.items[j].name,
                    id: jsonComicList[i].data.data.results[0].characters.items[j].resourceURI
                });
            }
        }
        return Utils.uniqueBy(conectionsList, JSON.stringify);
    }

    function getNetworkNodes(characterNamesList) {
        let nodes = [];
        for (var i in characterNamesList) {
            i = parseInt(i)
            if (i >= limitNodes) {
                break;
            }
            var node = {}
            if (i === 0) {
                node = {
                    id: characterNamesList[0].id,
                    size: 40,
                    fixed: true,
                    color: '#FFFFFF',
                    borderWidth: 5,
                    shape: "circularImage",
                    image: Utils.buildImgUrl(jsonCharacter.thumbnail.path, 'detail', jsonCharacter.thumbnail.extension)
                };
            } else {
                node = {
                    id: characterNamesList[i].id,
                    label: characterNamesList[i].name,
                };
            }
            nodes.push(node);
        }
        return (nodes);
    }

    function getNetworkEdges(characterNamesList) {
        let edges = [];
        for (var i in characterNamesList) {
            i = parseInt(i)
            if (i >= limitNodes) {
                break;
            }
            //Skip first node (avoiding self loop)
            if (i === 0) {
                continue;
            }
            var edge = {
                from: characterNamesList[i].id,
                to: characterNamesList[0].id
            };
            edges.push(edge);
        }
        return (edges);
    }

    return (
        <div className='character-network'>
            <h2>Network Conections</h2>
            <div ref={domNode}
                style={{
                    width: "100%",
                    height: "300px"
                }} />
        </div>
    );
}
