import React, { useEffect, useRef } from 'react';
import { Network } from 'vis-network/standalone/esm/vis-network';
import './characterNetwork.css'

export default function CharacterNetwork({ jsonCharacter, jsonComicList }) {

    const limitNodes = 9;
    const domNode = useRef(null);
    const network = useRef(null);
    const options = {
        edges: {
            color: 'white',
            smooth: {
                type: "continuous",
            }
        },
        nodes: {
            shape: "box",
            color: "#007BFF",
            size: 20,
            borderWidth: 1,
            shadow: true,
            font: {
                size: 16,
                align: "center",
                color: "white",
            }
        },
        interaction: {
            hover: true,
            zoomView: false,
            dragView: true
        }
    };

    useEffect(() => {
        network.current = new Network(domNode.current, {nodes: [], edges: []}, options);
    }, []);

    useEffect(() => {
        let characterNamesList = getCharacterNamesList();
        network.current.setData({
            nodes: getNetworkNodes(characterNamesList),
            edges: getNetworkEdges(characterNamesList)
        });
    }, [jsonComicList]);

    function getCharacterNamesList() {
        let nameSet = new Set();
        nameSet.add(jsonCharacter.name)
        for (var i in jsonComicList) {
            for (var j in jsonComicList[i].data.data.results[0].characters.items) {
                nameSet.add(jsonComicList[i].data.data.results[0].characters.items[j].name);
            }
        }
        return Array.from(nameSet)
    }

    function getNetworkNodes(characterNamesList) {
        let nodes = [];
        for (var i in characterNamesList) {
            i = parseInt(i)
            if (i >= limitNodes) {
                break;
            }
            var node = {
                id: i,
                label: characterNamesList[i],
                color: "#FFB500",
                font: { color: "#000110" },
                shadow: { color: "#151517" },
                shape: "box"
            };
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
            if (i < 1) {
                continue;
            }
            var edge = {
                from: i,
                to: 0
            };
            edges.push(edge);
        }
        return (edges);
    }

    return (
        <>
            <h2>{jsonCharacter.name} Interactions</h2>
            <div ref={domNode} className='character-network'
                style={{
                    width: "100%",
                    height: "300px"
                }} />
        </>
    );
}
