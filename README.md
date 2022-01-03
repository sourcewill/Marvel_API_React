# Marvel Network Quantzed
Esta é uma aplicação desenvolvida por William Rodrigues em um processo seletivo para Quantzed utilizando [React](https://pt-br.reactjs.org/) e dados fornecidos pela API Marvel.

## Demonstração
Busca e seleção de personagens:

![img busca](https://i.ibb.co/7Q1Ntg2/print01.png)

Informações sobre cada personagem e uma rede de conexões interativa:

![img personagem](https://i.ibb.co/JvK6Vk7/print02.png)

Listagem dos quadrinhos do personagem:

![img quadrinhos](https://i.ibb.co/236w249/print03.png)

## Requisitos
- npm

## Executando
No diretório do repositório, execute utilizando o comando:
```
npm start
```

## Produção
* [x] Deploy Vercel
<https://marvelnetwork.vercel.app/>

## Funcionalidades

- Busca e seleção de personagens do universo Marvel.
- Criação e listagem de uma rede de conexões para cada personagem exibido.
- A rede de conexões é exibida na forma de grafo, onde o nó central representa o personagem selecionado,  enquanto os demais nós representam personagens que possuem relação com o central. Esta relação é representada em forma de arestas no grafo.
- A rede é interativa, ou seja, permite que cada nó representado possa ser selecionado. Uma vez selecionado, o sistema atualiza as informações para o personagem selecionado.
- Listagem dos quadrinhos de cada personagem.

## Outras Informações

- Marvel API
<https://developer.marvel.com/>

- Paleta de cores utilizada
[Coolors: Marvel Palette](https://coolors.co/202020-151515-ec1d24-e62429-9f0013)
