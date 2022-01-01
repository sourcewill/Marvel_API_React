import React, { useEffect, useRef } from 'react';
import { Network } from 'vis-network/standalone/esm/vis-network';
import './characterNetwork.css'
import Utils from '../../services/utils';

export default function CharacterNetwork({ jsonCharacter, jsonComicList }) {

    const limitNodes = 9;
    const domNode = useRef(null);
    const network = useRef(null);
    const options = {
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

    useEffect(() => {
        network.current = new Network(domNode.current, { nodes: [], edges: [] }, options);
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
            var node = {}
            if (i === 0) {
                node = {
                    id: i,
                    size: 40,
                    fixed: true,
                    color: '#FFFFFF',
                    borderWidth: 5,
                    shape: "circularImage",
                    image: Utils.buildImgUrl(jsonCharacter.thumbnail.path, 'detail', jsonCharacter.thumbnail.extension)
                };
            } else {
                node = {
                    id: i,
                    label: characterNamesList[i],
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
                from: i,
                to: 0
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
