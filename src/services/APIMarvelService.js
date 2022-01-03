import axios from "axios";
import Utils from "./utils";

const API_BASE_URL = 'https://gateway.marvel.com/v1/public/'
const TS = 'ts'
const PUBLIC_KEY = 'd332c1e3c77dc91517ae2eac5ba1659a'
const HASH = '88029a7aee6a6b56602db382c26744e6'

const URL_ARGS = 'ts=' + TS + '&apikey=' + PUBLIC_KEY + '&hash=' + HASH;

class APIMarvelService {

    getInitialCharacters() {
        var randomOffset = Utils.randomIntFromInterval(1, 20)
        return axios.get(API_BASE_URL + 'characters?' + URL_ARGS + '&orderBy=modified&limit=100&offset=' + randomOffset);
    }

    getCharactersByNameStartsWith(nameStartsWith) {
        return axios.get(API_BASE_URL + 'characters?' + URL_ARGS + '&nameStartsWith=' + nameStartsWith);
    }

    getResponseByAPIUrl(APIUrl) {
        return axios.get(Utils.urlHttpToHttps(APIUrl) + '?' + URL_ARGS);
    }
}

export default new APIMarvelService();
