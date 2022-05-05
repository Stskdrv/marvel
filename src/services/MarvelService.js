
const _apiBase = 'https://gateway.marvel.com:443/v1/public/';
const _apiKey = 'b28c450b5c7f85fd1345cacb884e7401';

class MarvelService {
    getResource = async (url) => {
        let res = await fetch(url);

        if (!res.ok) {
            throw new Error(`Could not fetch ${url}, status: ${res.status}`)
        }

        return await res.json();
    };

    getAllCharacters = async () => {
        const res = await this.getResource(_apiBase + 'characters?limit=9&offset=300&apikey='+_apiKey);
        return res.data.results.map(this._transformCharacter);
    };

    getCharacter = async (id) => {
        const res = await this.getResource(_apiBase + `characters/${id}?apikey=`+_apiKey);

        return this._transformCharacter(res.data.results[0]);

    };

    _transformCharacter = (char) => {
        return {
            name: char.name,
            description: char.description,
            thumbnail: `${char.thumbnail.path}.${char.thumbnail.extension}`,
            homePage: char.urls[0].url,
            wiki:  char.urls[1].url,
        }
    }


};

export default MarvelService;