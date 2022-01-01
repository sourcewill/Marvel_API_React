import React, { useState, useEffect } from "react";
import Graph from 'vis-react';

export default function CharacterGraph({ jsonCharacter, jsonComicList }) {

    const [characterNamesList, setCharacterNamesList] = useState(getCharacterNamesList());

    const [graph] = useState({
        nodes: getGraphNodes(),
        edges: getGraphEdges()
    });

    const [graphOptions] = useState({
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
    });

    const [graphStyle] = useState({
        width: "100%", height: "300px"
    });

    useEffect(() => {
        setCharacterNamesList(getCharacterNamesList())
        //updateGraph()
    }, [jsonComicList]);

    function getCharacterNamesList(){
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
        return nodes;
    }

    function getGraphEdges(){
        let edges = [];
        for (var i in characterNamesList) {
            if(i===0){
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
        return edges;
    }

    return (
        <>
            <h2>Graph Conections</h2>
            <Graph
                graph={graph}
                options={graphOptions}
                style={graphStyle}
                vis={vis => (this.vis = vis)}
            />
        </>
    );
}