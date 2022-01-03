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

    // Remove Characters without comics or thumbnail
    filterJsonCharacterList(jsonCharacterList) {
        const jsonFiltered = jsonCharacterList.data.data.results.filter((character) => {
            return (character.comics.items.length > 0
                && (!character.thumbnail.path.includes('image_not_available'))
                && (character.thumbnail.extension !== 'gif'))
        });
        return jsonFiltered;
    }

    // Remove Comics without thumbnail
    filterComicList(comicList){
        const filteredComicList = comicList.filter((comic) => {
            return (!comic.data.data.results[0].thumbnail.path.includes('image_not_available')
            && (comic.data.data.results[0].thumbnail.extension !== 'gif'));
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

    // Filter list removing repeated items by key()
    uniqueBy(list, key) {
        let seen = new Set();
        return list.filter(item => {
            let k = key(item);
            return seen.has(k) ? false : seen.add(k);
        });
    }

}

export default new Utils();
