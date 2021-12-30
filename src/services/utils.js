import APIMarvelService from "./APIMarvelService";

class Utils {

    buildImgUrl(path, extension){
        return path + '/detail.' + extension;
    }

    async getComicListByCharacter(jasonCharacter){
        let jsonComicList = [];
        for(var i in jasonCharacter.comics.items){
            let jsonComic = await APIMarvelService.getComic(jasonCharacter.comics.items[i].resourceURI);
            jsonComicList.push(jsonComic);
        }
        return jsonComicList;
    }

}

export default new Utils();
