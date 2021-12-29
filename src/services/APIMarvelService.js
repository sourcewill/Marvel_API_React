import axios from "axios";

const API_BASE_URL = 'http://gateway.marvel.com/v1/public/'
const TS = 'ts'
const PUBLIC_KEY = 'd332c1e3c77dc91517ae2eac5ba1659a'
const HASH = '88029a7aee6a6b56602db382c26744e6'

class APIMarvelService{

    getCharacters(){
        return axios.get(API_BASE_URL + 'characters?ts=' + TS + '&apikey=' + PUBLIC_KEY + '&hash=' + HASH);
    }

    getCharactersByNameStartsWith(text){
        return axios.get(API_BASE_URL + 'characters?ts=' + TS + '&apikey=' + PUBLIC_KEY + '&hash=' + HASH + '&nameStartsWith=' + text);
    }

}

export default new APIMarvelService();