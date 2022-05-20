import './randomChar.scss';

import { useEffect, useState } from 'react';

import ErrorMessage from '../errorMessage/ErrorMessage';
import MarvelService from '../../services/MarvelService';
import Spinner from '../spinner/Spinner';
import mjolnir from '../../resources/img/mjolnir.png';

const RandomChar = () => {
    const [char, setChar] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [id, setId] = useState(Math.floor(Math.random() * (1011400 - 1011000) + 1011000));

    const updateChar = () => {
        setId(Math.floor(Math.random() * (1011400 - 1011000) + 1011000))
    }

    const marvelService = new MarvelService();

    useEffect(() => {
        marvelService
            .getCharacter(id)
            .then(setLoading(true))
            .then((res) => {
                setChar(res);
                setLoading(false);
            })
            .catch(() => {
                setError(true);
                setLoading(false);
            })
    }, [id])

        const errorMessage = error ? <ErrorMessage /> : null;
        const spinner = loading ? <Spinner/> : null;
        const content = !(loading || error) ? <View char={char} /> : null;

    return (
        <div className="randomchar">
            {errorMessage}
            {spinner}
            {content}
            <div className="randomchar__static">
                <p className="randomchar__title">
                    Random character for today!<br/>
                    Do you want to get to know him better?
                </p>
                <p className="randomchar__title">
                    Or choose another one
                </p>
                <button onClick={updateChar} className="button button__main">
                    <div className="inner">try it</div>
                </button>
                <img src={mjolnir} alt="mjolnir" className="randomchar__decoration"/>
            </div>
        </div>
    )
}

const View = ({char}) => {
    const {name, description, thumbnail, homePage, wiki} = char;

    const modifideDescr = description.length > 180 ? description.slice(0,180)+'...' : description;

    const imageFit = thumbnail.includes('available') ? {objectFit: 'contain'} : null ;
    return (
        <div className="randomchar__block">
            <img src={thumbnail} alt="Random character" style={imageFit} className="randomchar__img"/>
            <div className="randomchar__info">
                <p className="randomchar__name">{name}</p>
                <p className="randomchar__descr">
                    {modifideDescr}
                </p>
                <div className="randomchar__btns">
                    <a href={homePage} className="button button__main">
                        <div className="inner">Home Page</div>
                    </a>
                    <a href={wiki} className="button button__secondary">
                        <div className="inner">Wiki</div>
                    </a>
                </div>
            </div>
        </div>
    )
}

export default RandomChar;