import APIMarvelService from "./APIMarvelService";

class Utils {

    buildImgUrl(path, extension) {
        return path + '/detail.' + extension;
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

    selectRandomCharacter(characterList){
        var random = this.randomIntFromInterval(0, characterList.length-1)
        return characterList[random]
    }

    randomIntFromInterval(min, max) { // min and max included 
        return Math.floor(Math.random() * (max - min + 1) + min)
      }

}

export default new Utils();
