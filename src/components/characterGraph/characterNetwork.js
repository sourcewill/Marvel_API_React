import React, { useEffect, useState, useRef } from 'react';
import { DataSet, Network } from 'vis-network/standalone/esm/vis-network';

export default function CharacterNetwork({ jsonCharacter, jsonComicList }) {

    const [characterNamesList, setCharacterNamesList] = useState(getCharacterNamesList());

    // A reference to the div rendered by this component
    const domNode = useRef(null);

    // A reference to the vis network instance
    const network = useRef(null);

    const [networkData, setNetworkData] = useState({
        nodes: getGraphNodes(),
        edges: getGraphEdges()
    });

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

    const graphStyle = {
        width: "100%", height: "300px"
    };

    useEffect(() => {
        network.current = new Network(domNode.current, networkData, options);
    }, []);

    useEffect(() => {
        setNetworkData({
            nodes: getGraphNodes(),
            edges: getGraphEdges()
        });
        network.current.setData(networkData);
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

    function getGraphNodes() {
        let nodes = [];
        for (var i in characterNamesList) {
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
        console.log('NODES');
        console.log(nodes);
        return new DataSet(nodes);
    }

    function getGraphEdges() {
        let edges = [];
        for (var i in characterNamesList) {
            if (i === 0) {
                continue; //Skip first node (avoiding self loop)
            }
            var edge = {
                from: i,
                to: 0
            };
            edges.push(edge);
        }
        console.log('EDGES');
        console.log(edges);
        return new DataSet(edges);
    }

    return (
        <div ref={domNode} />
    );
}
