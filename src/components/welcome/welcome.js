import React from "react";
import './welcome.css'

export default function Welcome() {
    return (
        <div className='welcome'>
            <h2>Bem-vindo(a)!</h2>
            <div className='welcome-description'>
            <p>Esta é uma aplicação desenvolvida por William Rodrigues em um processo seletivo para Quantzed utilizando dados fornecido pela API Marvel.</p>
            <p>Busque por personagens ou selecione um na lista acima, visualize suas informações, interaja com a rede de conexões de cada personagem e descubra todo o universo Marvel!</p>
            <p><b>Tenha uma boa viagem!</b></p>
            </div>
        </div>
    )
}