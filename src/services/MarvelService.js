import { useHttp } from "../hooks/http.hook";

const _apiBase = 'https://gateway.marvel.com:443/v1/public/';
const _apiKey = 'b28c450b5c7f85fd1345cacb884e7401';

const _baseOffset = 210;

const  useMarvelService = () => {

    const {loading, request, error, clearError} = useHttp();

    const _transformCharacter = (char) => {
        const {description} = char;
        const modDescr = description.length > 180 ? description.slice(0, 100) + '...' : description

        return {
            name: char.name,
            description: modDescr,
            thumbnail: `${char.thumbnail.path}.${char.thumbnail.extension}`,
            style: char.thumbnail.path.includes('available') ? {objectFit: 'contain'} : null, 
            homePage: char.urls[0].url,
            wiki:  char.urls[1].url,
            id: char.id,
            comics: char.comics.items,
        }
    }

    const _transformComics = (comics) => {
        return {
            id: comics.id,
            title: comics.title,
            description: comics.description || 'There is no description',
            pageCount: comics.pageCount ? `${comics.pageCount} p.` : 'No information about the number of pages',
            thumbnail: comics.thumbnail.path + '.' + comics.thumbnail.extension,
            language: comics.textObjects.language || 'en-us',
            price: comics.prices.price ? `${comics.prices.price}$` : 'not available'
        }
    }

    const getAllCharacters = async (offset = _baseOffset) => {
        const res = await request(_apiBase + `characters?limit=9&offset=${offset}&apikey=`+_apiKey);
        return res.data.results.map(_transformCharacter);
    };

    const getCharacter = async (id) => {
        const res = await request(_apiBase + `characters/${id}?apikey=`+_apiKey);

        return _transformCharacter(res.data.results[0]);

    };

    const getAllComics = async (offset = 0) => {
        const res = await request(_apiBase+`comics?orderBy=issueNumber&limit=8&offset=${offset}&apikey=`+_apiKey);
        return res.data.results.map(_transformComics);
    }

    const getComics = async (id) => {
        const res = await request(`${_apiBase}comics/${id}?${_apiKey}`);
        return _transformComics(res.data.results[0]);
    }

    

    
    return {loading, error, getAllCharacters, getCharacter, clearError, getAllComics, getComics}

};

export default useMarvelService;