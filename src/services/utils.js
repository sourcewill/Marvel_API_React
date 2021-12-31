import APIMarvelService from "./APIMarvelService";

class Utils {

    /* Img variants (more info https://developer.marvel.com/documentation/images)
    standard_amazing = 180x180px
    detail = full image, constrained to 500px wide
    */
    buildImgUrl(path, variant, extension) {
        return path + '/' + variant + '.' + extension;
    }

    async getComicListByCharacter(jasonCharacter) {
        let jsonComicList = [];
        for (var i in jasonCharacter.comics.items) {
            let jsonComic = await APIMarvelService.getComic(jasonCharacter.comics.items[i].resourceURI);
            jsonComicList.push(jsonComic);
        }
        return jsonComicList;
    }

    // Remove Characters without description or comics or thumbnail
    filterJsonCharacterList(jsonCharacterList) {
        const jsonFiltered = jsonCharacterList.data.data.results.filter((character) => {
            return (character.description !== ''
                && character.description.length > 10
                && character.comics.items.length > 0
                && (!character.thumbnail.path.includes('image_not_available')))
        });
        return jsonFiltered;
    }

    filterComicList(comicList){
        const filteredComicList = comicList.filter((comic) => {
            return (!comic.data.data.results[0].thumbnail.path.includes('image_not_available'));
        });
        return filteredComicList;
    }

    selectRandomCharacter(characterList) {
        var random = this.randomIntFromInterval(0, characterList.length - 1)
        return characterList[random]
    }

    randomIntFromInterval(min, max) { // min and max included 
        return Math.floor(Math.random() * (max - min + 1) + min)
    }

}

export default new Utils();
